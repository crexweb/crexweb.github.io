// const { event } = require("jquery");

// Подсветка валют левого стоблца
document.querySelectorAll(".promo__choise-first").forEach( (item, i) => {
    item.addEventListener("click", event => {

        document.querySelectorAll(".promo__choise-first").forEach( (item, i) => {
            item.classList.remove('promo__choise-active');
        })
        item.classList.add('promo__choise-active');

        document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => {
            item.style.opacity = "1";
        })

        if ( item.textContent.toLocaleLowerCase() == "все" ) {
            // document.querySelectorAll(".promo__choise-first").forEach( (item, i) => {
            //     item.style.opacity = "1";
            // })
        } else if ( item.textContent.toLocaleLowerCase() == "btc" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[0].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "bch" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[6].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "ada" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[7].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "dash" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[8].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "doge" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[9].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "etc" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[4].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "not" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[1].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "dot" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[5].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "xrp" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[2].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "link" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[3].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "eth" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[10].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "ton" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[11].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "sol" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[12].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "bnb" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[13].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "ltc" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[14].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "trx" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[15].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "dai" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[16].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "zec" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[17].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "usdt" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[18].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[19].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[20].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[21].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[22].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[23].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "usdc" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[24].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[25].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[26].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "usd" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[27].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[28].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[29].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[30].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "rub" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[31].style.opacity = "1";
            document.querySelectorAll(".promo__list-first .promo__card")[32].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "uah" ) {
            document.querySelectorAll(".promo__list-first .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-first .promo__card")[33].style.opacity = "1";
        }

    })
})

// Подсветка валют правого стоблца
document.querySelectorAll(".promo__choise-second").forEach( (item, i) => {
    item.addEventListener("click", event => {

        document.querySelectorAll(".promo__choise-second").forEach( (item, i) => {
            item.classList.remove('promo__choise-active');
        })
        item.classList.add('promo__choise-active');

        document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => {
            item.style.opacity = "1";
        })

        if ( item.textContent.toLocaleLowerCase() == "все" ) {
            document.querySelectorAll(".promo__choise-second").forEach( (item, i) => {
                item.style.opacity = "1";
            })
        } else if ( item.textContent.toLocaleLowerCase() == "pkr" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[31].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "kzt" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[40].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "btc" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[0].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "bch" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[6].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "ada" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[4].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "dash" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[1].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "doge" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[2].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "etc" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[5].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "not" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[10].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "dot" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[9].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "xrp" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[7].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "link" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[8].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "eth" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[3].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "ton" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[12].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "sol" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[13].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "bnb" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[14].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "ltc" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[15].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "trx" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[16].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "dai" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[17].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "xmr" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[11].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "usdt" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[18].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[19].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[20].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[21].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[22].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[23].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "usdc" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[24].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[25].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[26].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "usd" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[27].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[28].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[29].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[30].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[41].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "uah" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[31].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[33].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "try" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[32].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[34].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "rub" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[38].style.opacity = "1";
            document.querySelectorAll(".promo__list-second .promo__card")[39].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "kgs" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[35].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "azn" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[36].style.opacity = "1";
        } else if ( item.textContent.toLocaleLowerCase() == "amd" ) {
            document.querySelectorAll(".promo__list-second .promo__card").forEach( (item, i) => { item.style.opacity = "0.3"; })
            document.querySelectorAll(".promo__list-second .promo__card")[37].style.opacity = "1";
        }

    })
})

// Выбор первой валюты

let firstName = "Tether TRC20";
let secondName = "MoneyGo";

let firstType = "crypto";
let secondType = "fiat";

let codeFirstValute = "USDT";
let unicFirstValute = "USDTTRC20";
let blockedFirstValute = false;
document.querySelectorAll('.promo__list-first .promo__card').forEach( (item, i) => {

    item.addEventListener("click", event => {

        document.querySelectorAll('.promo__list-first .promo__card').forEach( (item, i) => {
            item.classList.remove("promo__card-active");
        })
        item.classList.add("promo__card-active");
        
        if ( item.classList.contains('promo__card-blocked') ) {
            blockedFirstValute = true;
        } else {
            blockedFirstValute = false;
        }

        codeFirstValute = item.querySelector(".promo__code").textContent;
        unicFirstValute = item.querySelector(".promo__unic").textContent;
        firstName = item.querySelector('p').textContent;
        // console.log(firstName)

        document.querySelector(".promo__name-first").textContent = codeFirstValute;
        document.querySelector(".promo__select-first").textContent = codeFirstValute;

        if ( item.classList.contains('crypto') ) {
            firstType = "crypto"
        } else {
            firstType = "fiat"
        }

        checkingCoupleValutes("first");
    })
})

