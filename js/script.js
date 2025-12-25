// Настройки слайдера
const slider = new Swiper(".slider", {
    speed: 500,
    autoHeight: false,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
        nextEl: ".slider__right",
        prevEl: ".slider__left",
    },
    pagination: {
        el: '.swiper-pagination',
    },
    breakpoints: {
        // Когда ширина экрана ≥ 500px
        500: {
            slidesPerView: 1.3,
            spaceBetween: 16,
        }
    }
});

// Работа таймера
function paintZero(num) {
    if ( num < 10 && num > -1 ) {
        num = `0${num}`;
    }
    return num
}

let saveHour = 0;
let saveMin = 0;
let saveSec = 0;

function update() {
    var dt = new Date;
    var tz = dt.getTimezoneOffset();
    var now = Math.floor(dt / 1000 - tz * 60);
    // console.log( now + ( 12 * 60 * 60) );
    now = now - ( 12 * 60 * 60);
    var next = Math.ceil((dt / 1000 / 60 - tz) / 60 / 24) * 60 * 60 * 24;
    var left = next - now;
    var hours = ~~ (left/60/60);
    var mins = ~~(left/60%60);
    var secs = ~~(left%60);
    
    // hours = hours - 12;
    if ( hours > 24 ) {
        hours = hours % 24;
    }

    hours = paintZero(hours);
    mins = paintZero(mins);
    secs = paintZero(secs);

    saveHour = hours;
    saveMin = mins;
    saveSec = secs;

    document.querySelectorAll('.links__table span')[0].textContent = `2 д.${hours}:${mins}:${secs}`;
    document.querySelectorAll('.links__table span')[1].textContent = `3 д. ${hours}:${mins}:${secs}`;
    document.querySelectorAll('.links__table span')[2].textContent = `5 д. ${hours}:${mins}:${secs}`;
    document.querySelectorAll('.links__table span')[3].textContent = `6 д. ${hours}:${mins}:${secs}`;
    // document.querySelectorAll('.links__table span')[4].textContent = `2 д.${hours}:${mins}:${secs}`;
    // document.querySelectorAll('.links__table span')[5].textContent = `3 д. ${hours}:${mins}:${secs}`;
    // document.querySelectorAll('.links__table span')[6].textContent = `5 д. ${hours}:${mins}:${secs}`;
    // document.querySelectorAll('.links__table span')[7].textContent = `6 д. ${hours}:${mins}:${secs}`;
    document.querySelectorAll('.links__time')[0].textContent = `2 д.${hours}:${mins}:${secs}`;
    document.querySelectorAll('.links__time')[1].textContent = `3 д. ${hours}:${mins}:${secs}`;
    document.querySelectorAll('.links__time')[2].textContent = `5 д. ${hours}:${mins}:${secs}`;
    document.querySelectorAll('.links__time')[3].textContent = `6 д. ${hours}:${mins}:${secs}`;
    // document.querySelectorAll('.links__time')[4].textContent = `2 д.${hours}:${mins}:${secs}`;
    // document.querySelectorAll('.links__time')[5].textContent = `3 д. ${hours}:${mins}:${secs}`;
    // document.querySelectorAll('.links__time')[6].textContent = `5 д. ${hours}:${mins}:${secs}`;
    // document.querySelectorAll('.links__time')[7].textContent = `6 д. ${hours}:${mins}:${secs}`;

    // if ( hours < 12 ) {
    //     document.querySelectorAll('.links__table-first')[0].style.background = '#FF6635';
    //     document.querySelectorAll('.links__table-first')[0].style.color = '#FFF';
    //     document.querySelectorAll('.links__table-first svg')[0].style.fill = '#FFF';
    //     document.querySelectorAll('.links__table-first')[1].style.background = '#FF6635';
    //     document.querySelectorAll('.links__table-first')[1].style.color = '#FFF';
    //     document.querySelectorAll('.links__table-first svg')[1].style.fill = '#FFF';
    // } else {
    //     document.querySelectorAll('.links__table-first')[0].style.background = '#EEF1F8';
    //     document.querySelectorAll('.links__table-first')[0].style.color = '#191C1F';
    //     document.querySelectorAll('.links__table-first svg')[0].style.fill = '#4791DB';
    //     document.querySelectorAll('.links__table-first')[1].style.background = '#EEF1F8';
    //     document.querySelectorAll('.links__table-first')[1].style.color = '#191C1F';
    //     document.querySelectorAll('.links__table-first svg')[1].style.fill = '#4791DB';
    // }

    if ( left <= 0 ) {
        location.reload();
    }
}
update();
setInterval(update, 1000);

