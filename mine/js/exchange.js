let firstValuteURL = null;
let secondValuteURL = null;
let provenFirst = false;
let provenSecond = false;

let firstName = "Tether TRC20 USDT";
let firstType = "crypto";
let codeFirstValute = "USDT";
let unicFirstValute = "USDTTRC20";
let firstValutePicture = "images/USDT_TRC.png";

let secondName = "Bitcoin Cash BCH";
let secondType = "crypto";
let codeSecondValute = "BCH";
let unicSecondValute = "BCH";
let secondValutePicture = "images/BCH.png";

const query = window.location.search;

const listMemo = ['XRP', 'BNB', 'TRX', 'TON', 'USDTTON'];
let neededMemo = false;

if (query.startsWith('?') && query.includes('_to_')) {
    [firstValuteURL, secondValuteURL] = query
        .slice(1)
        .split('_to_');
}

if ( firstValuteURL != null && secondValuteURL != null ) {

    document.querySelectorAll('.ex__list-first .ex__item').forEach( (item, i) => {
        if ( item.querySelector('.ex__unic').textContent == firstValuteURL ) {
            provenFirst = true
        }
    })

    document.querySelectorAll('.ex__list-second .ex__item').forEach( (item, i) => {
        if ( item.querySelector('.ex__unic').textContent == secondValuteURL ) {
            provenSecond = true
        }
    })

    if ( provenFirst && provenSecond ) {

        document.querySelectorAll('.ex__list-first .ex__item').forEach( (item, i) => {
            item.classList.remove('ex__item-active');
        })

        document.querySelectorAll('.ex__list-second .ex__item').forEach( (item, i) => {
            item.classList.remove('ex__item-active');
        })

        document.querySelectorAll('.ex__list-first .ex__item').forEach( (item, i) => {
            if ( item.querySelector('.ex__unic').textContent == firstValuteURL ) {
                item.classList.add('ex__item-active');

                firstName = item.querySelector('p').textContent;
                codeFirstValute = item.querySelector('.ex__code').textContent;
                unicFirstValute = item.querySelector('.ex__unic').textContent;
                firstValutePicture = item.querySelector('img').src;
                if ( item.classList.contains('crypto') ) {
                    firstType = "crypto";
                } else {
                    firstType = "fiat";
                }
            }
        })

        document.querySelectorAll('.ex__list-second .ex__item').forEach( (item, i) => {
            if ( item.querySelector('.ex__unic').textContent == secondValuteURL ) {
                item.classList.add('ex__item-active');

                secondName = item.querySelector('p').textContent;
                codeSecondValute = item.querySelector('.ex__code').textContent;
                unicSecondValute = item.querySelector('.ex__unic').textContent;
                secondValutePicture = item.querySelector('img').src;
                if ( item.classList.contains('crypto') ) {
                    secondType = "crypto";
                } else {
                    secondType = "fiat";
                }
            }
        })

        document.querySelector('.ex__logo-first').src = firstValutePicture;
        document.querySelector('.ex__name-first').textContent = firstName;

        document.querySelector('.ex__logo-second').src = secondValutePicture;
        document.querySelector('.ex__name-second').textContent = secondName;

        document.querySelector('.ex__input-first').value = localStorage.getItem('mine-ex');

        let activePlatform = localStorage.getItem('mine-ex__mobile');
        localStorage.clear();
        localStorage.setItem('mine-ex__mobile', activePlatform);

        document.querySelectorAll('.ex__list-second .ex__item').forEach( (item, i) => {
            if ( item.querySelector('.ex__unic').textContent == unicSecondValute ) {
                if ( listMemo.includes(item.querySelector('.ex__unic').textContent) ) {
                    document.querySelector('.ex__memo').style.display = "block";
                    neededMemo = true;
                } else {
                    document.querySelector('.ex__memo').style.display = "none";
                    neededMemo = false;
                }
            }
        })

        const select = document.querySelector('.mobile__select-ex-first');
        [...select.options].forEach(o => {
            o.selected = o.dataset.unic === unicFirstValute;
        });

        const select2 = document.querySelector('.mobile__select-ex-second');
        [...select2.options].forEach(o => {
            o.selected = o.dataset.unic === unicSecondValute;
        });

        loadRates().then(() => {
            updateExchangeRateAndLimits(codeFirstValute, codeSecondValute);
            calculateExchange("first");
        });

    } else {
        loadRates().then(() => {
            updateExchangeRateAndLimits(codeFirstValute, codeSecondValute);
            calculateExchange("first");
        });
    }

    document.querySelector('.wrapper__page').textContent = `Обмен ${firstName} на ${secondName}`;
    document.querySelector('.wrapper__title').textContent = `Обмен ${firstName} на ${secondName}`;
    document.querySelector('.ex__info-title').textContent = `Обмен ${firstName} на ${secondName}`;
    document.title = `Обмен ${firstName} на ${secondName}`;
    document.querySelector('.ex__info-text span').textContent = `Обмен ${firstName} на ${secondName}`;
    document.querySelector('.mobile__title p').textContent = `Обмен ${firstName} на ${secondName}`;
     document.querySelectorAll('.first-value').forEach( (item, i) => {
        item.textContent = `${firstName.replace(/\s+\S+$/, '')} (${codeFirstValute})`;
    })
    document.querySelectorAll('.second-value').forEach( (item, i) => {
        item.textContent = `${secondName.replace(/\s+\S+$/, '')} (${codeSecondValute})`;
    })

}