// Выбор монеты из выпадающего списка

const select = document.querySelector('.mobile__select-first');
select.addEventListener('change', e => {

    const option = select.options[select.selectedIndex];

    console.log('UNIC:', option.dataset.unic);

    document.querySelectorAll('.promo__list-first .promo__card').forEach( (item, i) => {
        
        if ( item.querySelector('.promo__unic').textContent == option.dataset.unic ) {
            console.log(item);

            codeFirstValute = item.querySelector(".promo__code").textContent;
            unicFirstValute = item.querySelector(".promo__unic").textContent;
            firstName = item.querySelector('p').textContent;
            // console.log(firstName)

            document.querySelector(".promo__name-first").textContent = codeFirstValute;
            document.querySelector(".promo__select-first").textContent = codeFirstValute;

            if ( item.classList.contains('crypto') ) {
                firstType = "crypto"
            } else {
                firstType = "fiat"
            }

            document.querySelector('.mobile__icon-first img').src = item.querySelector('.promo__icon img').src;

            // document.querySelector('.mobile__input-first').value = "1";
            checkingCoupleValutes("first");
        }

    })

});

// Выбор второй валюты

let codeSecondValute = "USD";
let unicSecondValute = "MGO";
let blockedSecondValute = false;
document.querySelectorAll('.promo__list-second .promo__card').forEach( (item, i) => {

    item.addEventListener("click", event => {

        document.querySelectorAll('.promo__list-second .promo__card').forEach( (item, i) => {
            item.classList.remove("promo__card-active");
        })
        item.classList.add("promo__card-active");

        if ( item.classList.contains('promo__card-blocked') ) {
            blockedSecondValute = true;
        } else {
            blockedSecondValute = false;
        }

        codeSecondValute = item.querySelector(".promo__code").textContent;
        unicSecondValute = item.querySelector(".promo__unic").textContent;
        secondName = item.querySelector('p').textContent;
        // console.log(secondName)

        document.querySelector(".promo__name-second").textContent = codeSecondValute;
        document.querySelector(".promo__select-second").textContent = codeSecondValute;

        if ( item.classList.contains('crypto') ) {
            secondType = "crypto"
        } else {
            secondType = "fiat"
        }

        checkingCoupleValutes("second");
        // calculateExchange(trigger);
    })
})

const select2 = document.querySelector('.mobile__select-second');
select2.addEventListener('change', e => {

    const option = select2.options[select2.selectedIndex];

    // console.log('UNIC:', option.dataset.unic);

    document.querySelectorAll('.promo__list-second .promo__card').forEach( (item, i) => {
        
        if ( item.querySelector('.promo__unic').textContent == option.dataset.unic ) {
            // console.log(item);

            codeSecondValute = item.querySelector(".promo__code").textContent;
            unicSecondValute = item.querySelector(".promo__unic").textContent;
            secondName = item.querySelector('p').textContent;
            // console.log(firstName)

            document.querySelector(".promo__name-second").textContent = codeSecondValute;
            document.querySelector(".promo__select-second").textContent = codeSecondValute;

            if ( item.classList.contains('crypto') ) {
                secondType = "crypto"
            } else {
                secondType = "fiat"
            }

            document.querySelector('.mobile__icon-second img').src = item.querySelector('.promo__icon img').src;

            // document.querySelector('.mobile__input-second').value = "1";
            checkingCoupleValutes("first");
        }

    })

});

