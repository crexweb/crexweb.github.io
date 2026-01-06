// yes_or_not.js — Да или Нет — 100 ₽, один расклад + вечная блокировка
const url = new URL(window.location.href);
let sessionId = url.searchParams.get('y');
let currentAssist = "";
let isTyping = false;
let chatSteps = "start";

const names = ["Мира", "Аделина", "Валерия", "Элина"];
currentAssist = names[Math.floor(Math.random() * names.length)];

const $ = s => document.querySelector(s);

function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function updateUrl(id) {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('y', id);
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

async function thinkAndType(text, userMessageLength = 50) {
    const readingTime = Math.min(800 + userMessageLength * 30, 4000);
    await new Promise(r => setTimeout(r, readingTime));

    showTyping();
    const typingDelay = Math.min(600 + text.length * 55, 10000);
    await new Promise(r => setTimeout(r, typingDelay));

    hideTyping();
    addMessage('assistant', text);

    await fetch("/api/save-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, role: "assistant", content: text })
    });
}

// === Создание новой сессии ===
async function createNewSession() {
    const res = await fetch("/api/new-session-yesno", {
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

    // Показываем сообщения
    session.messages.forEach(m => addMessage(m.role, m.content, m.time));

    // Определяем шаг
    const userMsgs = session.messages.filter(m => m.role === "user").length;
    if (userMsgs === 0) chatSteps = "name";
    else if (userMsgs === 1) chatSteps = "year";
    else if (userMsgs === 2) chatSteps = "question";
    else if (userMsgs >= 3 || session.blocked) {
        $('.chat__blocked').style.display = "flex";
        $('.chat__input').style.display = "none"; // вечная блокировка
    }

    // Если уже оплачено — убираем окно оплаты
    if (session.paid) {
        document.querySelector('.payment-block')?.remove();
    }

    setTimeout(() => $('.loading').style.top = "-150vh", 1000);
}

// === Проверка оплаты и показ кнопки 100 ₽ ===
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
            <h3 style="margin-bottom: 4px">Гадание «Да или Нет»</h3>
            <p style="margin-bottom: 25px">Один расклад Таро на ваш вопрос - всего 100 ₽</p>
            <button id="pay100" style="background:#7000ff; color:white; border:none; padding:15px 35px; border-radius:50px; font-size:18px; cursor:pointer;">Оплатить 100 ₽</button>
            <p style="font-size:12px; margin-top:15px; opacity:0.8;">Безопасная оплата через ЮKassa</p>
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
                returnUrl: `https://tarolex.ru/yes_or_not.html?y=${sessionId}`
            })
        });

        const data = await r.json();
        if (data.paymentUrl) {
            window.location.href = data.paymentUrl;
        } else {
            alert("Ошибка оплаты");
            btn.disabled = false;
            btn.textContent = "Оплатить 100 ₽";
        }
    };
}

// === Блокируем сеанс навсегда после ответа ===
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

    // Проверяем оплату
    const paid = await (await fetch(`/api/session/${sessionId}`)).json().then(s => s.paid);
    if (!paid) return;

    if (chatSteps === "name") {
        if (!/^[а-яА-ЯёЁ]{2,20}$/.test(value)) {
            await thinkAndType("Напишите, пожалуйста, своё имя одним словом, только русскими буквами");
            return;
        }
        await thinkAndType(`Хорошо, ${value}. Сколько вам лет?`);
        chatSteps = "year";

    } else if (chatSteps === "year") {
        const match = value.match(/\b(\d+)\b/);
        if (!match || parseInt(match[1]) < 10 || parseInt(match[1]) > 100) {
            await thinkAndType("Чтобы получить точный ответ от карт, укажите ваш возраст");
            return;
        }
        await thinkAndType("Спасибо! Теперь расскажите подробно: на какой вопрос вы хотели бы получить ответ от карт Таро в формате «Да» или «Нет»?");
        chatSteps = "question";

    } else if (chatSteps === "question") {
        if (value.length < 15) {
            await thinkAndType("Пожалуйста, опишите ситуацию чуть подробнее — хотя бы одним полным предложением. Карты любят ясность");
            return;
        }
        if (["бляд", "пизд", "хуй", "ебат", "сука"].some(w => value.toLowerCase().includes(w))) {
            await thinkAndType("Давай без грубостей, хорошо? Я хочу помочь");
            return;
        }

        await thinkAndType("Хорошо… Перетасовываю колоду и вытягиваю одну карту…");

        try {
            const res = await fetch("/api/tarot-yes-no", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    question: value,
                    assistantName: currentAssist
                })
            });

            const data = await res.json();
            const answer = data.answer || "ДА. Всё сложится в твою пользу.";

            await thinkAndType(answer);
            $('.chat__blocked').style.display = "flex";
            $('.chat__input').style.display = "none"; // скрываем ввод навсегда

            // Блокируем сессию на сервере
            await blockSessionForever();

            setTimeout(() => {
                const final = "Если хочешь новое гадание — открой в новой вкладке";
                addMessage('assistant', final);
                fetch("/api/save-message", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId, role: "assistant", content: final })
                });
            }, 2500);

        } catch (err) {
            await thinkAndType("Карты немного запутались… Попробуй сформулировать вопрос ещё раз");
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
    // Показываем кнопку оплаты всегда после загрузки/создания сессии
    setTimeout(checkAndShowPayment, 1500);
}

start();