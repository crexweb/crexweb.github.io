let allProducts = [];
let saleProducts = []; // Только товары со скидкой
let filteredProducts = [];
let displayedCount = 0;
const ITEMS_PER_LOAD = 6;

let currentFilters = {
  category: null,
  brand: null,
  priceFrom: null,
  priceTo: null
};

document.addEventListener('DOMContentLoaded', async () => {
  await loadAllProducts();

  // Применяем фильтры из URL (если есть)
  applyUrlFilters();

  // Заполняем фильтры на основе товаров со скидкой
  populateFilters();

  // Показываем товары со скидкой
  applyFilters();

  setupEventListeners();
});

async function loadAllProducts() {
  try {
    const responses = await Promise.all([
      fetch('products/products_bags.json'),
      fetch('products/products_overgrips.json'),
      fetch('products/products_rackets.json'),
      fetch('products/products_shoes.json'),
      fetch('products/products_wristbands.json')
    ]);

    const data = await Promise.all(responses.map(r => r.ok ? r.json() : []));
    allProducts = data.flat();

    // Фильтруем только товары со скидкой (есть old_price)
    saleProducts = allProducts.filter(p => p.old_price !== undefined && p.old_price !== null);

    console.log('Товары со скидкой загружены:', saleProducts.length);
  } catch (err) {
    console.error('Ошибка загрузки товаров:', err);
    document.querySelector('.catalog__right').innerHTML = '<p>Ошибка загрузки товаров</p>';
  }
}

function populateFilters() {
  const typeList = document.querySelector('.catalog__list-type');

  const categories = [...new Set(saleProducts.map(p => p.category))].sort();
  typeList.innerHTML = '';
  categories.forEach(cat => {
    const item = document.createElement('div');
    item.className = 'catalog__item';
    item.textContent = capitalize(cat);
    item.dataset.value = cat;
    typeList.appendChild(item);
  });
}

function updateBrandList() {
  const brandList = document.querySelector('.catalog__list-brand');
  brandList.innerHTML = '';

  let availableProducts = saleProducts;
  if (currentFilters.category) {
    availableProducts = saleProducts.filter(p => p.category === currentFilters.category);
  }

  const brands = [...new Set(availableProducts.map(p => p.brand))].sort();
  brands.forEach(brand => {
    const item = document.createElement('div');
    item.className = 'catalog__item';
    item.textContent = brand;
    item.dataset.value = brand.toLowerCase();
    if (currentFilters.brand && currentFilters.brand.toLowerCase() === brand.toLowerCase()) {
      item.classList.add('catalog__item-active');
    }
    brandList.appendChild(item);
  });
}

function applyUrlFilters() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('category')) {
    currentFilters.category = params.get('category').toLowerCase();
  }
  if (params.has('brand')) {
    currentFilters.brand = params.get('brand');
  }
}

function applyFilters() {
  let result = [...saleProducts]; // Только товары со скидкой

  updateBrandList();

  if (currentFilters.category) {
    result = result.filter(p => p.category === currentFilters.category);
  }
  if (currentFilters.brand) {
    result = result.filter(p => p.brand === currentFilters.brand);
  }
  if (currentFilters.priceFrom !== null && currentFilters.priceFrom !== '') {
    const from = parseFloat(currentFilters.priceFrom);
    if (!isNaN(from)) result = result.filter(p => p.price >= from);
  }
  if (currentFilters.priceTo !== null && currentFilters.priceTo !== '') {
    const to = parseFloat(currentFilters.priceTo);
    if (!isNaN(to)) result = result.filter(p => p.price <= to);
  }

  filteredProducts = result;
  displayedCount = 0;
  document.querySelector('.catalog__right').innerHTML = '';

  highlightActiveFilters();
  updateClearButtonVisibility();

  const oldBtn = document.querySelector('#show-more-btn');
  if (oldBtn) oldBtn.remove();

  loadMoreProducts();
}

function highlightActiveFilters() {
  document.querySelectorAll('.catalog__list-type .catalog__item-active').forEach(el => el.classList.remove('catalog__item-active'));

  if (currentFilters.category) {
    const activeCatItem = document.querySelector(`.catalog__list-type .catalog__item[data-value="${currentFilters.category}"]`);
    if (activeCatItem) activeCatItem.classList.add('catalog__item-active');
  }
}

