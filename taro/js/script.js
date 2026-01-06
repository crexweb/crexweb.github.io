window.addEventListener('load', () => {

    // Отображение количество гадалок онлайн
    const numOnline = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
    document.querySelector('.online__text span').textContent = `${numOnline} Таро-практика`;

    for ( let i = 0; i < numOnline; i++ ) {
        document.querySelectorAll('.online__circle')[i].style.display = "block";
    }

    // Мобильное меню
    let activeMenu = false;
    document.querySelector('.header__menu').addEventListener('click', event => {
        if ( activeMenu == false ) {
            document.querySelector('.header__list').style.maxHeight = "400px";
            activeMenu = true;
        } else {
            document.querySelector('.header__list').style.maxHeight = "0px";
            activeMenu = false;
        }
    })

    // Скролл по страницам
    document.querySelector('.promo__next').onclick=()=>document.querySelector('.promo__next').scrollIntoView({behavior:'smooth'});
    document.querySelectorAll('.header__link')[0].onclick=()=>document.querySelector('.promo__next').scrollIntoView({behavior:'smooth'});
    document.querySelectorAll('.header__link')[1].onclick=()=>document.querySelector('.what__star').scrollIntoView({behavior:'smooth'});
    document.querySelectorAll('.header__link')[2].onclick=()=>document.querySelectorAll('.main__hr')[1].scrollIntoView({behavior:'smooth'});
    document.querySelectorAll('.header__link')[3].onclick=()=>document.querySelectorAll('.main__hr')[5].scrollIntoView({behavior:'smooth'});
    document.querySelectorAll('.header__btn')[0].onclick=()=>document.querySelector('.promo__next').scrollIntoView({behavior:'smooth'});
    document.querySelectorAll('.header__btn')[1].onclick=()=>document.querySelector('.what__star').scrollIntoView({behavior:'smooth'});
    document.querySelectorAll('.header__btn')[2].onclick=()=>document.querySelectorAll('.main__hr')[1].scrollIntoView({behavior:'smooth'});
    document.querySelectorAll('.header__btn')[3].onclick=()=>document.querySelectorAll('.main__hr')[5].scrollIntoView({behavior:'smooth'});
    document.querySelector('.header__chat').onclick=()=>document.querySelectorAll('.main__hr')[1].scrollIntoView({behavior:'smooth'});

    // Политика

    document.querySelectorAll('.footer__button')[0].addEventListener('click', event => {
        document.querySelector('.politic').style.display = "block";
        setTimeout( () => {
            document.querySelector('.politic').style.opacity = 1;
            setTimeout( () => {
                document.querySelector('.politic__body').style.top = "50%";
            }, 600)
        }, 300)
    })

    document.querySelector('.politic__close').addEventListener('click', event => {
        document.querySelector('.politic__body').style.top = "-150%";
        setTimeout( () => {
            document.querySelector('.politic').style.opacity = 0;
            setTimeout( () => {
                document.querySelector('.politic').style.display = "none";
            }, 600)
        }, 300)
    })

    // Соглашение

    document.querySelectorAll('.footer__button')[1].addEventListener('click', event => {
        document.querySelector('.user').style.display = "block";
        setTimeout( () => {
            document.querySelector('.user').style.opacity = 1;
            setTimeout( () => {
                document.querySelector('.user__body').style.top = "50%";
            }, 600)
        }, 300)
    })

    document.querySelector('.user__close').addEventListener('click', event => {
        document.querySelector('.user__body').style.top = "-150%";
        setTimeout( () => {
            document.querySelector('.user').style.opacity = 0;
            setTimeout( () => {
                document.querySelector('.user').style.display = "none";
            }, 600)
        }, 300)
    })

    // Убираем прелоадер
    setTimeout( () => {
        document.querySelector('.loading').style.top = "-150vh";
    }, 1000)
});