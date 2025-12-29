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

if ( !localStorage.getItem("SportLabValuteMark") ) {
    localStorage.setItem("SportLabValute", "USD");
    localStorage.setItem("SportLabValuteMark", "$");
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