function updateShowMoreButton() {
  const container = document.querySelector('.catalog__right');
  let showMoreBtn = document.querySelector('#show-more-btn');

  if (displayedCount < filteredProducts.length) {
    if (!showMoreBtn) {
      showMoreBtn = document.createElement('button');
      showMoreBtn.id = 'show-more-btn';
      showMoreBtn.className = 'catalog__show-more';
      showMoreBtn.textContent = 'Show more';
      container.append(showMoreBtn);

      showMoreBtn.addEventListener('click', () => {
        loadMoreProducts();
      });
    }
    showMoreBtn.style.display = 'block';
  } else {
    if (showMoreBtn) showMoreBtn.style.display = 'none';
  }
}

function loadMoreProducts() {
  const container = document.querySelector('.catalog__right');
  const nextProducts = filteredProducts.slice(displayedCount, displayedCount + ITEMS_PER_LOAD);

  if (nextProducts.length === 0) {
    updateShowMoreButton();
    return;
  }

  nextProducts.forEach(product => {
    const firstImg = product.images[0] || 'images/placeholder.webp';
    const secondImg = product.images[1] || firstImg;

    const cardHTML = `
      <a href="product.html?item=${product.id}" class="catalog__card">
        <div class="catalog__photo">
          <img src="${firstImg}" alt="${product.title}" class="catalog__img catalog__img-first" loading="lazy">
          <img src="${secondImg}" alt="${product.title}" class="catalog__img catalog__img-second" loading="lazy">
          <div class="catalog__add" id="${product.id}">
            <img src="images/add-to-cart.png" alt="add">
          </div>
        </div>
        <div class="catalog__info">
          <p class="catalog__name">${product.title}</p>
          <span class="catalog__oldprice" style="display: block;">${product.old_price} ${localStorage.getItem("SportLabValuteMark")}</span>
          <span class="catalog__price">${product.price} ${localStorage.getItem("SportLabValuteMark")}</span>
        </div>
      </a>
    `;

    container.insertAdjacentHTML('beforeend', cardHTML);
  });

  displayedCount += nextProducts.length;
  updateShowMoreButton();
}

function setupEventListeners() {
  document.querySelector('.catalog__list-type').addEventListener('click', e => {
    if (e.target.classList.contains('catalog__item')) {
      document.querySelectorAll('.catalog__list-type .catalog__item').forEach(el => el.classList.remove('catalog__item-active'));
      e.target.classList.add('catalog__item-active');
      currentFilters.category = e.target.dataset.value || null;
      currentFilters.brand = null;
      applyFilters();
    }
  });

  document.querySelector('.catalog__list-brand').addEventListener('click', e => {
    if (e.target.classList.contains('catalog__item')) {
      const clicked = e.target;
      if (clicked.classList.contains('catalog__item-active')) {
        clicked.classList.remove('catalog__item-active');
        currentFilters.brand = null;
      } else {
        document.querySelectorAll('.catalog__list-brand .catalog__item').forEach(el => el.classList.remove('catalog__item-active'));
        clicked.classList.add('catalog__item-active');
        currentFilters.brand = clicked.textContent.trim();
      }
      applyFilters();
    }
  });

  document.querySelectorAll('.catalog__input').forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('catalog__input-first')) {
        currentFilters.priceFrom = input.value.trim();
      } else {
        currentFilters.priceTo = input.value.trim();
      }
      applyFilters();
    });
  });

  document.querySelector('.catalog__clear').addEventListener('click', () => {
    currentFilters = { category: null, brand: null, priceFrom: null, priceTo: null };
    document.querySelectorAll('.catalog__item-active').forEach(el => el.classList.remove('catalog__item-active'));
    document.querySelectorAll('.catalog__input').forEach(input => input.value = '');
    document.querySelector('.catalog__clear').style.display = 'none';
    applyFilters();
  });
}

function updateClearButtonVisibility() {
  const hasFilter = Object.values(currentFilters).some(v => v !== null && v !== '');
  document.querySelector('.catalog__clear').style.display = hasFilter ? 'flex' : 'none';
}
 
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}