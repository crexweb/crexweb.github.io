// what_he_thinks.js — "Что он/она думает обо мне?" — 100 ₽, один расклад + вечная блокировка
const url = new URL(window.location.href);
let sessionId = url.searchParams.get('w');
let currentAssist = "";
let isTyping = false;
let chatSteps = "start";

const names = ["Мира", "Аделина", "Валерия", "Элина"];
currentAssist = names[Math.floor(Math.random() * names.length)];

let userData = { name: "", age: "", partnerName: "", partnerAge: "" };

const $ = s => document.querySelector(s);

function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function updateUrl(id) {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('w', id);
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
    if (isTyping) return;
    const el = document.createElement('div');
    el.className = 'chat__typing';
    el.id = 'current-typing';
    el.innerHTML = `<img src="images/typing.gif" alt="печатает...">`;
    $('.chat__body').appendChild(el);
    isTyping = true;
}

function hideTyping() {
    const el = $('#current-typing');
    if (el) el.remove();
    isTyping = false;
}

async function thinkAndType(text, userLen = 50) {
    const readingTime = Math.min(800 + userLen * 30, 4500);
    return new Promise(resolve => {
        setTimeout(() => {
            showTyping();
            const typingDelay = Math.min(600 + text.length * 55, 12000);
            setTimeout(() => {
                hideTyping();
                addMessage('assistant', text);
                fetch("/api/save-message", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId, role: "assistant", content: text })
                }).finally(() => resolve());
            }, typingDelay);
        }, readingTime);
    });
}

// === Создание новой сессии ===
async function createNewSession() {
    const res = await fetch("/api/new-session-thinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assistantName: currentAssist })
    });
    if (!res.ok) throw new Error("Ошибка создания сессии");
    const data = await res.json();
    sessionId = data.sessionId;
    updateUrl(sessionId);
    await loadExistingSession();
}

// === Загрузка сессии ===
async function loadExistingSession() {
    const res = await fetch(`/api/session/${sessionId}`);
    if (!res.ok) {
        $('.block').style.display = "flex";
        return;
    }
    const session = await res.json();
    currentAssist = session.assistant_name;

    $('.chat__body').innerHTML = '<div class="chat__start">Что он/она думает обо мне прямо сейчас?</div>';
    session.messages.forEach(m => addMessage(m.role, m.content, m.time));

    const userMsgs = session.messages.filter(m => m.role === "user").length;
    if (userMsgs === 0) chatSteps = "name";
    else if (userMsgs === 1) chatSteps = "age";
    else if (userMsgs === 2) chatSteps = "partnerName";
    else if (userMsgs === 3) chatSteps = "partnerAge";
    else if (userMsgs >= 4 || session.blocked) {
        $('.chat__blocked').style.display = "flex";
        $('.chat__input').style.display = "none";
    }

    if (session.paid) {
        document.querySelector('.payment-block')?.remove();
    }

    setTimeout(() => $('.loading').style.top = "-150vh", 1000);
}

// === Оплата 100 ₽ ===
async function checkAndShowPayment() {
    if (!sessionId) return;

    const res = await fetch(`/api/session/${sessionId}`);
    const session = await res.json();

    if (session.paid) {
        document.querySelector('.payment-block')?.remove();
        return;
    }

    const payBlock = document.createElement('div');
    payBlock.className = 'payment-block';
    payBlock.innerHTML = `
        <div style="background:rgba(0,0,0,0.1); color:white; padding:40px 20px; border-radius:15px; text-align:center; margin:20px;">
            <h3 style="margin-bottom:4px">Что он/она думает обо мне?</h3>
            <p style="margin-bottom:25px">Один точный расклад — всего 100 ₽</p>
            <button id="pay100" style="background:#7000ff;color:white;border:none;padding:15px 35px;border-radius:50px;font-size:18px;cursor:pointer;">Оплатить 100 ₽</button>
            <p style="font-size:12px;margin-top:15px;opacity:0.8;">Безопасная оплата через ЮKassa</p>
        </div>
    `;

    document.querySelector('.chat').appendChild(payBlock);

    document.getElementById('pay100').onclick = async () => {
        const btn = document.getElementById('pay100');
        btn.disabled = true;
        btn.textContent = "Переходим к оплате…";

        const r = await fetch("/api/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId,
                amount: 100,
                returnUrl: `https://tarolex.ru/mind.html?w=${sessionId}`
            })
        });

        const data = await r.json();

        if (data.paymentUrl) {
            window.location.href = data.paymentUrl; // редирект
        } else {
            alert("Ошибка создания платежа");
            btn.disabled = false;
            btn.textContent = "Оплатить 100 ₽";
        }
    };
}

