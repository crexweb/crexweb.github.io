// js/news-list.js — Заполняет список новостей в боковой панели (map__list-news)

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.map__list-news');

  // Если контейнер не найден — выходим (чтобы не падало на других страницах)
  if (!container) {
    console.warn('Контейнер .map__list-news не найден на странице');
    return;
  }

  // Очищаем (на случай, если там уже что-то есть)
  container.innerHTML = '<div class="map__loading">Загрузка новостей...</div>';

  // Загружаем новости
  fetch('js/news.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Не удалось загрузить news.json (код: ${response.status})`);
      }
      return response.json();
    })
    .then(news => {
      // Очищаем загрузку
      container.innerHTML = '';

      // Если новостей нет
      if (!news || news.length === 0) {
        container.innerHTML = '<div class="map__empty">Новостей пока нет</div>';
        return;
      }

      // Берём только последние 10–15 новостей (можно менять)
    //   const latestNews = news.slice(0, 15);
      const latestNews = news;

      latestNews.forEach(item => {
        const option = document.createElement('div');
        option.className = 'map__option';

        option.innerHTML = `
          <img src="images/right-arrow.png" alt="→">
          <a href="${item.link}" target="_blank">${item.name}</a>
        `;

        container.appendChild(option);
      });
    })
    .catch(err => {
      container.innerHTML = '<div class="map__error">Ошибка загрузки новостей</div>';
      console.error('Ошибка загрузки news.json:', err);
    });
});

// Генерируем список обменов

// первый список
const firstList = [
  { name: 'Bitcoin BTC', unic: 'BTC' },
  { name: 'Notcoin NOT', unic: 'NOT' },
  { name: 'Ripple XRP', unic: 'XRP' },
  { name: 'Ether Classic ETC', unic: 'ETC' },
  { name: 'Polkadot DOT', unic: 'DOT' },
  { name: 'Bitcoin Cash BCH', unic: 'BCH' },
  { name: 'Dash DASH', unic: 'DASH' },
  { name: 'Dogecoin DOGE', unic: 'DOGE' },
  { name: 'Ethereum ETH', unic: 'ETH' },
  { name: 'Toncoin TON', unic: 'TON' },
  { name: 'Solana SOL', unic: 'SOL' },
  { name: 'BNB (BEP20) BNB', unic: 'BNB' },
  { name: 'Litecoin LTC', unic: 'LTC' },
  { name: 'Tron TRX', unic: 'TRX' },
  { name: 'DAI DAI', unic: 'DAI' },
  { name: 'Zcash ZEC', unic: 'ZEC' },
  { name: 'Tether TRC20 USDT', unic: 'USDTTRC20' },
  { name: 'Tether POLYGON USDT', unic: 'USDTPOL' },
  { name: 'Tether ARBITRUM USDT', unic: 'USDTARB' },
  { name: 'Tether TON USDT', unic: 'USDTTON' },
  { name: 'Tether BEP20 USDT', unic: 'USDTBEP20' },
  { name: 'Tether ERC20 USDT', unic: 'USDTERC20' },
  { name: 'USDCoin ERC20 USDC', unic: 'USDCERC20' },
  { name: 'USDCoin POLYGON USDC', unic: 'USDCPOL' },
  { name: 'USDCoin SOL USDC', unic: 'USDCSOL' },
  { name: 'Банковская карта UAH', unic: 'UAH' }
];

// второй список
const secondList = [
  { name: 'Bitcoin BTC', unic: 'BTC' },
  { name: 'Dash DASH', unic: 'DASH' },
  { name: 'Dogecoin DOGE', unic: 'DOGE' },
  { name: 'Ethereum ETH', unic: 'ETH' },
  { name: 'Cardano ADA', unic: 'ADA' },
  { name: 'Ether Classic ETC', unic: 'ETC' },
  { name: 'Bitcoin Cash BCH', unic: 'BCH' },
  { name: 'Ripple XRP', unic: 'XRP' },
  { name: 'Chainlink LINK', unic: 'LINK' },
  { name: 'Polkadot DOT', unic: 'DOT' },
  { name: 'Notcoin NOT', unic: 'NOT' },
  { name: 'Monero XMR', unic: 'XMR' },
  { name: 'Toncoin TON', unic: 'TON' },
  { name: 'Solana SOL', unic: 'SOL' },
  { name: 'BNB (BEP20) BNB', unic: 'BNB' },
  { name: 'Litecoin LTC', unic: 'LTC' },
  { name: 'Tron TRX', unic: 'TRX' },
  { name: 'DAI DAI', unic: 'DAI' },
  { name: 'Tether TRC20 USDT', unic: 'USDTTRC20' },
  { name: 'Tether ERC20 USDT', unic: 'USDTERC20' },
  { name: 'Tether TON USDT', unic: 'USDTTON' },
  { name: 'Tether BEP20 USDT', unic: 'USDTBEP20' },
  { name: 'Tether POLYGON USDT', unic: 'USDTPOL' },
  { name: 'Tether ARBITRUM USDT', unic: 'USDTARB' },
  { name: 'USDCoin POLYGON USDC', unic: 'USDCPOL' },
  { name: 'USDCoin SOL USDC', unic: 'USDCSOL' },
  { name: 'USDCoin ERC20 USDC', unic: 'USDCERC20' },
  { name: 'MoneyGo USD', unic: 'MGO' },
  { name: 'OptiMoney USD', unic: 'OM' },
  { name: 'eVoucher OM USD', unic: 'EMO' },
  { name: 'Volet USD', unic: 'VOLET' },
  { name: 'Банковская карта KZT', unic: 'KZT' }
];


function generatePairs(fromList, toList) {
  const pairs = [];

  fromList.forEach(from => {
    toList.forEach(to => {
      if (from.unic !== to.unic) {
        pairs.push({
          from,
          to
        });
      }
    });
  });

  return pairs;
}

const pairs = generatePairs(firstList, secondList);
console.log('Всего пар:', pairs.length);


const container = document.querySelector('.map__list-coins');

pairs.forEach(pair => {
  const div = document.createElement('div');
  div.className = 'map__option';

  div.innerHTML = `
    <img src="images/right-arrow.png" alt="right">
    <a href="/exchange.html?${pair.from.unic}_to_${pair.to.unic}">
      ${pair.from.name} → ${pair.to.name}
    </a>
  `;

  container.appendChild(div);
});