let openingFirstList = false;
document.querySelector('.ex__table-first').addEventListener('click', event => {
    if ( openingFirstList == false ) {
        document.querySelector('.ex__list-first').style.display = "block";
        openingFirstList = true;
        if ( openingSecondList == true ) {
            document.querySelector('.ex__list-second').style.display = "none";
            openingSecondList = false;
        }
    }
})

let openingSecondList = false;
document.querySelector('.ex__table-second').addEventListener('click', event => {
    if ( openingSecondList == false ) {
        document.querySelector('.ex__list-second').style.display = "block";
        openingSecondList = true;
    }
})

// Дублирование функций с первого экрана

document.querySelectorAll('.ex__list-first .ex__item').forEach( (item, i) => {

    item.addEventListener("click", event => {

        document.querySelectorAll('.ex__list-first .ex__item').forEach( (item, i) => {
            item.classList.remove('ex__item-active');
        })

        item.classList.add('ex__item-active');

        firstName = item.querySelector('p').textContent;
        codeFirstValute = item.querySelector('.ex__code').textContent;
        unicFirstValute = item.querySelector('.ex__unic').textContent;
        firstValutePicture = item.querySelector('img').src;
        if ( item.classList.contains('crypto') ) {
            firstType = "crypto";
        } else {
            firstType = "fiat";
        }

        document.querySelector('.ex__logo-first').src = firstValutePicture;
        document.querySelector('.ex__name-first').textContent = firstName;

        setTimeout( () => {
            document.querySelector('.ex__list-first').style.display = "none";
            openingFirstList = false;
        }, 100)

        const select = document.querySelector('.mobile__select-ex-first');
        [...select.options].forEach(o => {
            o.selected = o.dataset.unic === unicFirstValute;
        });

        // console.log(codeFirstValute);
        checkingCoupleValutes("first");
    })

})

const select = document.querySelector('.mobile__select-ex-first');
select.addEventListener('change', e => {

    const option = select.options[select.selectedIndex];

    console.log('UNIC:', option.dataset.unic);

    document.querySelectorAll('.ex__list-first .ex__item').forEach( (item, i) => {
        
        if ( item.querySelector('.ex__unic').textContent == option.dataset.unic ) {
            console.log(item);

            codeFirstValute = item.querySelector(".ex__code").textContent;
            unicFirstValute = item.querySelector(".ex__unic").textContent;
            firstName = item.querySelector('p').textContent;
            // console.log(firstName)


            if ( item.classList.contains('crypto') ) {
                firstType = "crypto"
            } else {
                firstType = "fiat"
            }

            checkingCoupleValutes("first");

            // if ( unicFirstValute == unicSecondValute ) location.reload();
        }

    })

});