let activeExButton = true;
function checkingCoupleValutes(trigger) {

    document.querySelector('.promo__form .promo__loader').style.display = "flex";
    document.querySelector('.promo__none .promo__loader').style.display = "flex";

    document.querySelector('.mobile__white').style.display = "block";

    setTimeout( () => {

        if ( blockedFirstValute || blockedSecondValute ) {
            document.querySelector('.promo__form').style.display = "none"
            document.querySelector('.promo__none').style.display = "block"
            activeExButton = false
        } else if ( codeFirstValute == codeSecondValute ) {
            document.querySelector('.promo__form').style.display = "none"
            document.querySelector('.promo__none').style.display = "block"
            activeExButton = false
        } else if ( codeFirstValute == "USDT" && codeSecondValute == "USDC" ) {
            document.querySelector('.promo__form').style.display = "none"
            document.querySelector('.promo__none').style.display = "block"
            activeExButton = false
        } else if ( codeFirstValute == "USDC" && codeSecondValute == "USDT" ) {
            document.querySelector('.promo__form').style.display = "none"
            document.querySelector('.promo__none').style.display = "block"
            activeExButton = false
        } else if ( firstType == "fiat" && secondType == "fiat" ) {
            document.querySelector('.promo__form').style.display = "none"
            document.querySelector('.promo__none').style.display = "block"
            activeExButton = false
        } else {
            document.querySelector('.promo__form').style.display = "flex"
            document.querySelector('.promo__none').style.display = "none"

            activeExButton = true
            updateExchangeRateAndLimits(codeFirstValute, codeSecondValute);
        }

        document.querySelector('.promo__form .promo__loader').style.display = "none";
        document.querySelector('.promo__none .promo__loader').style.display = "none";

        document.querySelector('.mobile__white').style.display = "none";

        if ( document.querySelector(".promo__input-first").value == "" ) document.querySelector(".promo__input-first").value = 1;
        // if ( document.querySelector(".mobile__input-first").value == "" ) document.querySelector(".mobile__input-first").value = 1;

        calculateExchange(trigger);

        // Создание ссылки на второй экран

        document.querySelector('.promo__button').href = `exchange.html?${unicFirstValute}_to_${unicSecondValute}`;
        document.querySelector('.mobile__button').href = `exchange.html?${unicFirstValute}_to_${unicSecondValute}`;
        
    }, 1000 )
    
}

document.querySelector('.promo__button').href = `exchange.html?${unicFirstValute}_to_${unicSecondValute}`;
document.querySelector('.mobile__button').href = `exchange.html?${unicFirstValute}_to_${unicSecondValute}`;

document.querySelector('.promo__button').addEventListener('click', event => {
    if ( !activeExButton ) {
        event.preventDefault();
    } else {
        localStorage.setItem('mine-ex', document.querySelector('.promo__input-first').value);
    }
})

document.querySelector('.mobile__button').addEventListener('click', event => {
    if ( !activeExButton ) {
        event.preventDefault();
    } else {
        localStorage.setItem('mine-ex', document.querySelector('.mobile__input-first').value);
    }
})

// Открытие сети монеты

let firstSelectOpen = false;
document.querySelector('.promo__open-first').addEventListener("click", event => {
    if ( firstSelectOpen == false ) {
        document.querySelector('.promo__select-first').style.display = "block";
        firstSelectOpen = true;
    } else {
        document.querySelector('.promo__select-first').style.display = "none";
        firstSelectOpen = false;
    }
})

let secondSelectOpen = false;
document.querySelector('.promo__open-second').addEventListener("click", event => {
    if ( secondSelectOpen == false ) {
        document.querySelector('.promo__select-second').style.display = "block";
        secondSelectOpen = true;
    } else {
        document.querySelector('.promo__select-second').style.display = "none";
        secondSelectOpen = false;
    }
})

// Калькуляция валют

let minimumNumberUSD = 50;
let maximumNumberUSD = 100000;
let minimumNumberActiveFirst = 0;
let maximumNumberActiveFirst = 0;
let minimumNumberActiveSecond = 0;
let maximumNumberActiveSecond = 0;

let currentRateFirstToSecond = 0;

// Загрузка курсов из JSON
let crypto;
let fiat;

async function loadRates() {
  try {
    const [cryptoRes, fiatRes] = await Promise.all([
      fetch('prices/crypto.json'),
      fetch('prices/fiat.json')
    ]);

    if (!cryptoRes.ok || !fiatRes.ok) {
      throw new Error('Ошибка загрузки курсов');
    }

    crypto = await cryptoRes.json();
    fiat = await fiatRes.json();

    // console.log('Курсы загружены:', crypto, fiat);

    updateExchangeRateAndLimits(codeFirstValute, codeSecondValute);
    
  } catch (err) {
    console.error('Ошибка загрузки курсов:', err);
  }
}

// loadRates();
loadRates().then(() => {
    updateExchangeRateAndLimits(codeFirstValute, codeSecondValute);
    calculateExchange("first");
});