// Копирование ссылок кликом
document.querySelectorAll('.links__right')[0].addEventListener('click', event => {
    copyTimersInfo();
})

// document.querySelectorAll('.links__right')[1].addEventListener('click', event => {
//     copyTimersInfo();
// })

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied!');
            document.querySelector('.copy').style.transform = 'scale(1)';
            setTimeout( () => {
                document.querySelector('.copy').style.transform = 'scale(0)';
            }, 2000 )
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            document.execCommand('copy');
            console.log('Text copied!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textarea);
    }
}

function getEndDate(days, hours, minutes, seconds) {
    const now = new Date();
    const endTime = new Date(now.getTime() + (days * 24 * 3600 + hours * 3600 + minutes * 60 + seconds) * 1000);

    const day = String(endTime.getDate()).padStart(2, '0');
    const month = String(endTime.getMonth() + 1).padStart(2, '0');
    const year = endTime.getFullYear();
    const time = endTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    // return `${day}.${month}.${year} в 11:00`;
    return `${day}.${month}.${year} в ${time}`;
}

function copyTimersInfo() {
    const first = getEndDate(2, saveHour, saveMin, saveSec);
    const second = getEndDate(3, saveHour, saveMin, saveSec);
    const third = getEndDate(5, saveHour, saveMin, saveSec);
    const fourth = getEndDate(6, saveHour, saveMin, saveSec);
    copyToClipboard(`${document.querySelectorAll('.links__link p')[0].textContent} будет отключен ${first} | ${document.querySelectorAll('.links__link p')[1].textContent} будет отключен ${second} | ${document.querySelectorAll('.links__link p')[2].textContent} будет отключен ${third} | ${document.querySelectorAll('.links__link p')[3].textContent} будет отключен ${fourth}`);
}

// Открытие табличек с ссылкой и таймером

let openModal = false;

document.querySelectorAll('.links__table').forEach( (item, i) => {
    item.addEventListener('click', event => {

        document.querySelectorAll('.links__window').forEach( item => {
            item.style.opacity = '0';
            item.style.display = 'none';
        } )

        setTimeout( () => {
            document.querySelectorAll('.links__window')[i].style.display = 'block';
            setTimeout( () => {
                document.querySelectorAll('.links__window')[i].style.opacity = '1';
            }, 100 )
        }, 100 )

        openModal = true;

    })
})

// Закрытие таблички

document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.links__window');
    
    modals.forEach(modal => {
      if (!modal.contains(event.target)) {
        modal.style.display = 'none';
      }
    });
});

// Открытие карточек FAQ

let activeCards = [false, false, false, false, false, false];
document.querySelectorAll('.faq__head').forEach( (item, i) => {
    item.addEventListener('click', event => {
        if ( activeCards[i] == false ) {
            item.querySelector('svg').style.transform = "rotate(0deg)";
            document.querySelectorAll('.faq__card')[i].classList.add('faq__card-active');
            activeCards[i] = true;
        } else {
            item.querySelector('svg').style.transform = "rotate(180deg)";
            document.querySelectorAll('.faq__card')[i].classList.remove('faq__card-active');
            activeCards[i] = false;
        }
    })
})