document.querySelectorAll('.ex__list-second .ex__item').forEach( (item, i) => {

    item.addEventListener("click", event => {
        document.querySelectorAll('.ex__list-second .ex__item').forEach( (item, i) => {
            item.classList.remove('ex__item-active');
        })

        item.classList.add('ex__item-active');

        secondName = item.querySelector('p').textContent;
        codeSecondValute = item.querySelector('.ex__code').textContent;
        unicSecondValute = item.querySelector('.ex__unic').textContent;
        secondValutePicture = item.querySelector('img').src;
        if ( item.classList.contains('crypto') ) {
            secondType = "crypto";
        } else {
            secondType = "fiat";
        }

        document.querySelector('.ex__logo-second').src = secondValutePicture;
        document.querySelector('.ex__name-second').textContent = secondName;

        setTimeout( () => {
            document.querySelector('.ex__list-second').style.display = "none";
            openingSecondList = false;
        }, 100)

        const select = document.querySelector('.mobile__select-ex-second');
        [...select.options].forEach(o => {
            o.selected = o.dataset.unic === unicSecondValute;
        });

        checkingCoupleValutes("second");
    })

})

const select2 = document.querySelector('.mobile__select-ex-second');
select2.addEventListener('change', e => {

    const option = select2.options[select2.selectedIndex];

    console.log('UNIC:', option.dataset.unic);

    document.querySelectorAll('.ex__list-second .ex__item').forEach( (item, i) => {
        
        if ( item.querySelector('.ex__unic').textContent == option.dataset.unic ) {

            codeSecondValute = item.querySelector(".ex__code").textContent;
            unicSecondValute = item.querySelector(".ex__unic").textContent;
            secondName = item.querySelector('p').textContent;

            if ( item.classList.contains('crypto') ) {
                secondType = "crypto"
            } else {
                secondType = "fiat"
            }

            checkingCoupleValutes("second");

            // if ( unicFirstValute == unicSecondValute ) location.reload();
        }

    })

});

