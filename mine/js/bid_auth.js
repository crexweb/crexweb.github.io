let valuteNameFirst =  localStorage.getItem('mine-ex_valuteNameFirst');
let valuteNameSecond =  localStorage.getItem('mine-ex_valuteNameSecond');
let valuteCodeFirst =  localStorage.getItem('mine-ex_valuteCodeFirst');
let valuteCodeSecond =  localStorage.getItem('mine-ex_valuteCodeSecond');
let valuteUnicFirst =  localStorage.getItem('mine-ex_valuteUnicFirst');
let valuteUnicSecond =  localStorage.getItem('mine-ex_valuteUnicSecond');
let valuteTypeFirst =  localStorage.getItem('mine-ex_valuteTypeFirst');
let valuteTypeSecond =  localStorage.getItem('mine-ex_valuteTypeSecond');
let valuteNumberFirst =  localStorage.getItem('mine-ex_valuteNumberFirst');
let valuteNumberSecond =  localStorage.getItem('mine-ex_valuteNumberSecond');
let valuteIconFirst =  localStorage.getItem('mine-ex_valuteIconFirst');
let valuteIconSecond =  localStorage.getItem('mine-ex_valuteIconSecond');
let wallet =  localStorage.getItem('mine-ex_wallet');
let memo =  localStorage.getItem('mine-ex_memo');
let firstname =  localStorage.getItem('mine-ex_firstname');
let lastname =  localStorage.getItem('mine-ex_lastname');
let father =  localStorage.getItem('mine-ex_father');
let mail =  localStorage.getItem('mine-ex_mail');
let topEx =  localStorage.getItem('mine-ex_top');
let idOrder =  localStorage.getItem('mine-ex_id');
let dateOrder =  localStorage.getItem('mine-ex_date');

if ( !wallet || wallet == "" ) {
    location.href = "/notfound.html";
}

localStorage.setItem('mine-ex_log', "no");

document.querySelector('.ex__buffer').innerHTML = topEx;

document.querySelector('.wrapper__title').textContent = `ID заявки ${idOrder}`;
document.querySelector('.mobile__title p').textContent = `ID заявки ${idOrder}`;
document.title = `ID заявки ${idOrder}`;

document.querySelector('.bid__point-first').innerHTML = `Сумма платежа: <span>${valuteNumberFirst}</span> ${valuteNameFirst}`;
document.querySelector('.bid__point-second').innerHTML = `Получаете: <span>${valuteNumberSecond}</span> ${valuteNameSecond}`;
document.querySelector('.bid__point-wallet').innerHTML = `На счет: <span>${wallet}</span>`;
document.querySelector('.bid__point-time').innerHTML = `Время создания: <span>${dateOrder}</span>`;