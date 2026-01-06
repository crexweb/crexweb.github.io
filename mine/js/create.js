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
let rateOrder =  localStorage.getItem('mine-ex_rate');

if ( !wallet || wallet == "" ) {
    location.href = "/notfound.html";
}

// Сборка страницы
document.title = `Обмен ${valuteNameFirst} на ${valuteNameSecond}`;
document.querySelector('.wrapper__title').textContent = `Обмен ${valuteNameFirst} на ${valuteNameSecond}`;
document.querySelector('.ex__buffer').innerHTML = topEx;
document.querySelector('.create__summ-first span').textContent = `${valuteNumberFirst} ${valuteNameFirst}`;
document.querySelector('.create__coin-first img').src = valuteIconFirst;
document.querySelector('.create__coin-first p').textContent = valuteNameFirst;
document.querySelector('.create__summ-second span').textContent = `${valuteNumberSecond} ${valuteNameSecond}`;
document.querySelector('.create__wallet span').textContent = wallet;
document.querySelector('.create__coin-second img').src = valuteIconSecond;
document.querySelector('.create__coin-second p').textContent = valuteNameSecond;
document.querySelector('.create__mail span').textContent = mail;

document.querySelector('.mobile__title p').textContent = `Обмен ${valuteNameFirst} на ${valuteNameSecond}`;

document.querySelector('.create__button').addEventListener('click', event => {

    // console.log(document.querySelector('.create__check input').checked);

    if ( document.querySelector('.create__check input').checked ) {

        document.querySelector('.create__warning').style.background = "#f0f5f3";
        document.querySelector('.create__warning p').textContent = "Идёт обработка. Пожалуйста подождите";
        document.querySelector('.create__warning').style.display = "block";

        setTimeout( () => {
            document.querySelector('.create__warning p').textContent = "Ваша заявка успешно создана.";

            setTimeout( () => {
                location.href = `/bid_auth.html`;
            }, 1500)
        }, 1500)

    }

})