const FIAT_CORRECTION = {
    UAH: 10,
    KZT: 100,
    PKR: 1,
    USD: 1,
    TRY: 10,
    KGS: 100,
    AMD: 100
};

function updateExchangeRateAndLimits(first, second) {
    if (!crypto || !fiat) return;

    // Получаем цену в USD для обеих валют
    function getPriceInUSD(code) {
        // Крипта и стейблы — без изменений
        if (crypto.rates[code]) {
            return crypto.rates[code].price;
        }

        // USD
        if (code === "USD") {
            return 1;
        }

        const correction = FIAT_CORRECTION[code] || 1;

        if (fiat.cross[`${code}_USD`]) {
            return fiat.cross[`${code}_USD`] / correction;
        }

        if (fiat.cross[`USD_${code}`]) {
            return (1 / fiat.cross[`USD_${code}`]) / correction;
        }

        return 1; // fallback
    }

    const priceFirstUSD = getPriceInUSD(first);
    const priceSecondUSD = getPriceInUSD(second);

    if (priceFirstUSD <= 0 || priceSecondUSD <= 0) return;

    // Курс: сколько second даём за 1 first
    currentRateFirstToSecond = priceFirstUSD / priceSecondUSD;

    if ( firstType == "crypto" ) {
        currentRateFirstToSecond = currentRateFirstToSecond / 1.004; // percent
    }

    // Лимиты (как в предыдущей функции)
    const minUSD = minimumNumberUSD;
    const maxUSD = maximumNumberUSD;

    minimumNumberActiveFirst = minUSD / priceFirstUSD;
    maximumNumberActiveFirst = maxUSD / priceFirstUSD;
    minimumNumberActiveSecond = minUSD / priceSecondUSD;
    maximumNumberActiveSecond = maxUSD / priceSecondUSD;

    // Округление
    function smartRound(val, price) {
        if (price < 0.01) return Math.ceil(val * 100) / 100;
        if (price < 10) return Math.ceil(val * 10000) / 10000;
        return parseFloat(val.toFixed(6));
    }

    minimumNumberActiveFirst = smartRound(minimumNumberActiveFirst, priceFirstUSD);
    maximumNumberActiveFirst = parseFloat((maxUSD / priceFirstUSD).toFixed(6));
    minimumNumberActiveSecond = smartRound(minimumNumberActiveSecond, priceSecondUSD);
    maximumNumberActiveSecond = parseFloat((maxUSD / priceSecondUSD).toFixed(6));

    minimumNumberActiveFirst = smartRound(minimumNumberActiveFirst, priceFirstUSD);
    maximumNumberActiveFirst = parseFloat(( ( maxUSD - Math.floor(Math.random() * 1200) ) / priceFirstUSD).toFixed(6));
    minimumNumberActiveSecond = smartRound(minimumNumberActiveSecond, priceSecondUSD);
    maximumNumberActiveSecond = parseFloat(( ( maxUSD + Math.floor(Math.random() * 1200) ) / priceSecondUSD).toFixed(6));

    // Обновляем курс обмена
    const rateSpan = document.querySelector(".promo__table span");
    rateSpan.textContent = `1 ${first} = ${formatedNumbers(currentRateFirstToSecond)} ${second}`;

    const rateSpan2 = document.querySelector(".mobile__info-prices");
    rateSpan2.textContent = `Курс обмена: 1 ${first} = ${formatedNumbers(currentRateFirstToSecond)} ${second}`;

    document.querySelectorAll('.reserve__info p').forEach( (item, i) => {

        if ( item.textContent.includes(secondName.trim().split(' ')[0]) && item.textContent.includes(secondName.trim().split(' ')[0]) != "Карты" ) {
            document.querySelector(".promo__reserve span").textContent = `${document.querySelectorAll('.reserve__info span')[i].textContent} ${second}`;
            document.querySelector(".mobile__info-reserve").textContent = `Резерв: ${document.querySelectorAll('.reserve__info span')[i].textContent} ${second}`;
        }
        
        setTimeout( () => {
            if ( item.textContent == secondName ) {
                document.querySelector(".promo__reserve span").textContent = `${document.querySelectorAll('.reserve__info span')[i].textContent} ${second}`;
                document.querySelector(".mobile__info-reserve").textContent = `Резерв: ${document.querySelectorAll('.reserve__info span')[i].textContent} ${second}`;
            }
        }, 200)

    })

    calculateExchange();
}