// === Вечная блокировка после расклада ===
async function blockSessionForever() {
    await fetch("/api/block-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId })
    });
}

// === Обработка ввода ===
$('.chat__send').addEventListener('click', processInput);
$('.chat__input input').addEventListener('keypress', e => e.key === 'Enter' && processInput());

async function processInput() {
    const input = $('.chat__input input');
    const value = input.value.trim();
    if (!value || isTyping) return;

    input.value = "";
    addMessage('user', value);
    await fetch("/api/save-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, role: "user", content: value })
    });

    const paid = await (await fetch(`/api/session/${sessionId}`)).json().then(s => s.paid);
    if (!paid) return;

    if (chatSteps === "name") {
        if (!/^[а-яА-ЯёЁ]{2,20}$/.test(value)) {
            await thinkAndType("Напишите своё имя одним словом, только русскими буквами", value.length);
            return;
        }
        userData.name = value;
        await thinkAndType(`Хорошо, ${value}… Сколько вам лет?`, value.length);
        chatSteps = "age";

    } else if (chatSteps === "age") {
        const age = value.match(/\b(\d+)\b/)?.[1];
        if (!age || age < 16 || age > 100) {
            await thinkAndType("Скажите, сколько вам лет?", value.length);
            return;
        }
        userData.age = age;
        await thinkAndType("А как зовут того, о ком вы думаете?", value.length);
        chatSteps = "partnerName";

    } else if (chatSteps === "partnerName") {
        if (!/^[а-яА-ЯёЁ]{2,20}$/.test(value)) {
            await thinkAndType("Напишите имя человека одним словом", value.length);
            return;
        }
        userData.partnerName = value;
        await thinkAndType(`Поняла… ${value}… Какой возраст этого человека?`, value.length);
        chatSteps = "partnerAge";

    } else if (chatSteps === "partnerAge") {
        const age = value.match(/\b(\d+)\b/)?.[1];
        if (!age || age < 16 || age > 100) {
            await thinkAndType("Скажите примерный возраст этого человека", value.length);
            return;
        }
        userData.partnerAge = age;

        await thinkAndType("Секунду… Я настраиваюсь на энергию вашего человека энергию… Сейчас всё узнаем…");

        try {
            const res = await fetch("/api/tarot-thinks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    userName: userData.name,
                    userAge: userData.age,
                    partnerName: userData.partnerName,
                    partnerAge: userData.partnerAge,
                    assistantName: currentAssist
                })
            });

            const data = await res.json();
            const answer = data.answer || "Мысли сейчас немного закрыты… Попробуй позже";

            await thinkAndType(answer);
            $('.chat__blocked').style.display = "flex";
            $('.chat__input').style.display = "none";

            await blockSessionForever();

            setTimeout(() => {
                const final = "Если хочешь новое гадание — открой в новой вкладке";
                addMessage('assistant', final);
                fetch("/api/save-message", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId, role: "assistant", content: final })
                });
            }, 3000);

        } catch (err) {
            await thinkAndType("Мысли сейчас немного закрыты… Попробуй позже");
        }
    }
}

// === ЗАПУСК ===
async function start() {
    if (!sessionId) {
        await createNewSession();
    } else {
        await loadExistingSession();
    }
    setTimeout(checkAndShowPayment, 1500);
}

start();