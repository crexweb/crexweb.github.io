// === КОРЗИНА ===
// Ключ в localStorage
const CART_KEY = 'padelCart';

// Получить корзину из localStorage
function getCart() {
  const cartJson = localStorage.getItem(CART_KEY);
  return cartJson ? JSON.parse(cartJson) : {};
}

// Сохранить корзину в localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Добавить товар в корзину (quantity = 1 по умолчанию)
function addToCart(productId, quantity = 1) {
  const cart = getCart();
  if (cart[productId]) {
    cart[productId] += quantity;
  } else {
    cart[productId] = quantity;
  }
  saveCart(cart);
  renderCart(); // обновляем отображение
}

// Изменить количество товара
function updateCartQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  cart[productId] = newQuantity;
  saveCart(cart);
  renderCart();
}

// Удалить товар из корзины
function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
  renderCart();
}


// Отрисовка корзины
function renderCart() {
  const cart = getCart();
  const bagBlock = document.querySelector('.bag__block');
  const bagEmpty = document.querySelector('.bag__empty');
  const bagTitle = document.querySelector('.bag__title');
  const bagButton = document.querySelector('.bag__button');

  const cartItems = Object.keys(cart);

  const itemCount = Object.keys(cart).length;
  console.log(itemCount);
  document.querySelector('.header__counter').textContent = itemCount;

  if (cartItems.length === 0) {
    // Пустая корзина
    bagEmpty.style.display = 'flex';
    bagBlock.style.display = 'none';
    bagTitle.style.display = 'none';
    bagButton.style.display = 'none';
    document.querySelector('.header__counter').style.display = "none";
    return;
  }
  
  // Есть товары
  bagEmpty.style.display = 'none';
  bagBlock.style.display = 'flex';
  bagTitle.style.display = 'block';
  bagButton.style.display = 'flex';
  document.querySelector('.header__counter').style.display = "flex";

  // Очищаем и заполняем карточки
  bagBlock.innerHTML = '';

  cartItems.forEach(productId => {
    const quantity = cart[productId];
    const product = window.allProducts.find(p => p.id === productId);

    if (!product) return; // на случай если товар удалён из базы

    const firstImg = product.images[0] || 'images/placeholder.webp';

    const cardHTML = `
      <div class="bag__card" data-id="${productId}">
        <a href="product.html?item=${productId}" class="bag__left">
          <img src="${firstImg}" alt="${product.title}" loading="lazy">
        </a>
        <div class="bag__right">
          <a href="product.html?item=${productId}" class="bag__name">${product.title}</a>
          <div class="bag__price">${Number(product.price * quantity).toFixed(2)} ${localStorage.getItem("SportLabValuteMark")}</div>
          <div class="bag__numbers">
            <div class="bag__minus">-</div>
            <div class="bag__counter">${quantity}</div>
            <div class="bag__plus">+</div>
          </div>
          <div class="bag__delete">
            <img src="images/delete.png" alt="delete">
          </div>
        </div>
      </div>
    `;

    bagBlock.insertAdjacentHTML('beforeend', cardHTML);
  });

  // Перевешиваем обработчики на новые элементы
  attachCartEventListeners();
}

// Вешаем обработчики на кнопки в корзине
function attachCartEventListeners() {
  // Плюс
  document.querySelectorAll('.bag__plus').forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest('.bag__card');
      const id = card.dataset.id;
      const counter = card.querySelector('.bag__counter');
      const newQty = parseInt(counter.textContent) + 1;
      updateCartQuantity(id, newQty);
    };
  });

  // Минус
  document.querySelectorAll('.bag__minus').forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest('.bag__card');
      const id = card.dataset.id;
      const counter = card.querySelector('.bag__counter');
      const newQty = parseInt(counter.textContent) - 1;
      updateCartQuantity(id, newQty);
    };
  });

  // Удаление
  document.querySelectorAll('.bag__delete').forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest('.bag__card');
      const id = card.dataset.id;
      removeFromCart(id);
    };
  });
}

// Добавление обработчика на все кнопки "Add to cart" (.catalog__add)
function initAddToCartButtons() {
  // Делегирование: вешаем на document, чтобы работало с динамически добавленными карточками
  document.addEventListener('click', e => {
    if (e.target.closest('.catalog__add')) {
        e.preventDefault();
      const addBtn = e.target.closest('.catalog__add');
      const productId = addBtn.id;
      if (productId) {
        addToCart(productId, 1);
        // Можно добавить анимацию или уведомление
        console.log(`Товар ${productId} добавлен в корзину`);
        document.querySelector('.added').style.top = "30px";
        setTimeout( () => {
            document.querySelector('.added').style.top = "-130px";
        }, 3000)
      }
    }
  });
}

// Инициализация корзины при загрузке страницы
function initCart() {
  renderCart();
  initAddToCartButtons();

  
}

// === Запуск после загрузки продуктов ===
document.addEventListener('DOMContentLoaded', () => {
  // Ждём, пока window.allProducts будет готов (после loadAllProducts)
  if (window.allProducts) {
    initCart();

    
  } else {
    // Если продукты ещё не загружены — ждём
    const checkInterval = setInterval(() => {
      if (window.allProducts) {
        clearInterval(checkInterval);
        initCart();
      }
    }, 100);
  }

  setTimeout( () => {
    document.querySelector('.loading').style.top = "-150vh";
  }, 1000)
});