function formatedNumbers(num) {

    num = Number(num);

    let result;

    if (num < 1) {
        result = num.toFixed(6);
    } else if (num < 10) {
        result = num.toFixed(5);
    } else if (num < 100) {
        result = num.toFixed(4);
    } else {
        result = num.toFixed(2);
    }

    return Number(result).toString();
}

function calculateExchange(trigger) {

    document.querySelector('.promo__form .promo__loader').style.display = "flex";
    document.querySelector('.mobile__white').style.display = "block";
    
    setTimeout( () => {

        let activeElement = document.activeElement;
        const inputFirst = document.querySelector(".promo__input-first");
        const inputSecond = document.querySelector(".promo__input-second");
        const inputThird = document.querySelector(".mobile__input-first");
        const inputFour = document.querySelector(".mobile__input-second");

        if (!inputFirst || !inputSecond || !inputThird || !inputFour || !currentRateFirstToSecond) return;

        const valueFirst = parseFloat(inputFirst.value.replace(/,/g, ''));
        const valueSecond = parseFloat(inputSecond.value.replace(/,/g, ''));
        const valueThird = parseFloat(inputThird.value.replace(/,/g, ''));
        const valueFour = parseFloat(inputFour.value.replace(/,/g, ''));

        // console.log(trigger)

        // Вводят в первое → считаем второе
        if (activeElement === inputFirst && !isNaN(valueFirst)) {
            const calculatedSecond = valueFirst * currentRateFirstToSecond;
            inputSecond.value = formatedNumbers(calculatedSecond);
            inputFour.value = formatedNumbers(calculatedSecond);
        }

        if (activeElement === inputThird && !isNaN(valueThird)) {
            const calculatedSecond = valueThird * currentRateFirstToSecond;
            inputSecond.value = formatedNumbers(calculatedSecond);
            inputFour.value = formatedNumbers(calculatedSecond);
        }

        if ( trigger == "first" ) {
            const calculatedSecond = valueFirst * currentRateFirstToSecond;
            inputSecond.value = formatedNumbers(calculatedSecond);
            inputFour.value = formatedNumbers(calculatedSecond);
        }

        // Вводят во второе → считаем первое
        if (activeElement === inputSecond && !isNaN(valueSecond)) {
            const calculatedFirst = valueSecond / currentRateFirstToSecond;
            inputFirst.value = formatedNumbers(calculatedFirst);
            inputThird.value = formatedNumbers(calculatedFirst);
        }

        if (activeElement === inputFour && !isNaN(valueFour)) {
            const calculatedFirst = valueFour / currentRateFirstToSecond;
            inputFirst.value = formatedNumbers(calculatedFirst);
            inputThird.value = formatedNumbers(calculatedFirst);
        }

        if ( trigger == "second" ) {
            const calculatedSecond = valueFirst * currentRateFirstToSecond;
            inputSecond.value = formatedNumbers(calculatedSecond);
            inputThird.value = formatedNumbers(calculatedSecond);
        }

        chekingLimitsInputs();

        document.querySelector('.promo__form .promo__loader').style.display = "none";
        document.querySelector('.mobile__white').style.display = "none";

    }, 750)
    
}


// Функция для замены запятой на точку и очистки от лишних символов
function formatInputValue(inputElement) {
    let value = inputElement.value;

    // Заменяем запятую на точку
    value = value.replace(/,/g, '.');

    // Удаляем все символы, кроме цифр, точки и минуса (на всякий случай, если нужен минус)
    value = value.replace(/[^0-9.]/g, '');

    // Убираем лишние точки (оставляем только одну)
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Убираем минус не в начале
    if (value.indexOf('-') > 0) {
        value = value.replace(/-/g, '');
    }

    // Если первая точка в начале — ок (например .5 → 0.5)
    if (value.startsWith('.')) {
        value = '0' + value;
    }

    // Обновляем значение в поле
    if (inputElement.value !== value) {
        inputElement.value = value;
    }
}

// Применяем к обоим инпутам
const inputFirst = document.querySelector(".promo__input-first");
const inputSecond = document.querySelector(".promo__input-second");
const inputThird = document.querySelector(".mobile__input-first");
const inputFour = document.querySelector(".mobile__input-second");

