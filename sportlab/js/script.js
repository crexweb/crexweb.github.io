// Открытие корзины
document.querySelector('.header__cart').addEventListener('click', event => {
    document.querySelector('.bag').style.display = "block";
    setTimeout( () => {
        document.querySelector('.bag').style.opacity = "1";
        setTimeout( () => {
            document.querySelector('.bag__body').style.right = "0px";
        }, 600)
    }, 100)
})

document.querySelector('.bag__close').addEventListener('click', event => {
    document.querySelector('.bag__body').style.right = "-150vw";
    setTimeout( () => {
        document.querySelector('.bag').style.opacity = "0";
        setTimeout( () => {
            document.querySelector('.bag').style.display = "none";
        }, 600)
    }, 600)
})

// Открытие мобильного меню
document.querySelector('.header__menu').addEventListener('click', event => {
    document.querySelector('.menu').style.display = "block";
    setTimeout( () => {
        document.querySelector('.menu').style.opacity = "1";
        setTimeout( () => {
            document.querySelector('.menu__body').style.right = "0px";
        }, 600)
    }, 100)
})

document.querySelector('.menu__close').addEventListener('click', event => {
    document.querySelector('.menu__body').style.right = "-150vw";
    setTimeout( () => {
        document.querySelector('.menu').style.opacity = "0";
        setTimeout( () => {
            document.querySelector('.menu').style.display = "none";
        }, 600)
    }, 600)
})

// Поиск
document.querySelector('.header__search').addEventListener('click', event => {
    document.querySelector('.search').style.display = "block";
    setTimeout( () => {
        document.querySelector('.search').style.opacity = "1";
        setTimeout( () => {
            document.querySelector('.search__body').style.right = "0px";
        }, 600)
    }, 100)
})

document.querySelector('.search__close').addEventListener('click', event => {
    document.querySelector('.search__body').style.right = "-150vw";
    setTimeout( () => {
        document.querySelector('.search').style.opacity = "0";
        setTimeout( () => {
            document.querySelector('.search').style.display = "none";
        }, 600)
    }, 600)
})

// Прячем и открываем шапку по скроллу
let lastScrollTop = 0;
window.addEventListener("scroll", function() {
    let header = document.querySelector(".header");
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        header.style.top = "-150px";
		// document.querySelector('.header__list').style.maxHeight = "0px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);
 
document.querySelectorAll('.header__link')[4].style.display = "none";
document.querySelectorAll('.footer__link')[4].style.display = "none";

// Опрадаление страны и валюты

// Проверяем, есть ли уже сохранённая валюта (чтобы не делать запрос каждый раз при обновлении страницы)
const savedCurrency = localStorage.getItem("SportLabValute");
if (savedCurrency) {
  const mark = savedCurrency === "EUR" ? "€" : "$";
  localStorage.setItem("SportLabValuteMark", mark);
  console.log("Валюта из localStorage:", savedCurrency);
} else {
  fetch('https://ipapi.co/json/')
    .then(res => {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })
    .then(data => {
      const country = data.country_code; // Например "NL", "US", "DE" (верхний регистр)
      console.log("Страна по IP:", country, data);
      setCurrency(country);
    })
    .catch(err => {
      console.error("Ошибка определения страны:", err);
      // На случай ошибки — fallback на USD
      setCurrency("US");
    });
}

function setCurrency(code) {
  const eu = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR',
              'DE','GR','HU','IE','IT','LV','LT','LU','MT',
              'NL','PL','PT','RO','SK','SI','ES','SE'];
  
  const currency = eu.includes(code?.toUpperCase()) ? 'EUR' : 'USD';
  
  localStorage.setItem("SportLabValute", currency);
  localStorage.setItem("SportLabValuteMark", currency === "EUR" ? "€" : "$");
  
  console.log("Установлена валюта:", currency);
}