let currentProduct = null; // Глобально храним текущий товар

document.addEventListener('DOMContentLoaded', async () => {
  // Загружаем все продукты (как на главной)
  await loadAllProducts();

  // Получаем ID из URL: product.html?item=abc123
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('item');

  if (!productId) {
    document.querySelector('.nav').style.display = "none";
    document.querySelector('.product').style.display = "none";
    document.querySelector('.also').style.display = "none";
    document.querySelector('.empty').style.display = "flex";
    return;
  }

  // Ищем товар по ID во всех категориях
  currentProduct = window.allProducts.find(p => p.id === productId);

  if (!currentProduct) {
    document.querySelector('.nav').style.display = "none";
    document.querySelector('.product').style.display = "none";
    document.querySelector('.also').style.display = "none";
    document.querySelector('.empty').style.display = "flex";
    return;
  }

  // Заполняем страницу
  fillProductPage(currentProduct);

  // Заполняем блок "Also you might like"
  fillAlsoLikeSection(currentProduct.id);

  // Инициализируем галерею Swiper (после вставки фото)
  initProductGallery(currentProduct.images);

  // Инициализируем слайдер "Also you might like"
  initAlsoLikeSlider();
});

// Загрузка всех продуктов (та же функция, что на index.html)
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
      throw new Error('Failed to load products');
    }

    const productsBags = await bagsResponse.json();
    const productsOvergrips = await overgripsResponse.json();
    const productsRackets = await racketsResponse.json();
    const productsShoes = await shoesResponse.json();
    const productsWristbands = await wristbandsResponse.json();

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

    console.log('Products loaded for product page');
  } catch (error) {
    console.error('Error loading products:', error);
  }
}


// Заполнение основной информации о товаре
function fillProductPage(product) {
  // Breadcrumb
  document.querySelector('.nav a[href="catalog.html"]:nth-of-type(3)').textContent = product.brand;
  document.querySelector('.nav a[href="catalog.html"]:nth-of-type(3)').href = `/catalog.html?brand=${product.brand}`;
  document.querySelector('.nav p').textContent = product.title;

  // Основные данные
  document.querySelector('.product__brand').textContent = product.brand;
  document.querySelector('.product__name').textContent = product.title;
  document.querySelector('.product__category').textContent = capitalize(product.category);

  if ( product.old_price ) {
    document.querySelector('.product__oldprice').textContent = `${product.old_price} ${localStorage.getItem("SportLabValuteMark")}`;
    document.querySelector('.product__oldprice').style.display = "block";
  }

  document.querySelector('.product__price').textContent = `${product.price} ${localStorage.getItem("SportLabValuteMark")}`;

  // Статус (всегда в наличии)
  document.querySelector('.product__status-text').textContent = 'In Stock';

  // Описание в "Product Details"
  const detailsArea = document.querySelector('.product__area-details');
  detailsArea.innerHTML = product.description || '<p>No description available.</p>';

  // Кнопка добавления в корзину — присваиваем id товара
  const addButton = document.querySelector('.product__button');
  addButton.innerHTML = `<img src="images/add-to-cart.png" alt="add"> <p>Add to cart</p>`;
  addButton.parentElement.querySelector('.product__add')?.remove(); // если был старый
  addButton.closest('.product__tab').querySelector('.catalog__add')?.remove();
  // Просто добавляем id на весь блок кнопки (или можно на img)
  addButton.id = product.id;
}

// Капитализация категории (rackets → Rackets)
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Инициализация галереи товара — thumbnails всегда вертикальные!
function initProductGallery(images) {
  const thumbsWrapper = document.querySelector('.gallery-thumbs .swiper-wrapper');
  const mainWrapper = document.querySelector('.gallery-main .swiper-wrapper');

  // Очищаем старое содержимое
  thumbsWrapper.innerHTML = '';
  mainWrapper.innerHTML = '';

  // Заполняем слайды всеми изображениями товара
  images.forEach((imgSrc, index) => {
    const thumbSlide = `<div class="swiper-slide"><img src="${imgSrc}" alt="thumb ${index + 1}"></div>`;
    const mainSlide = `<div class="swiper-slide"><img src="${imgSrc}" alt="product photo ${index + 1}"></div>`;

    thumbsWrapper.insertAdjacentHTML('beforeend', thumbSlide);
    mainWrapper.insertAdjacentHTML('beforeend', mainSlide);
  });

  // Полностью уничтожаем старые экземпляры Swiper, если они были
  if (window.thumbsSwiper) {
    window.thumbsSwiper.destroy(true, true);
    window.thumbsSwiper = null;
  }
  if (window.mainSwiper) {
    window.mainSwiper.destroy(true, true);
    window.mainSwiper = null;
  }

  // === Thumbs Swiper — строго вертикальный, без breakpoints ===
  window.thumbsSwiper = new Swiper('.gallery-thumbs', {
    direction: 'vertical',        // всегда вертикальный
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    // Убрали breakpoints полностью — больше никаких сюрпризов
  });

  // === Основной слайдер ===
  window.mainSwiper = new Swiper('.gallery-main', {
    direction: 'vertical',
    mousewheel: true,
    loop: images.length > 1,      // зацикливаем только если больше 1 фото
    thumbs: {
      swiper: window.thumbsSwiper
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',           // 1/6 формат
    },
  });
}