inputFirst.addEventListener("input", () => {
    formatInputValue(inputFirst);
    calculateExchange();
});

inputSecond.addEventListener("input", () => {
    formatInputValue(inputSecond);
    calculateExchange();
});

inputThird.addEventListener("input", () => {
    formatInputValue(inputThird);
    calculateExchange();
});

inputFour.addEventListener("input", () => {
    formatInputValue(inputFour);
    calculateExchange();
});

// Проверка и отображение пределы лимитов

function chekingLimitsInputs() {

    let firstInput = document.querySelector('.promo__input-first');
    let secondInput = document.querySelector('.promo__input-second');
    let thirdInput = document.querySelector('.mobile__input-first');
    let fourInput = document.querySelector('.mobile__input-second');

    if ( firstInput.value < minimumNumberActiveFirst ) {
        document.querySelector('.promo__limits-first').textContent = `min.: ${formatedNumbers(minimumNumberActiveFirst)} ${codeFirstValute}`;
        document.querySelector('.promo__limits-first').style.opacity = 1;
        document.querySelector('.promo__input-first').style.border = "1px solid #e46066";
        
    } else if ( firstInput.value > maximumNumberActiveFirst ) {
        document.querySelector('.promo__limits-first').textContent = `max.: ${formatedNumbers(maximumNumberActiveFirst)} ${codeFirstValute}`;
        document.querySelector('.promo__limits-first').style.opacity = 1;
        document.querySelector('.promo__input-first').style.border = "1px solid #e46066";

    } else {
        document.querySelector('.promo__limits-first').style.opacity = 0;
        document.querySelector('.promo__input-first').style.border = "1px solid #fff";

    }

    if ( thirdInput.value < minimumNumberActiveFirst ) {
        
        document.querySelector('.mobile__limit-first').textContent = `min.: ${formatedNumbers(minimumNumberActiveFirst)} ${codeFirstValute}`;
        document.querySelector('.mobile__limit-first').style.opacity = 1;
        document.querySelector('.mobile__input-first').style.border = "1px solid #e46066";
    } else if ( thirdInput.value > maximumNumberActiveFirst ) {

        document.querySelector('.mobile__limit-first').textContent = `max.: ${formatedNumbers(maximumNumberActiveFirst)} ${codeFirstValute}`;
        document.querySelector('.mobile__limit-first').style.opacity = 1;
        document.querySelector('.mobile__input-first').style.border = "1px solid #e46066";
    } else {

        document.querySelector('.mobile__limit-first').style.opacity = 0;
        document.querySelector('.mobile__input-first').style.border = "1px solid #fff";
    }

    if ( secondInput.value < minimumNumberActiveSecond ) {
        document.querySelector('.promo__limits-second').textContent = `min.: ${formatedNumbers(minimumNumberActiveSecond)} ${codeSecondValute}`;
        document.querySelector('.promo__limits-second').style.opacity = 1;
        document.querySelector('.promo__input-second').style.border = "1px solid #e46066";

    } else if ( secondInput.value > maximumNumberActiveSecond ) {
        document.querySelector('.promo__limits-second').textContent = `max.: ${formatedNumbers(maximumNumberActiveSecond)} ${codeSecondValute}`;
        document.querySelector('.promo__limits-second').style.opacity = 1;
        document.querySelector('.promo__input-second').style.border = "1px solid #e46066";

    } else {
        document.querySelector('.promo__limits-second').style.opacity = 0;
        document.querySelector('.promo__input-second').style.border = "1px solid #fff";

    }

    if ( fourInput.value < minimumNumberActiveSecond ) {

        document.querySelector('.mobile__limit-second').textContent = `min.: ${formatedNumbers(minimumNumberActiveSecond)} ${codeSecondValute}`;
        document.querySelector('.mobile__limit-second').style.opacity = 1;
        document.querySelector('.mobile__input-second').style.border = "1px solid #e46066";
    } else if ( fourInput.value > maximumNumberActiveSecond ) {

        document.querySelector('.mobile__limit-second').textContent = `max.: ${formatedNumbers(maximumNumberActiveSecond)} ${codeSecondValute}`;
        document.querySelector('.mobile__limit-second').style.opacity = 1;
        document.querySelector('.mobile__input-second').style.border = "1px solid #e46066";
    } else {

        document.querySelector('.mobile__limit-second').style.opacity = 0;
        document.querySelector('.mobile__input-second').style.border = "1px solid #fff";
    }

}

