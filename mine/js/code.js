const sendConfirmationEmail = (userEmail, link, code) => {
  const templateParams = {
    user_email: userEmail,
    link: link,
    code: code,
  };

  emailjs.send('service_yzroute', 'template_8tsbgk2', templateParams)
    .then((response) => {
      console.log('Письмо отправлено!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Ошибка отправки:', error);
    });
};

// Функция генерации UUID
function generateUUID() {
  return crypto.randomUUID();
}

// Получаем все данные из localStorage
let valuteNameFirst = localStorage.getItem('mine-ex_valuteNameFirst');
let valuteNameSecond = localStorage.getItem('mine-ex_valuteNameSecond');
let valuteCodeFirst = localStorage.getItem('mine-ex_valuteCodeFirst');
let valuteCodeSecond = localStorage.getItem('mine-ex_valuteCodeSecond');
let valuteUnicFirst = localStorage.getItem('mine-ex_valuteUnicFirst');
let valuteUnicSecond = localStorage.getItem('mine-ex_valuteUnicSecond');
let valuteTypeFirst = localStorage.getItem('mine-ex_valuteTypeFirst');
let valuteTypeSecond = localStorage.getItem('mine-ex_valuteTypeSecond');
let valuteNumberFirst = localStorage.getItem('mine-ex_valuteNumberFirst');
let valuteNumberSecond = localStorage.getItem('mine-ex_valuteNumberSecond');
let valuteIconFirst = localStorage.getItem('mine-ex_valuteIconFirst');
let valuteIconSecond = localStorage.getItem('mine-ex_valuteIconSecond');
let wallet = localStorage.getItem('mine-ex_wallet');
let memo = localStorage.getItem('mine-ex_memo');
let firstname = localStorage.getItem('mine-ex_firstname');
let lastname = localStorage.getItem('mine-ex_lastname');
let father = localStorage.getItem('mine-ex_father');
let mail = localStorage.getItem('mine-ex_mail');
let topEx = localStorage.getItem('mine-ex_top');
let idOrder = localStorage.getItem('mine-ex_id');
let dateOrder = localStorage.getItem('mine-ex_date');
let rateOrder = localStorage.getItem('mine-ex_rate');

// Заполняем элементы на странице
document.querySelector('.code__title p span').textContent = mail;
document.querySelector('.code__point-newmail').href = `/exchange.html?${valuteUnicFirst}_to_${valuteUnicSecond}`;

// Генерируем НОВЫЙ UUID и код (если код ещё не сохранён)
let authCode = localStorage.getItem('mine-ex_code');
if (!authCode) {
  authCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-значный код
  localStorage.setItem('mine-ex_code', authCode);
}

const uuid = generateUUID(); // ← Вот тут новый уникальный UUID каждый раз!

const newLink = `${location.origin}/bid_auth.html?uuid=${uuid}&code=${authCode}`;

// Отправляем письмо с новой ссылкой и кодом
sendConfirmationEmail(mail, newLink, authCode);

// Проверка введённого кода
document.querySelector('.code__button').addEventListener('click', event => {
  if (document.querySelector('.code__input').value === authCode) {
    location.href = "/create.html";
  } else {
    document.querySelector('.code__input').value = "";
  }
});

// Повторная отправка кода (при клике "Отправить новый код")
document.querySelector('.code__point-newcode').addEventListener('click', event => {
  event.preventDefault();
  
  // Можно сгенерировать новый код при повторной отправке (по желанию)
  const newAuthCode = Math.floor(100000 + Math.random() * 900000).toString();
  localStorage.setItem('mine-ex_code', newAuthCode); // обновляем код

  const newUuid = generateUUID(); // новый UUID
  const updatedLink = `${location.origin}/bid_auth.html?uuid=${newUuid}&code=${newAuthCode}`;

  sendConfirmationEmail(mail, updatedLink, newAuthCode);
});