let neededName = false;
function checkingCoupleValutes(trigger) {

    document.querySelector('.wrapper__loader-ex').style.display = "flex";

    setTimeout( () => {

        updateExchangeRateAndLimits(codeFirstValute, codeSecondValute);

        document.querySelector('.wrapper__page').textContent = `Обмен ${firstName} на ${secondName}`;
        document.querySelector('.wrapper__title').textContent = `Обмен ${firstName} на ${secondName}`;
        document.querySelector('.ex__info-title').textContent = `Обмен ${firstName} на ${secondName}`;
        document.title = `Обмен ${firstName} на ${secondName}`;
        document.querySelector('.ex__info-text span').textContent = `Обмен ${firstName} на ${secondName}`;
        document.querySelector('.mobile__title p').textContent = `Обмен ${firstName} на ${secondName}`;
        document.querySelectorAll('.first-value').forEach( (item, i) => {
            item.textContent = `${firstName.replace(/\s+\S+$/, '')} (${codeFirstValute})`;
        })
        document.querySelectorAll('.second-value').forEach( (item, i) => {
            item.textContent = `${secondName.replace(/\s+\S+$/, '')} (${codeSecondValute})`;
        })

        document.querySelector('.wrapper__loader-ex').style.display = "none";

        if ( document.querySelector(".ex__input-first").value == "" ) document.querySelector(".ex__input-first").value = 1;

        calculateExchange(trigger);

        document.querySelectorAll('.ex__list-second .ex__item').forEach( (item, i) => {
            if ( item.querySelector('.ex__unic').textContent == unicSecondValute ) {
                if ( listMemo.includes(item.querySelector('.ex__unic').textContent) ) {
                    document.querySelector('.ex__memo').style.display = "block";
                    neededMemo = true;
                } else {
                    document.querySelector('.ex__memo').style.display = "none";
                    neededMemo = false;
                }
            }
        })

        document.querySelectorAll('.ex__top-txt').forEach( (item, i) => {
            item.style.display = "none";
        })

        document.querySelector('.ex__firstname').style.display = "none";
        document.querySelector('.ex__lastname').style.display = "none";
        document.querySelector('.ex__father').style.display = "none";
        neededName = false;

        

        if ( unicFirstValute == "UAH" ) {
            document.querySelector('.ex__top-fop').style.display = "block";
        }

        if ( unicFirstValute == "USDTTRC20" ) {
            document.querySelector('.ex__top-link').style.display = "block";
        }

        document.querySelectorAll('.ex__list-second .ex__item').forEach( (item, i) => {
            item.style.display = "flex";
        })
        document.querySelectorAll('.ex__list-second .ex__item').forEach( (item, i) => {
            if ( item.querySelector('.ex__code').textContent == codeFirstValute ) {
                item.style.display = "none";

                if ( codeFirstValute == codeSecondValute ) {
                    if ( codeSecondValute != "BTC" ) {
                        secondName = "Bitcoin BTC";
                        secondType = "crypto";
                        codeSecondValute = "BTC";
                        unicSecondValute = "BTC";
                        secondValutePicture = "images/BTC.png";
                    } else {
                        secondName = "Ethereum ETH";
                        secondType = "crypto";
                        codeSecondValute = "ETH";
                        unicSecondValute = "ETH";
                        secondValutePicture = "images/ETH.png";
                    }
                }
            }

            document.querySelector('.wrapper__page').textContent = `Обмен ${firstName} на ${secondName}`;
            document.querySelector('.wrapper__title').textContent = `Обмен ${firstName} на ${secondName}`;
            document.querySelector('.ex__info-title').textContent = `Обмен ${firstName} на ${secondName}`;
            document.title = `Обмен ${firstName} на ${secondName}`;
            document.querySelector('.ex__info-text span').textContent = `Обмен ${firstName} на ${secondName}`;
            document.querySelectorAll('.first-value').forEach( (item, i) => {
                item.textContent = `${firstName.replace(/\s+\S+$/, '')} (${codeFirstValute})`;
            })
            document.querySelectorAll('.second-value').forEach( (item, i) => {
                item.textContent = `${secondName.replace(/\s+\S+$/, '')} (${codeSecondValute})`;
            })

            updateExchangeRateAndLimits(codeFirstValute, codeSecondValute);
            document.querySelector('.ex__logo-second').src = secondValutePicture;
            document.querySelector('.ex__name-second').textContent = secondName;

            history.replaceState(null, '', `?${unicFirstValute}_to_${unicSecondValute}`);

            const select = document.querySelector('.mobile__select-ex-first');
            [...select.options].forEach(o => {
                o.selected = o.dataset.unic === unicFirstValute;
            });

            const select2 = document.querySelector('.mobile__select-ex-second');
            [...select2.options].forEach(o => {
                o.selected = o.dataset.unic === unicSecondValute;
            });
        })

        if ( firstType == "fiat" && secondType == "crypto" ) {
            // document.querySelector('.ex__top-text-first').style.display = "block";
            // document.querySelector('.ex__top-redir').style.display = "block";
            document.querySelector('.ex__top-card').style.display = "block";
            document.querySelector('.ex__firstname').style.display = "block";
            document.querySelector('.ex__lastname').style.display = "block";
            document.querySelector('.ex__father').style.display = "block";
            neededName = true;

            document.querySelector('.ex__wallet .ex__label').innerHTML = `На кошелёк<span>*</span>:`;
            // if ( codeFirstValute == "UAH" ) document.querySelector('.ex__wallet .ex__label').innerHTML = `На номер карты<span>*</span>:`;
        } else if ( firstType == "crypto" && secondType == "crypto" ) {
            document.querySelector('.ex__top-text-first').style.display = "block";
            document.querySelector('.ex__top-point').style.display = "block";
            document.querySelector('.ex__top-aml').style.display = "block";
            document.querySelector('.ex__top-text-second').style.display = "block";
            document.querySelector('.ex__wallet .ex__label').innerHTML = `На кошелёк<span>*</span>:`;
        } else if ( firstType == "crypto" && secondType == "fiat" ) {
            document.querySelector('.ex__top-text-first').style.display = "block";
            document.querySelector('.ex__top-redir').style.display = "block";
            document.querySelector('.ex__top-point').style.display = "block";
            document.querySelector('.ex__top-aml').style.display = "block";
            document.querySelector('.ex__wallet .ex__label').innerHTML = `На счёт<span>*</span>:`;
        } else if ( firstType == "fiat" && secondType == "fiat" ) {
            // document.querySelector('.ex__top-text-first').style.display = "block";
            // document.querySelector('.ex__top-redir').style.display = "block";
            document.querySelector('.ex__top-card').style.display = "block";
            document.querySelector('.ex__wallet .ex__label').innerHTML = `На счёт<span>*</span>:`;
        }
        
        if ( unicSecondValute == "SBP" ) {
            document.querySelector('.ex__wallet .ex__label').innerHTML = `На номер телефона<span>*</span>:`;
        }
        
        if ( secondName.trim().split(' ')[0] == "Банковская" ) {
            document.querySelector('.ex__wallet .ex__label').innerHTML = `На номер карты<span>*</span>:`;
        }

        if ( unicSecondValute == "VOLET" ) {
            document.querySelector('.ex__wallet-input').placeholder = "U";
            document.querySelector('.ex__wallet-warning').style.opacity = "1";
        } else if ( unicSecondValute == "SBP" ) {
            document.querySelector('.ex__wallet-input').placeholder = "+7";
            document.querySelector('.ex__wallet-warning').style.opacity = "0";
        } else {
            document.querySelector('.ex__wallet-input').placeholder = "";
            document.querySelector('.ex__wallet-warning').style.opacity = "0";
        }
        
    }, 1000 )

    document.querySelectorAll('.ex__also-item').forEach( (item, i) => {
        item.remove();
    })

    // for ( let i = 0; i < 8; i++ ) {
    //     let newAlsoItem = document.createElement("div");
    //     newAlsoItem.classList.add('ex__also-item');
    //     let randomNumber = Math.floor(Math.random() * document.querySelectorAll('.ex__list-second .ex__item').length);
    //     if ( unicFirstValute != document.querySelectorAll('.ex__list-second .ex__item .ex__unic')[i].textContent ) {
    //         newAlsoItem.innerHTML = `<img src="images/right-arrow.png" alt="right"><a href="exchange.html?${unicFirstValute}_to_${document.querySelectorAll('.ex__list-second .ex__item .ex__unic')[randomNumber].textContent}">${firstName} → ${document.querySelectorAll('.ex__list-second .ex__item p')[randomNumber].textContent}</a>`;
    //         document.querySelector('.ex__also').append(newAlsoItem);
    //     }
    // }

    const items = document.querySelectorAll('.ex__list-second .ex__item');
    const usedIndexes = [];
    for (let i = 0; i < 8; i++) {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * items.length);
        } while (
            usedIndexes.includes(randomNumber) ||
            unicFirstValute === items[randomNumber].querySelector('.ex__unic').textContent
        );
        usedIndexes.push(randomNumber);
        let newAlsoItem = document.createElement("div");
        newAlsoItem.classList.add('ex__also-item');
        newAlsoItem.innerHTML = `
            <img src="images/right-arrow.png" alt="right">
            <a href="exchange.html?${unicFirstValute}_to_${items[randomNumber].querySelector('.ex__unic').textContent}">
                ${firstName} → ${items[randomNumber].querySelector('p').textContent}
            </a>
        `;
        document.querySelector('.ex__also').append(newAlsoItem);
    }


}

