// js/products.js — загрузка продуктов на всех страницах
async function loadGlobalProducts() {
  if (window.allProducts) return; // уже загружены

  try {
    const responses = await Promise.all([
      fetch('products/products_bags.json'),
      fetch('products/products_overgrips.json'),
      fetch('products/products_rackets.json'),
      fetch('products/products_shoes.json'),
      fetch('products/products_wristbands.json')
    ]);

    if (!responses.every(r => r.ok)) throw new Error('Не все JSON загружены');

    const data = await Promise.all(responses.map(r => r.json()));
    window.allProducts = data.flat();

    console.log('Глобальные продукты загружены:', window.allProducts.length);

    // После загрузки — обновляем корзину
    if (typeof renderCart === 'function') {
      renderCart();
    }
  } catch (err) {
    console.error('Ошибка загрузки продуктов:', err);
  }
}

// Автозагрузка на всех страницах
document.addEventListener('DOMContentLoaded', () => {
  loadGlobalProducts();
});