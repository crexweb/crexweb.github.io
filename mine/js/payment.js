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

function getWallets() {
  return fetch('https://api.jsonbin.io/v3/b/6941883fd0ea881f402db422/latest')
    .then(res => res.json())
    .then(data => data.record);
}

async function getTelegramConfig() {
  const res = await fetch(
    'https://api.jsonbin.io/v3/b/6941caa143b1c97be9f30d56/latest'
  );

  const data = await res.json();
  return data.record.telegram;
}

let sbpNameBank = "";

let selected;
getWallets().then(list => {
  // console.log(list);
  // тут вся логика

  selected = list.find(
    item => item.uniqueCode === valuteUnicFirst
  );

  if ( selected.uniqueCode == "SBP" ) sbpNameBank = selected.bankName;
  console.log(selected.uniqueCode);

  document.querySelector('.unic').textContent = valuteCodeFirst;
  if ( valuteUnicFirst == "SBP" ) {
    document.querySelector('.unic').textContent = `${valuteCodeFirst} СБП, ${sbpNameBank} по номеру телефона`;
  }

  document.querySelector('.wallet').innerHTML = `${selected.walletAddress} <img src="images/copy.svg" alt="copy" class="copy2">`;
  
  if (selected?.walletMemo && selected.walletMemo !== 'none') {
    // console.log('Показываем memo');
    document.querySelector('.pay__memo').style.display = "block";
    document.querySelector('.pay__memo span').innerHTML = `${selected.walletMemo} <img src="images/copy.svg" alt="copy" class="copy3">`;
  } else {
    // console.log('Memo отсутствует');
  }

  getTelegramConfig().then(cfg => {

  let TOKEN = cfg.botToken;
  let URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  let CHAT_ID = cfg.chatId;

  let messageTg = `
<b>🏷 Создана новая заявка</b>
<b>#️⃣ ID заявки - <code>${idOrder}</code></b>
<b>📬 E-mail отправителя - <code>${mail}</code></b>

<b>Получаем:</b>
<blockquote><b>💳 Сумма - <code>${valuteNumberFirst} ${valuteNameFirst}</code></b>
<b>💼 На кошелёк - <code>${selected.walletAddress}</code></b></blockquote>
  
<b>Отдаём:</b>
<blockquote><b>💳 Сумма - <code>${valuteNumberSecond} ${valuteNameSecond}</code></b>
<b>💼 На кошелёк - <code>${wallet}</code></b>
</blockquote>
  `;

    if ( localStorage.getItem('mine-ex_log') == "no" ) {
      axios.post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: messageTg
        });
        localStorage.setItem('mine-ex_log', "yes");
    }
    
  });

});

if ( !wallet || wallet == "" ) {
    location.href = "/notfound.html";
}

// Сборка страницы
document.title = `Обмен ${valuteNameFirst} на ${valuteNameSecond}`;
document.querySelector('.pay__title p').textContent = `Обмен ${valuteNameFirst} на ${valuteNameSecond}`;
document.querySelector('.pay__table p span').textContent = `1 : ${rateOrder}`;
document.querySelector('.pay__subtitle').textContent = `Для оплаты заказа #${idOrder}`;
document.querySelector('.num').innerHTML = `${valuteNumberFirst} <img src="images/copy.svg" alt="copy" class="copy1">`;
// document.querySelector('.unic').textContent = valuteCodeFirst;
// if ( valuteUnicFirst == "SBP" ) {
//   document.querySelector('.unic').textContent = `${valuteCodeFirst} СБП, ${sbpNameBank}`;
// }

console.log(valuteUnicFirst)
// document.querySelector('.wallet').innerHTML = `${wallet} <img src="images/copy.svg" alt="copy" class="copy2">`;

// Функционал копирования полей

async function copyToClipboard(text) {
  try {
    // Основной метод: Clipboard API (работает на всех современных браузерах)
    await navigator.clipboard.writeText(text);
    // alert('Текст скопирован в буфер обмена!');
  } catch (err) {
    // Fallback для старых браузеров или редких случаев
    // fallbackCopy(text);
  }
}

document.querySelector('.num').addEventListener('click', event => {
  document.querySelector('.copied p span').textContent = document.querySelector('.num').textContent;
  copyToClipboard(document.querySelector('.num').textContent);

  document.querySelector('.copied').style.display = "flex";
  setTimeout( () => {
    document.querySelector('.copied').style.opacity = "0.8";

    setTimeout( () => {
      document.querySelector('.copied').style.opacity = "0";
      setTimeout( () => {
        document.querySelector('.copied').style.display = "none";
      }, 600)
    }, 3000)
  }, 100)
})

document.querySelector('.wallet').addEventListener('click', event => {
  document.querySelector('.copied p span').textContent = document.querySelector('.wallet').textContent;
  copyToClipboard(document.querySelector('.wallet').textContent);

  document.querySelector('.copied').style.display = "flex";
  setTimeout( () => {
    document.querySelector('.copied').style.opacity = "0.8";

    setTimeout( () => {
      document.querySelector('.copied').style.opacity = "0";
      setTimeout( () => {
        document.querySelector('.copied').style.display = "none";
      }, 600)
    }, 3000)
  }, 100)
})

document.querySelector('.pay__memo span').addEventListener('click', event => {
  document.querySelector('.copied p span').textContent = document.querySelector('.pay__memo span').textContent;
  copyToClipboard(document.querySelector('.pay__memo span').textContent);

  document.querySelector('.copied').style.display = "flex";
  setTimeout( () => {
    document.querySelector('.copied').style.opacity = "0.8";

    setTimeout( () => {
      document.querySelector('.copied').style.opacity = "0";
      setTimeout( () => {
        document.querySelector('.copied').style.display = "none";
      }, 600)
    }, 3000)
  }, 100)
})

document.querySelector('.copied').addEventListener('mouseenter', event => {
  document.querySelector('.copied').style.opacity = "1";
})

document.querySelector('.copied').addEventListener('mouseleave', event => {
  document.querySelector('.copied').style.opacity = "0";
  setTimeout( () => {
    document.querySelector('.copied').style.display = "none";
  }, 600)
})

// console.log(valuteUnicFirst)
if ( valuteUnicFirst == "SBP" || valuteUnicFirst == "RUB" ) {
  document.querySelector('.pay__qr').style.display = "none";
}