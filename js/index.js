document.addEventListener('DOMContentLoaded', async () => {
  // Сначала загружаем продукты
  await loadAllProducts();

  // Потом инициализируем слайдеры (после заполнения контентом)
  initSliders();

  // Marquee
  $('.flow').marquee({
    duration: 20000,
    startVisible: true,
    duplicated: true
  });

  if ( !localStorage.getItem("SportLabSaleModal") ) {
    setTimeout( () => {
      localStorage.setItem("SportLabSaleModal", true);
      document.querySelector('.modal').style.display = "flex";
      setTimeout( () => {
        document.querySelector('.modal').style.opacity = "1";
      }, 100)
    }, 5000)
  }

  document.querySelector('.modal__close').addEventListener("click", event => {
    document.querySelector('.modal').style.opacity = "0";
    setTimeout( () => {
      document.querySelector('.modal').style.display = "none";
    }, 600)
  })
});

// Загрузка продуктов
async function loadAllProducts() {
  try {
    const [
      bagsResponse,
      overgripsResponse,
      racketsResponse,
      shoesResponse,
      wristbandsResponse
    ] = await Promise.all([
      fetch('products/products_bags.json'),
      fetch('products/products_overgrips.json'),
      fetch('products/products_rackets.json'),
      fetch('products/products_shoes.json'),
      fetch('products/products_wristbands.json')
    ]);

    if (!bagsResponse.ok || !overgripsResponse.ok || !racketsResponse.ok ||
        !shoesResponse.ok || !wristbandsResponse.ok) {
      throw new Error('Один или несколько файлов не загрузились');
    }

    const productsBags = await bagsResponse.json();
    const productsOvergrips = await overgripsResponse.json();
    const productsRackets = await racketsResponse.json();
    const productsShoes = await shoesResponse.json();
    const productsWristbands = await wristbandsResponse.json();

    // Глобальные переменные
    window.productsBags = productsBags;
    window.productsOvergrips = productsOvergrips;
    window.productsRackets = productsRackets;
    window.productsShoes = productsShoes;
    window.productsWristbands = productsWristbands;

    window.allProducts = [
      ...productsBags,
      ...productsOvergrips,
      ...productsRackets,
      ...productsShoes,
      ...productsWristbands
    ];

    console.log('Все продукты загружены!');

    // Заполняем слайдеры
    fillSlider('.popular-slider.rackets', productsRackets, 6);  // 10 ракеток
    fillSlider('.popular-slider.bags', productsBags, 6);         // 4 сумки/рюкзака

  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);
  }
}



// Универсальная функция заполнения слайдера
function fillSlider(sliderSelector, productsArray, count) {
  const wrapper = document.querySelector(`${sliderSelector} .swiper-wrapper`);
  if (!wrapper) {
    console.error(`Не найден wrapper для ${sliderSelector}`);
    return;
  }

  wrapper.innerHTML = '';

  let selected = [...productsArray];

  if (selected.length > count) {
    // Перемешиваем массив
    for (let i = selected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }
    selected = selected.slice(0, count);
  }

  selected.forEach(product => {
    const firstImg = product.images[0] || 'images/placeholder.webp';
    const secondImg = product.images[1] || firstImg;

    const slideHTML = `
      <div class="swiper-slide">
        <a href="/product.html?item=${product.id}" class="catalog__card">
          <div class="catalog__photo">
            <img src="${firstImg}" alt="${product.title}" class="catalog__img catalog__img-first" loading="lazy">
            <img src="${secondImg}" alt="${product.title}" class="catalog__img catalog__img-second" loading="lazy">
            <div class="catalog__add" id="${product.id}">
              <img src="images/add-to-cart.png" alt="add">
            </div>
          </div>
          <div class="catalog__info">
            <p class="catalog__name">${product.title}</p>
            <span class="catalog__oldprice" style="display: ${ product.old_price ? "block" : "none" }">${ product.old_price ? `${product.old_price} ${localStorage.getItem("SportLabValuteMark")}` : "0 €" }</span>
            <span class="catalog__price">${product.price} ${localStorage.getItem("SportLabValuteMark")}</span>
          </div>
        </a>
      </div>
    `;

    wrapper.insertAdjacentHTML('beforeend', slideHTML);
  });
}

// Инициализация слайдеров
function initSliders() {
  // Слайдер ракеток
  window.racketsSlider = new Swiper('.popular-slider.rackets', {
    loop: false,
    speed: 800,
    spaceBetween: 10,
    slidesPerView: 1,
    breakpoints: {
      480: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 }
    },
    pagination: {
      el: '.popular-slider.rackets + .swiper-pagination',
      clickable: true,
    },
  });

  // Слайдер сумок/рюкзаков
  window.bagsSlider = new Swiper('.popular-slider.bags', {
    loop: false,
    speed: 800,
    spaceBetween: 10,
    slidesPerView: 1,
    breakpoints: {
      480: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 }
    },
    pagination: {
      el: '.popular-slider.bags + .swiper-pagination',
      clickable: true,
    },
  });
}