// Генерация свежих дат

function randomTime() {
  const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${h}:${m}`;
}

function formatDate(d) {
  return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
}

const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(today.getDate() - 2);

const threeDaysAgo = new Date(today);
threeDaysAgo.setDate(today.getDate() - 3);

const date1 = `${formatDate(yesterday)} ${randomTime()}`;
const date2 = `${formatDate(twoDaysAgo)} ${randomTime()}`;
const date3 = `${formatDate(threeDaysAgo)} ${randomTime()}`;

document.querySelectorAll('.review__card span')[0].textContent = `Макс, ${date1}`;
document.querySelectorAll('.review__card span')[1].textContent = `Ваше имя, ${date2}`;
document.querySelectorAll('.review__card span')[2].textContent = `Aliak, ${date3}`;

// Смена валют местами
document.querySelector('.mobile__change').addEventListener('click', event => {

    let bufferFirst = firstName;
    let bufferSecond = secondName;

    // let bufferNumberFirst = Number(document.querySelector('.mobile__input-first').value);
    // let bufferNumberSecond = Number(document.querySelector('.mobile__input-second').value);

    document.querySelector('.mobile__input-first').value = 1;

    let correctFirst = false;
    document.querySelectorAll('.promo__list-first .promo__card').forEach( (item, i) => {
        if ( item.querySelector('p').textContent == bufferSecond && !item.classList.contains('promo__card-blocked') ) {

            firstName = item.querySelector('p').textContent;
            unicFirstValute = item.querySelector('.promo__unic').textContent;
            codeFirstValute = item.querySelector('.promo__code').textContent;
            if ( item.classList.contains('crypto') ) {
                firstType = "crypto"
            } else {
                firstType = "fiat"
            }
            document.querySelector('.mobile__icon-first img').src = item.querySelector('.promo__icon img').src;

            const select = document.querySelector('.mobile__select-first');

            [...select.options].forEach(o => {
                o.selected = o.dataset.unic === unicFirstValute;
            });

            correctFirst = true;

        }

    })

    if ( correctFirst == false ) {
        firstName = "Bitcoin";
        unicFirstValute = "BTC";
        codeFirstValute = "BTC";
        firstType = "crypto"
        document.querySelector('.mobile__icon-first img').src = "images/BTC.png";
        const select = document.querySelector('.mobile__select-first');
        [...select.options].forEach(o => {
            o.selected = o.dataset.unic === unicFirstValute;
        });
    }

    // checkingCoupleValutes("first");

    let correctSecond = false;
    document.querySelectorAll('.promo__list-second .promo__card').forEach( (item, i) => {
        if ( item.querySelector('p').textContent == bufferFirst && !item.classList.contains('promo__card-blocked') ) {

            secondName = item.querySelector('p').textContent;
            unicSecondValute = item.querySelector('.promo__unic').textContent;
            codeSecondValute = item.querySelector('.promo__code').textContent;
            if ( item.classList.contains('crypto') ) {
                secondType = "crypto"
            } else {
                secondType = "fiat"
            }
            document.querySelector('.mobile__icon-second img').src = item.querySelector('.promo__icon img').src;

            const select = document.querySelector('.mobile__select-second');

            [...select.options].forEach(o => {
                o.selected = o.dataset.unic === unicSecondValute;
            });

            correctSecond = true;

        }

    })

    if ( correctSecond == false ) {
        if ( unicFirstValute != "BTC" ) {
            secondName = "Bitcoin";
            unicSecondValute = "BTC";
            codeSecondValute = "BTC";
            secondType = "crypto"
            document.querySelector('.mobile__icon-second img').src = "images/BTC.png";
            const select = document.querySelector('.mobile__select-second');
            [...select.options].forEach(o => {
                o.selected = o.dataset.unic === unicSecondValute;
            });
        } else {
            secondName = "Ethereum";
            unicSecondValute = "ETH";
            codeSecondValute = "ETH";
            secondType = "crypto"
            document.querySelector('.mobile__icon-second img').src = "images/ETH.png";
            const select = document.querySelector('.mobile__select-second');
            [...select.options].forEach(o => {
                o.selected = o.dataset.unic === unicSecondValute;
            });
        }
    }

    checkingCoupleValutes("first");
    
})
