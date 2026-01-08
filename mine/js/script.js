if ( document.querySelector('.wrapper__window') ) {

    let authWarning = document.createElement('div');
    authWarning.classList.add('wrapper__warning');
    authWarning.innerHTML = `<p>Ошибка! Неверный логин или e-mail</p>`;
    document.querySelector('.wrapper__window').prepend(authWarning);

    document.querySelector('.wrapper__button').addEventListener('click', event => {
        setTimeout( () => {
            document.querySelector(".wrapper__warning").style.display = "block";
        }, 750)
    })

}

// Функционал мониторинга мобильной версии
const listMobilePages = [
  'index','about','partner','rules','news','reviews','faq',
  'login','register','lostpass','exchange','payment',
  'create','code','bid_auth'
];

let page = location.pathname.split('/').pop();

if (!page || page === '') {
    page = 'index';
} else {
    page = page.replace('.html', '');
}

if (listMobilePages.includes(page)) {
    // твоя функция
    // console.log('Подходит')
}

if ( !localStorage.getItem('mine-ex__mobile') ) {
    if ( window.innerWidth > 600 ) {
        localStorage.setItem('mine-ex__mobile', "PC")
        // link.remove();
    } else {
        localStorage.setItem('mine-ex__mobile', "MOBILE")
    }

    location.reload();
}

// console.log(localStorage.getItem('mine-ex__mobile') )

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'css/mobile.css';

console.log(localStorage.getItem('mine-ex__mobile'));
if ( localStorage.getItem('mine-ex__mobile') == "MOBILE" ) {
    if (listMobilePages.includes(page)) {
        document.head.append(link);
    } else {
        location.href = "index.html";
    }
}

document.querySelector('.footer__mobile').addEventListener('click', event => {

    localStorage.setItem('mine-ex__mobile', "MOBILE")
    location.reload();

    if ( localStorage.getItem('mine-ex__mobile') == "MOBILE" ) {
        if (listMobilePages.includes(page)) {
            document.head.append(link);
        } else {
            location.href = "index.html";
        }
    }

})

if ( document.querySelector('.mobile__footer-desktop') ) {
    document.querySelector('.mobile__footer-desktop').addEventListener('click', event => {
        localStorage.setItem('mine-ex__mobile', "PC")
        location.reload();
    })
}

if ( document.querySelector('.mobile__menu-button-desktop') ) {
    document.querySelector('.mobile__menu-button-desktop').addEventListener('click', event => {
        // link.remove();
        localStorage.setItem('mine-ex__mobile', "PC")
        location.reload();
    })
}

// Скролл вверх

if ( document.querySelector('.mobile__footer-top') ) {
    document.querySelector('.mobile__footer-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Открытие мобильного меню

if ( document.querySelector('.mobile__header-menu') ) {
    let activeMenu = false;
    document.querySelector('.mobile__header-menu').addEventListener('click', event => {
    if ( activeMenu == false ) {
        document.querySelector('.mobile__menu').style.right = "0px";
        document.querySelector('.mobile__header-menu img').src = "../images/menu-ico-active.png";
        activeMenu = true;
    } else {
        document.querySelector('.mobile__menu').style.right = "-640px";
        document.querySelector('.mobile__header-menu img').src = "../images/menu-ico.png";
        activeMenu = false;
    }
})
}

document.querySelectorAll('.footer__partner').forEach( (item, i) => {
    item.addEventListener('click', event => {
        event.preventDefault()
    })
})

if ( document.querySelector('.wrapper__username') ) {

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

    document.querySelectorAll('.wrapper__username')[0].textContent = `Макс, ${date1}`;
    document.querySelectorAll('.wrapper__username')[1].textContent = `Ваше имя, ${date2}`;
    document.querySelectorAll('.wrapper__username')[2].textContent = `Aliak, ${date3}`;

}

if ( document.querySelector('.topped') ) {
    document.querySelector('.topped').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const topped = document.querySelector('.topped');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        topped.style.display = 'block';
    } else {
        topped.style.display = 'none';
    }
});