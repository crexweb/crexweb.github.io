// reviews-captcha.js — РАБОЧАЯ ВЕРСИЯ (2025)
let correctAnswer = null;
document.addEventListener('DOMContentLoaded', function () {
    const captchaContainer = document.querySelector('.reviews__captcha');
    if (!captchaContainer) return; // Нет каптчи — выходим (на других страницах)

    // Правильные селекторы — берём именно <img> внутри .reviews__image
    const firstImg   = document.querySelector('.reviews__captcha .reviews__image:nth-child(1) img');
    const secondImg  = document.querySelector('.reviews__captcha .reviews__image:nth-child(3) img');
    const operationEl = document.querySelector('.reviews__operation');
    const answerInput = document.querySelector('.reviews__answer');
    const updateBtn   = document.querySelector('.reviews__update');

    // Проверяем, что всё нашлось
    if (!firstImg || !secondImg || !operationEl || !answerInput || !updateBtn) {
        console.warn('Каптча не инициализирована — проверь HTML-структуру');
        return;
    }



    function generateCaptcha() {
        answerInput.value = '';

        const operators = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '×': (a, b) => a * b,  // лучше использовать × вместо *
            '÷': (a, b) => a / b   // и ÷ вместо /
        };
        const opSymbols = Object.keys(operators);
        let op, a, b, result;

        do {
            op = opSymbols[Math.floor(Math.random() * opSymbols.length)];
            a = Math.floor(Math.random() * 10);
            b = Math.floor(Math.random() * 10);

            if (op === '-' && b > a) [a, b] = [b, a];
            if ((op === '×' && (a > 5 || b > 5))) continue; // чтобы не было слишком больших чисел
            if (op === '÷') {
            if (b === 0) continue;
            if (a % b !== 0) continue;
            }

            result = operators[op](a, b);
        } while (result < 0 || result > 99 || !Number.isInteger(result));

        // Обновляем каптчу
        firstImg.src = `images/captcha/${a}.png`;
        secondImg.src = `images/captcha/${b}.png`;
        operationEl.textContent = op;  // теперь будет +, −, × или ÷

        correctAnswer = result;

        // console.log(`Каптча: ${a} ${op} ${b} = ${result}`);
    }

    // Запуск при загрузке
    generateCaptcha();

    // Обновление по клику
    updateBtn.addEventListener('click', function (e) {
        e.preventDefault();
        generateCaptcha();
    });

    // Глобальная функция для проверки (используй при отправке формы)
    window.checkCaptcha = function () {
        const userAnswer = parseInt(answerInput.value.trim());
        if (isNaN(userAnswer)) {
            // alert('Введите число!');
            answerInput.focus();
            return false;
        }
        if (userAnswer === correctAnswer) {
            return true;
        } else {
            // alert(`Неверно! Правильный ответ: ${correctAnswer}`);
            generateCaptcha();
            answerInput.focus();
            return false;
        }
    };


    // Отправка отзыва

    document.querySelector('.reviews__button').addEventListener('click', event => {

        setTimeout( () => {

            if ( document.querySelector('.reviews__answer').value == "" || document.querySelector('.reviews__answer').value != correctAnswer ) {
                document.querySelector(".reviews__warning p").textContent = "Ошибка! Вы ввели неверное число";
                document.querySelector(".reviews__warning").style.display = "block";
            } else if ( document.querySelector('.reviews__input-name').value.length < 2 ) {
                document.querySelector(".reviews__warning p").textContent = "Ошибка! Вы должны ввести свое имя";
                document.querySelector(".reviews__warning").style.display = "block";
            } else if ( document.querySelector('.reviews__input-mail').value.length < 10 || !document.querySelector('.reviews__input-mail').value.includes('@') && !document.querySelector('.reviews__input-mail').value.includes('.') ) {
                document.querySelector(".reviews__warning p").textContent = "Ошибка! вы должны ввести свой e-mail";
                document.querySelector(".reviews__warning").style.display = "block";
            } else if ( document.querySelector('.reviews__textarea').value.length < 8 ) {
                document.querySelector(".reviews__warning p").textContent = "Ошибка! Вы должны ввести текст отзыва";
                document.querySelector(".reviews__warning").style.display = "block";
            } else {
                document.querySelector(".reviews__warning p").textContent = "Ваш отзыв успешно добавлен и ожидает проверки";
                document.querySelector(".reviews__warning").style.display = "block";
                document.querySelector(".reviews__warning").style.background = "#ecf3e2";
                document.querySelector('.reviews__textarea').value = "";
            }

            generateCaptcha();

        }, 750)

    })

});