checkingCoupleValutes("first");

document.querySelector('.ex__top-text-first').style.display = "block";
document.querySelector('.ex__top-redir').style.display = "block";
document.querySelector('.ex__top-aml').style.display = "block";

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

    updateExchangeRateAndLimits(codeFirstValute, codeSecondValute);
    
  } catch (err) {
    console.error('Ошибка загрузки курсов:', err);
  }
}

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

    function getPriceInUSD(code) {

        if (crypto.rates[code]) {
            return crypto.rates[code].price;
        }

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
        currentRateFirstToSecond = currentRateFirstToSecond / 1.013;
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
    maximumNumberActiveFirst = parseFloat(( ( maxUSD - Math.floor(Math.random() * 1200) ) / priceFirstUSD).toFixed(6));
    minimumNumberActiveSecond = smartRound(minimumNumberActiveSecond, priceSecondUSD);
    maximumNumberActiveSecond = parseFloat(( ( maxUSD + Math.floor(Math.random() * 1200) ) / priceSecondUSD).toFixed(6));

    // maximumNumberActiveFirst = maximumNumberActiveFirst + Math.floor(Math.random() * 200);

    // Обновляем курс обмена в табло
    document.querySelector('.ex__limits-first').textContent = `min.: ${formatedNumbers(minimumNumberActiveFirst)} ${codeFirstValute}, max.: ${formatedNumbers(maximumNumberActiveFirst)} ${codeFirstValute}`;
    document.querySelector('.ex__limits-second').textContent = `min.: ${formatedNumbers(minimumNumberActiveSecond)} ${codeSecondValute}, max.: ${formatedNumbers(maximumNumberActiveSecond)} ${codeSecondValute}`;

    calculateExchange();
}

