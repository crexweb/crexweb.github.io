// js/chat.js
const url = new URL(window.location.href);
let sessionId = url.searchParams.get('s');
let currentAssist = "";
let sessionStartTime = null; // ← время старта оплаченного сеанса

let greetingTimeout = null;
let isTyping = false;
let isProcessing = false;
let messageQueue = [];

const $ = s => document.querySelector(s);

function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function updateUrl(id) {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('s', id);
    history.replaceState(null, '', newUrl);
}

function addMessage(role, text, time = getCurrentTime()) {
    const div = document.createElement('div');
    div.className = role === 'assistant' ? 'chat__ai' : 'chat__client';
    div.innerHTML = `<p>${text}</p><span>${time}</span>`;
    $('.chat__body').appendChild(div);
    $('.chat__body').scrollTop = $('.chat__body').scrollHeight;
}

function showTyping() {
    if (isTyping) return; // уже печатает
    const el = document.createElement('div');
    el.className = 'chat__typing';
    el.id = 'current-typing';
    el.innerHTML = `<img src="images/typing.gif" alt="печатает...">`;
    $('.chat__body').appendChild(el);
    $('.chat__body').scrollTop = $('.chat__body').scrollHeight;
    isTyping = true;
}

function hideTyping() {
    const typing = $('#current-typing');
    if (typing) typing.remove();
    isTyping = false;
}

// === Умная печать с задержкой по длине ===
async function typeMessage(text) {
    showTyping();
    const baseDelay = 600;
    const perCharDelay = 65; // мс на символ
    const maxDelay = 50000;
    const delay = Math.min(baseDelay + text.length * perCharDelay, maxDelay);

    await new Promise(res => setTimeout(res, delay));
    hideTyping();
    addMessage('assistant', text);
}

// === Пауза "читает" — зависит от длины сообщения пользователя ===
function getReadingDelay(text) {
    const chars = text.length;
    if (chars < 50) return 2000 + Math.random() * 2000;     // 2–4 сек
    if (chars < 150) return 4000 + Math.random() * 3000;    // 4–7 сек
    if (chars < 300) return 7000 + Math.random() * 3000;    // 7–10 сек
    return 10000 + Math.random() * 4000;                    // 10–14 сек (очень длинное)
}

// === Основная очередь обработки сообщений ===
async function processQueue() {
    if (isProcessing || messageQueue.length === 0) return;
    isProcessing = true;

    const userMessage = messageQueue.shift();

    // 1. Пауза "читает"
    await new Promise(res => setTimeout(res, getReadingDelay(userMessage)));

    // 2. Запрос к ИИ
    try {
        const res = await fetch("/api/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId,
                userMessage,
                assistantName: currentAssist
            })
        });

        const data = await res.json();
        if (data.answer) {
            await typeMessage(data.answer);
        } else {
            await typeMessage("Извините, энергия немного рассеялась… Расскажи ещё раз?");
        }
    } catch (err) {
        console.error(err);
        await typeMessage("Что-то помешало картам… Попробуй ещё раз.");
    }

    isProcessing = false;

    if (messageQueue.length > 0) {
        setTimeout(processQueue, 800 + Math.random() * 1200);
    }
}

// === Отправка сообщения пользователя ===
function sendUserMessage() {
    const input = $('.chat__input input');
    const text = input.value.trim();
    if (!text || isProcessing) return;

    input.value = "";
    addMessage('user', text);

    // Отменяем приветствие, если оно ещё не пришло
    if (greetingTimeout) {
        clearTimeout(greetingTimeout);
        greetingTimeout = null;
    }

    // Добавляем в очередь
    messageQueue.push(text);
    processQueue();
}

// === 10-минутный таймер после оплаты ===
function startTimer() {
    const timerElement = $('.chat__right span');

    function updateTimer() {
        const now = new Date();
        const diffMs = 10 * 60 * 1000 - (now - sessionStartTime); // 10 минут

        if (diffMs <= 0) {
            // Время вышло
            timerElement.textContent = "0 секунд";
            $('.chat__input input').disabled = true;
            $('.chat__input input').placeholder = "Сеанс завершён";
            $('.chat__send').style.opacity = "0.5";
            $('.chat__send').style.pointerEvents = "none";
            document.querySelector('.end').style.display = "flex";
            return;
        }

        const minutes = Math.floor(diffMs / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);

        timerElement.textContent = `${minutes} мин ${seconds < 10 ? '0' : ''}${seconds} сек`;

        setTimeout(updateTimer, 1000);
    }

    updateTimer();
}

// === Создание новой сессии ===
async function createNewSession() {
    const names = ["Аделина", "Валерия", "Мира", "Элина"];
    currentAssist = names[Math.floor(Math.random() * names.length)];

    const res = await fetch("/api/new-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assistantName: currentAssist })
    });

    if (!res.ok) {
        alert("Не удалось создать сеанс");
        return;
    }

    const data = await res.json();
    sessionId = data.sessionId;
    history.replaceState(null, '', `?s=${sessionId}`);

    $('.chat__info p').textContent = currentAssist;
    $('.chat__assist').textContent = currentAssist;
    $('.chat__started').textContent = getCurrentTime();

    hideLoader();
}