// Заполнение блока "Also you might like"
function fillAlsoLikeSection(currentProductId) {
  const wrapper = document.querySelector('.also .popular-slider .swiper-wrapper');
  wrapper.innerHTML = '';

  // Все товары кроме текущего
  let otherProducts = window.allProducts.filter(p => p.id !== currentProductId);

  // Перемешиваем и берём 10
  for (let i = otherProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [otherProducts[i], otherProducts[j]] = [otherProducts[j], otherProducts[i]];
  }
  const selected = otherProducts.slice(0, 6);

  selected.forEach(product => {
    const img = product.images[0] || 'images/placeholder.webp';

    const slide = `
      <div class="swiper-slide">
        <a href="product.html?item=${product.id}" class="popular__card">
          <div class="popular__photo">
            <img src="${img}" alt="${product.title}" loading="lazy">
          </div>
          <div class="popular__name">${product.title}</div>
          <span class="catalog__oldprice" style="display: ${ product.old_price ? "block" : "none" }">${ product.old_price ? `${product.old_price} ${localStorage.getItem("SportLabValuteMark")}` : "0 €" }</span>
          <div class="popular__price">${product.price} ${localStorage.getItem("SportLabValuteMark")}</div>
        </a>
      </div>
    `;

    wrapper.insertAdjacentHTML('beforeend', slide);
  });
}

// Инициализация слайдера "Also you might like"
function initAlsoLikeSlider() {
  if (window.alsoSlider) window.alsoSlider.destroy(true, true);

  window.alsoSlider = new Swiper('.also .popular-slider', {
    loop: false,
    speed: 800,
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
      480: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1200: { slidesPerView: 4 }
    },
    pagination: {
      el: '.also .swiper-pagination',
      clickable: true,
    },
  });
}

// Открытие карточек по клику

let activeCards = [false, false, false];
document.querySelectorAll('.product__label').forEach( (item, i) => {
    item.addEventListener('click', event => {
        if ( activeCards[i] == false ) {
          item.classList.add('product__label-active')
          document.querySelectorAll('.product__area')[i].style.maxHeight = '2000px';
          document.querySelectorAll('.product__area')[i].style.padding = '20px 20px';
          document.querySelectorAll('.product__open')[i].style.height = '2px';
            if ( i != 2 ) {
              document.querySelectorAll('.product__area')[i].style.borderTop = '1px solid #7d7d7dac';
            } else {
                document.querySelectorAll('.product__area')[i].style.borderBottom = '1px solid #7d7d7dac';
            }

            activeCards[i] = true;
        } else {
            item.classList.remove('product__label-active')
            document.querySelectorAll('.product__area')[i].style.maxHeight = '0px';
            document.querySelectorAll('.product__area')[i].style.padding = '0px 20px';
            document.querySelectorAll('.product__open')[i].style.height = '14px';
            if ( i != 2 ) {
                document.querySelectorAll('.product__area')[i].style.borderTop = '0px solid #000';
            } else {
                document.querySelectorAll('.product__area')[i].style.borderBottom = '0px solid #000';
            }
            activeCards[i] = false;
        }
    })
})

// === Управление количеством и добавлением в корзину на странице товара ===

let productQuantity = 1; // текущее количество на странице товара

function initProductQuantityControls() {
  const minusBtn = document.querySelector('.product__minus');
  const plusBtn = document.querySelector('.product__plus');
  const counter = document.querySelector('.product__counter');
  const addToCartBtn = document.querySelector('.product__button');

  if (!minusBtn || !plusBtn || !counter || !addToCartBtn || !currentProduct) return;

  // Обновление отображения счётчика
  function updateCounter() {
    counter.textContent = productQuantity;
  }

  // Минус
  minusBtn.addEventListener('click', () => {
    if (productQuantity > 1) {
      productQuantity--;
      updateCounter();
    }
  });

  // Плюс
  plusBtn.addEventListener('click', () => {
    productQuantity++;
    updateCounter();
  });

  // Добавление в корзину с текущим количеством
  addToCartBtn.addEventListener('click', () => {
    if (currentProduct && currentProduct.id) {
      // Используем функцию addToCart из cart.js
      if (typeof addToCart === 'function') {
        addToCart(currentProduct.id, productQuantity);
        
        document.querySelector('.added').style.top = "30px";
        setTimeout( () => {
            document.querySelector('.added').style.top = "-130px";
        }, 3000)
        
        // Опционально: визуальное подтверждение (можно улучшить анимацией)
        addToCartBtn.innerHTML = `<img src="images/add-to-cart.png" alt="add"> <p>Added!</p>`;
        setTimeout(() => {
          addToCartBtn.innerHTML = `<img src="images/add-to-cart.png" alt="add"> <p>Add to cart</p>`;
        }, 1500);
      } else {
        console.error('Функция addToCart не найдена. Убедитесь, что cart.js подключён после product.js');
      }
    }
  });
}

// Запускаем после того, как товар загружен и страница заполнена
// (в твоём коде это происходит после fillProductPage и т.д.)
document.addEventListener('DOMContentLoaded', () => {
  // Ждём, пока currentProduct будет определён
  const waitForProduct = setInterval(() => {
    if (currentProduct) {
      clearInterval(waitForProduct);
      initProductQuantityControls();
    }
  }, 100);
});

if ( document.querySelectorAll('.product__card')[0] ) {;
    document.querySelectorAll('.product__card p')[0].innerHTML = `Free Shipping\n<span>from ${localStorage.getItem("SportLabValuteMark")}100</span>`;
}