// function formatedNumbers(num) {

//     num = Number(num);

//     if ( num < 1 ) {
//         return num.toFixed(6)
//     } else if ( num >= 1 && num < 10 ) {
//         return num.toFixed(5)
//     } else if ( num >= 10 && num < 100 ) {
//         return num.toFixed(4)
//     } else {
//         return num.toFixed(2)
//     }

// }

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

    document.querySelector('.wrapper__loader-ex').style.display = "flex";
    
    setTimeout( () => {

        let activeElement = document.activeElement;
        const inputFirst = document.querySelector(".ex__input-first");
        const inputSecond = document.querySelector(".ex__input-second");

        if (!inputFirst || !inputSecond || !currentRateFirstToSecond) return;

        let valueFirst = parseFloat(inputFirst.value.replace(/,/g, ''));
        let valueSecond = parseFloat(inputSecond.value.replace(/,/g, ''));

        if ( codeFirstValute == "USDT" && Number(document.querySelector('.ex__input-first').value) < 100 ) {
            document.querySelector('.ex__tether').textContent = '⚠️ При суммах, не превышающих 100 USDT, взимается дополнительная комиссия 2 USDT, которая покрывает затраты на обработку перевода.';
            document.querySelector('.ex__line-usdt').style.display = "flex";
            valueFirst = valueFirst + 2;
            document.querySelector('.ex__input-added').value = Number(document.querySelector('.ex__input-first').value) + 2;
        } else if ( codeFirstValute == "USDC" && Number(document.querySelector('.ex__input-first').value) < 100 ) {
            document.querySelector('.ex__tether').textContent = '⚠️ При суммах, не превышающих 100 USDC, взимается дополнительная комиссия 2 USDC, которая покрывает затраты на обработку перевода.';
            document.querySelector('.ex__line-usdt').style.display = "flex";
            valueFirst = valueFirst + 2;
            document.querySelector('.ex__input-added').value = Number(document.querySelector('.ex__input-first').value) + 2;
        } else {
            document.querySelector('.ex__line-usdt').style.display = "none";
        }

        if (activeElement === inputFirst && !isNaN(valueFirst)) {
            const calculatedSecond = valueFirst * currentRateFirstToSecond;
            inputSecond.value = formatedNumbers(calculatedSecond);
            console.log(currentRateFirstToSecond);
        }

        if ( trigger == "first" ) {
            const calculatedSecond = valueFirst * currentRateFirstToSecond;
            inputSecond.value = formatedNumbers(calculatedSecond);
        }

        if (activeElement === inputSecond && !isNaN(valueSecond)) {
            const calculatedFirst = valueSecond / currentRateFirstToSecond;
            inputFirst.value = formatedNumbers(calculatedFirst);
        }

        if ( trigger == "second" ) {
            const calculatedSecond = valueFirst * currentRateFirstToSecond;
            inputSecond.value = formatedNumbers(calculatedSecond);
        }

        chekingLimitsInputs();

        document.querySelector('.wrapper__loader-ex').style.display = "none";

        

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
const inputFirst = document.querySelector(".ex__input-first");
const inputSecond = document.querySelector(".ex__input-second");

inputFirst.addEventListener("input", () => {
    formatInputValue(inputFirst);
    calculateExchange();
});

inputSecond.addEventListener("input", () => {
    formatInputValue(inputSecond);
    calculateExchange();
});

// Проверка и отображение пределы лимитов
function chekingLimitsInputs() {

    let firstInput = document.querySelector('.ex__input-first');
    let secondInput = document.querySelector('.ex__input-second');

    if ( firstInput.value < minimumNumberActiveFirst ) {
        document.querySelector('.ex__limit-first').textContent = `min.: ${formatedNumbers(minimumNumberActiveFirst)} ${codeFirstValute}`;
        document.querySelector('.ex__limit-first').style.opacity = 1;
        document.querySelector('.ex__input-first').style.border = "1px solid #e46066";
    } else if ( firstInput.value > maximumNumberActiveFirst ) {
        document.querySelector('.ex__limit-first').textContent = `max.: ${formatedNumbers(maximumNumberActiveFirst)} ${codeFirstValute}`;
        document.querySelector('.ex__limit-first').style.opacity = 1;
        document.querySelector('.ex__input-first').style.border = "1px solid #e46066";
    } else {
        document.querySelector('.ex__limit-first').style.opacity = 0;
        document.querySelector('.ex__input-first').style.border = "1px solid #fff";
    }

    if ( secondInput.value < minimumNumberActiveSecond ) {
        document.querySelector('.ex__limit-second').textContent = `min.: ${formatedNumbers(minimumNumberActiveSecond)} ${codeSecondValute}`;
        document.querySelector('.ex__limit-second').style.opacity = 1;
        document.querySelector('.ex__input-second').style.border = "1px solid #e46066";
    } else if ( secondInput.value > maximumNumberActiveSecond ) {
        document.querySelector('.ex__limit-second').textContent = `max.: ${formatedNumbers(maximumNumberActiveSecond)} ${codeSecondValute}`;
        document.querySelector('.ex__limit-second').style.opacity = 1;
        document.querySelector('.ex__input-second').style.border = "1px solid #e46066";
    } else {
        document.querySelector('.ex__limit-second').style.opacity = 0;
        document.querySelector('.ex__input-second').style.border = "1px solid #fff";
    }

}

// Создание заявки

let haveProblem = false;
document.querySelector('.ex__button').addEventListener('click', event => {

    document.querySelector('.wrapper__loader-ex').style.display = "flex";

    haveProblem = false;
    document.querySelector('.ex__wallet').classList.remove('ex__wallet-active');
    document.querySelector('.ex__memo').classList.remove('ex__memo-active');
    document.querySelector('.ex__firstname').classList.remove('ex__firstname-active');
    document.querySelector('.ex__lastname').classList.remove('ex__lastname-active');
    document.querySelector('.ex__mail').classList.remove('ex__mail-active');

    let lengthWallet = document.querySelector('.ex__wallet-input').value.length;
    if ( secondType == "fiat" ) {
        if ( document.querySelector('.ex__wallet-input').value.length < 8 ) {
            document.querySelector('.ex__wallet').classList.add('ex__wallet-active');
            haveProblem = true;
        }
    } else if ( secondType == "crypto" ) {
        if ( document.querySelector('.ex__wallet-input').value.length < 14 ) {
            document.querySelector('.ex__wallet').classList.add('ex__wallet-active');
            haveProblem = true;
        }
    }
    
    console.log('memo')
    console.log(neededMemo)
    if ( neededMemo ) {
        if ( document.querySelector('.ex__memo-input').value.length < 1 ) {
            document.querySelector('.ex__memo').classList.add('ex__memo-active');
            haveProblem = true;
        }
    }

    if ( neededName ) {
        if ( document.querySelector('.ex__firstname-input').value.length < 1 ) {
            document.querySelector('.ex__firstname').classList.add('ex__firstname-active');
            haveProblem = true;
        }

        if ( document.querySelector('.ex__lastname-input').value.length < 1 ) {
            document.querySelector('.ex__lastname').classList.add('ex__lastname-active');
            haveProblem = true;
        }
    }

    const emailInput = document.querySelector('.ex__mail-input');
    const email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        // alert('Введите email');
    } else if (!emailRegex.test(email)) {
        // alert('Некорректный email');
        document.querySelector('.ex__mail').classList.add('ex__mail-active');
        haveProblem = true;
    }
    
    if ( email.length < 8 || email == "" ) {
        document.querySelector('.ex__mail').classList.add('ex__mail-active');
        haveProblem = true;
    }

    let firstInput = document.querySelector('.ex__input-first');
    let secondInput = document.querySelector('.ex__input-second');

    setTimeout( () => {

        if ( firstInput.value < minimumNumberActiveFirst ) {
            document.querySelector('.ex__limit-first').textContent = `min.: ${formatedNumbers(minimumNumberActiveFirst)} ${codeFirstValute}`;
            document.querySelector('.ex__limit-first').style.opacity = 1;
            document.querySelector('.ex__input-first').style.border = "1px solid #e46066";
            haveProblem = true;
        } else if ( firstInput.value > maximumNumberActiveFirst ) {
            document.querySelector('.ex__limit-first').textContent = `max.: ${formatedNumbers(maximumNumberActiveFirst)} ${codeFirstValute}`;
            document.querySelector('.ex__limit-first').style.opacity = 1;
            document.querySelector('.ex__input-first').style.border = "1px solid #e46066";
            haveProblem = true;
        } else {
            document.querySelector('.ex__limit-first').style.opacity = 0;
            document.querySelector('.ex__input-first').style.border = "1px solid #fff";
        }

        if ( secondInput.value < minimumNumberActiveSecond ) {
            document.querySelector('.ex__limit-second').textContent = `min.: ${formatedNumbers(minimumNumberActiveSecond)} ${codeSecondValute}`;
            document.querySelector('.ex__limit-second').style.opacity = 1;
            document.querySelector('.ex__input-second').style.border = "1px solid #e46066";
            haveProblem = true;
        } else if ( secondInput.value > maximumNumberActiveSecond ) {
            document.querySelector('.ex__limit-second').textContent = `max.: ${formatedNumbers(maximumNumberActiveSecond)} ${codeSecondValute}`;
            document.querySelector('.ex__limit-second').style.opacity = 1;
            document.querySelector('.ex__input-second').style.border = "1px solid #e46066";
            haveProblem = true;
        } else {
            document.querySelector('.ex__limit-second').style.opacity = 0;
            document.querySelector('.ex__input-second').style.border = "1px solid #fff";
        }

        if ( haveProblem ) {
            document.querySelector('.ex__warning').style.display = "block";
        } else {
            
            localStorage.setItem('mine-ex_valuteNameFirst', firstName);
            localStorage.setItem('mine-ex_valuteNameSecond', secondName);
            localStorage.setItem('mine-ex_valuteCodeFirst', codeFirstValute);
            localStorage.setItem('mine-ex_valuteCodeSecond', codeSecondValute);
            localStorage.setItem('mine-ex_valuteUnicFirst', unicFirstValute);
            localStorage.setItem('mine-ex_valuteUnicSecond', unicSecondValute);
            localStorage.setItem('mine-ex_valuteTypeFirst', firstType);
            localStorage.setItem('mine-ex_valuteTypeSecond', secondType);
            localStorage.setItem('mine-ex_valuteNumberFirst', document.querySelector('.ex__input-first').value);
            localStorage.setItem('mine-ex_valuteNumberSecond', document.querySelector('.ex__input-second').value);
            localStorage.setItem('mine-ex_valuteIconFirst', document.querySelector('.ex__logo-first').src);
            localStorage.setItem('mine-ex_valuteIconSecond', document.querySelector('.ex__logo-second').src);
            
            localStorage.setItem('mine-ex_wallet', document.querySelector('.ex__wallet-input').value);
            localStorage.setItem('mine-ex_memo', document.querySelector('.ex__memo-input').value);
            localStorage.setItem('mine-ex_firstname', document.querySelector('.ex__firstname-input').value);
            localStorage.setItem('mine-ex_lastname', document.querySelector('.ex__lastname-input').value);
            localStorage.setItem('mine-ex_father', document.querySelector('.ex__father-input').value);
            localStorage.setItem('mine-ex_mail', document.querySelector('.ex__mail-input').value);
            
            localStorage.setItem('mine-ex_top', document.querySelector('.ex__top-right').outerHTML);
            localStorage.setItem('mine-ex_code', Math.floor(Math.random() * 900000) + 100000);
            localStorage.setItem('mine-ex_id', Math.floor(Math.random() * 90000000) + 10000000);
            
            const now = new Date();
            
            const date =
                String(now.getDate()).padStart(2, '0') + '.' +
                String(now.getMonth() + 1).padStart(2, '0') + '.' +
                now.getFullYear() + ', ' +
                String(now.getHours()).padStart(2, '0') + ':' +
                String(now.getMinutes()).padStart(2, '0');
            
            localStorage.setItem('mine-ex_date', date);
            localStorage.setItem('mine-ex_rate', currentRateFirstToSecond);

            document.querySelector('.ex__warning').style.background = "#f0f5f3";
            document.querySelector('.ex__warning p').textContent = "Идёт обработка. Пожалуйста подождите";
            document.querySelector('.ex__warning').style.display = "block";
            
            setTimeout( () => {
                location.href = "create.html";
            }, 1500)

        }
        
        document.querySelector('.wrapper__loader-ex').style.display = "none";

    }, 750)

})