// === Загрузка старой сессии (с таймером и временем оплаты) ===
async function loadExistingSession() {
    try {
        const res = await fetch(`/api/session/${sessionId}`);
        if (!res.ok) {
            $('.block').style.display = "flex";
            hideLoader();
            return;
        }

        const session = await res.json();
        currentAssist = session.assistant_name;

        $('.chat__info p').textContent = currentAssist;
        $('.chat__assist').textContent = currentAssist;

        // Если есть время оплаты — показываем его как время
        if (session.session_start_time) {
            const t = new Date(session.session_start_time);
            $('.chat__started').textContent = `${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}`;
            sessionStartTime = new Date(session.session_start_time);
        } else {
            $('.chat__started').textContent = getCurrentTime();
            sessionStartTime = new Date();
        }

        // Очищаем чат и заливаем сообщения
        $('.chat__body').innerHTML = `<div class="chat__start">Сеанс с <span class="chat__assist">${currentAssist}</span><br>начат в <span class="chat__started">${$('.chat__started').textContent}</span></div>`;
        $('.chat__start').style.display = 'block';

        session.messages.forEach(m => addMessage(m.role, m.content, m.time));

        // Если оплачено — показываем таймер и статус online
        if (session.paid) {
            document.querySelector('.payment-block')?.remove();
            document.querySelector(".chat__status").style.display = "block";
            document.querySelector(".chat__info span").style.display = "block";
            document.querySelector(".chat__right").style.display = "flex";
            startTimer(); // ← запускаем таймер 10 минут
        }

        hideLoader();

        // Показ кнопки оплаты, если не оплачено
        if (!session.paid) {
            setTimeout(checkPaymentAndShowButton, 1500);
        }

    } catch (err) {
        console.error("Ошибка загрузки сессии:", err);
        $('.block').style.display = "flex";
        hideLoader();
    }
}

function hideLoader() {
    setTimeout(() => {
        document.querySelector('.loading').style.top = "-150vh";
    }, 1500);
}

// === ЗАПУСК ===
if (!sessionId) {
    await createNewSession();
} else {
    await loadExistingSession();
}

// === Обработчики отправки ===
$('.chat__send').addEventListener('click', sendUserMessage);
$('.chat__input input').addEventListener('keypress', e => {
    if (e.key === 'Enter') sendUserMessage();
});

// === Проверка оплаты и показ кнопки оплаты ===
async function checkPaymentAndShowButton() {
    if (!sessionId) return;

    const res = await fetch(`/api/session/${sessionId}`);
    const session = await res.json();

    // Если уже оплачено — ничего не показываем
    if (session.paid) {
        document.querySelector('.block')?.remove();
        return;
    }

    // Если НЕ оплачено — показываем красивую плашку
    const payBlock = document.createElement('div');
    payBlock.className = 'payment-block';
    payBlock.innerHTML = `
        <div style="background:rgba(0,0,0,0.1); color:white; padding:40px 20px; border-radius:15px; text-align:center; margin:20px; font-family:sans-serif;">
            <h3 style="margin-bottom: 4px">Приватный сеанс с тарологиней</h3>
            <p style="margin-bottom: 10px">Сессия длительностью на 10 минут — всего <b>600 ₽</b></p>
            <button id="pay-btn" style="background:#c972ff; color:white; border:none; padding:15px 30px; border-radius:50px; font-size:16px; cursor:pointer; margin-top:10px;">Оплатить 600 ₽</button>
            <p style="font-size:12px; margin-top:15px; opacity:0.8;">Безопасная оплата через ЮKassa</p>
        </div>
    `;

    if (session.paid && session.session_start_time) {
        sessionStartTime = new Date(session.session_start_time);
        startTimer();
    }

    document.querySelector('.chat').appendChild(payBlock);
    document.querySelector('.chat__body').scrollTop = 99999;

    // Обработчик кнопки
    document.getElementById('pay-btn').onclick = async () => {
        const btn = document.getElementById('pay-btn');
        btn.disabled = true;
        btn.textContent = "Перенаправляем…";

        const r = await fetch("/api/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId,
                amount: 600,
                returnUrl: `https://tarolex.ru/chat.html?s=${sessionId}`
            })
        });

        const data = await r.json();
        if (data.paymentUrl) {
            window.location.href = data.paymentUrl; // уходит на страницу ЮKassa
        } else {
            alert("Ошибка создания платежа");
            btn.disabled = false;
            btn.textContent = "Оплатить 600 ₽";
        }
    };
}

// Запуск проверки оплаты
if (sessionId) {
    setTimeout(() => {
        if (!document.querySelector('.payment-block') && !sessionStartTime) {
            checkPaymentAndShowButton();
        }
    }, 1000);
}