// === Загрузка всех продуктов на странице order.html ===
async function loadAllProductsForOrder() {
  try {
    const responses = await Promise.all([
      fetch('products/products_bags.json'),
      fetch('products/products_overgrips.json'),
      fetch('products/products_rackets.json'),
      fetch('products/products_shoes.json'),
      fetch('products/products_wristbands.json')
    ]);

    if (!responses.every(r => r.ok)) {
      throw new Error('Не все файлы продуктов загрузились');
    }

    const data = await Promise.all(responses.map(r => r.json()));
    window.allProducts = data.flat();

    console.log('Продукты загружены на order.html:', window.allProducts.length);

    // После загрузки продуктов — рендерим корзины
    renderCart();        // боковая корзина
    renderOrderPage();   // страница заказа
    attachOrderEventListeners();

    sendMessageInTG();

  } catch (err) {
    console.error('Ошибка загрузки продуктов на order.html:', err);
    document.querySelector('.order__body').innerHTML = '<p>Ошибка загрузки товаров</p>';
  }
}


// === Страница оформления заказа (order.html) ===

document.addEventListener('DOMContentLoaded', () => {
  // Сначала загружаем продукты, потом всё остальное
  loadAllProductsForOrder();
});


// Отрисовка товаров на странице заказа
function renderOrderPage() {
  const cart = getCart();
  const orderLeft = document.querySelector('.order__left');
  const orderBody = document.querySelector('.order__body');
  const orderEmpty = document.querySelector('.order__empty');
  const orderSumm = document.querySelector('.order__summ');

  const cartItems = Object.keys(cart);

  if (cartItems.length === 0) {
    orderBody.style.display = 'none';
    orderEmpty.style.display = 'flex';
    return;
  }

  orderBody.style.display = 'flex';
  orderEmpty.style.display = 'none';

  orderLeft.innerHTML = '';

  let totalAmount = 0;

  cartItems.forEach(productId => {
    const quantity = cart[productId];
    const product = window.allProducts.find(p => p.id === productId);

    if (!product) return;

    totalAmount += product.price * quantity;

    const firstImg = product.images[0] || 'images/placeholder.webp';

    const cardHTML = `
      <div class="order__card" data-id="${productId}">
        <a href="product.html?item=${productId}" class="order__image">
          <img src="${firstImg}" alt="${product.title}" loading="lazy">
        </a>

        <div class="order__info">
          <a href="product.html?item=${productId}" class="order__brand">${product.brand}</a>
          <a href="product.html?item=${productId}" class="order__model">${product.title}</a>
          <div class="order__price">${product.price} ${localStorage.getItem("SportLabValuteMark")}</div>
          <div class="order__nav">
            <div class="order__minus"><img src="images/minus-sign.png" alt="minus" loading="lazy"></div>
            <div class="order__number">${quantity}</div>
            <div class="order__plus"><img src="images/plus.png" alt="plus" loading="lazy"></div>
          </div>
        </div>

        <div class="order__delete">
          <img src="images/delete.png" alt="close">
        </div>
      </div>
    `;

    orderLeft.insertAdjacentHTML('beforeend', cardHTML);
  });

  // Обновляем сумму
  orderSumm.textContent = `Order Total: ${totalAmount.toFixed(2)} ${localStorage.getItem("SportLabValuteMark")}`;
}

// Вешаем обработчики на кнопки на странице заказа
function attachOrderEventListeners() {
  // Плюс
  document.querySelectorAll('.order__plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.order__card');
      const id = card.dataset.id;
      const counter = card.querySelector('.order__number');
      const newQty = parseInt(counter.textContent) + 1;
      updateCartQuantity(id, newQty);
    });
  });

  // Минус
  document.querySelectorAll('.order__minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.order__card');
      const id = card.dataset.id;
      const counter = card.querySelector('.order__number');
      const newQty = parseInt(counter.textContent) - 1;
      updateCartQuantity(id, newQty);
    });
  });

  // Удаление
  document.querySelectorAll('.order__delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.order__card');
      const id = card.dataset.id;
      removeFromCart(id);
    });
  });
}

// === Переопределяем функции корзины, чтобы они обновляли обе страницы ===
// Эти функции уже есть в cart.js, но мы их расширяем для синхронизации

// Расширяем updateCartQuantity
const originalUpdateCartQuantity = updateCartQuantity;
updateCartQuantity = function(productId, newQuantity) {
  originalUpdateCartQuantity(productId, newQuantity);
  if (window.location.pathname.includes('order.html')) {
    renderOrderPage();
    attachOrderEventListeners(); // перевешиваем на новые элементы
  }
};

// Расширяем removeFromCart
const originalRemoveFromCart = removeFromCart;
removeFromCart = function(productId) {
  originalRemoveFromCart(productId);
  if (window.location.pathname.includes('order.html')) {
    renderOrderPage();
    attachOrderEventListeners();
  }
};

// Расширяем addToCart (на всякий случай)
const originalAddToCart = addToCart;
addToCart = function(productId, quantity = 1) {
  originalAddToCart(productId, quantity);
  if (window.location.pathname.includes('order.html')) {
    renderOrderPage();
    attachOrderEventListeners();
  }
};

// === Автоматическое обновление при изменениях в боковой корзине .bag ===
// Слушаем изменения в localStorage (когда меняется на других вкладках или в .bag)
window.addEventListener('storage', (e) => {
  if (e.key === 'padelCart' && window.location.pathname.includes('order.html')) {
    renderOrderPage();
    attachOrderEventListeners();
  }
});

// Также обновляем при фокусе окна (если пользователь вернулся на вкладку)
window.addEventListener('focus', () => {
  if (window.location.pathname.includes('order.html')) {
    renderOrderPage();
    attachOrderEventListeners();
  }
});

function sendMessageInTG() {
	// Отправка заявки со всплывающего окна
	var phone = document.querySelector('.order__input-phone');
	

	phone.addEventListener('input', () => {
		// оставляем только цифры
		let digits = phone.value.replace(/\D/g, '');

		// всегда добавляем +
		phone.value = '+' + digits;
	});

	// не даём стереть +
	phone.addEventListener('keydown', e => {
		if (phone.selectionStart === 1 && e.key === 'Backspace') {
			e.preventDefault();
		}
	});

	let infoFromBase;
	let TOKEN;
	let URI_API = "";
	let CHAT_ID = "";
	const request = new XMLHttpRequest();
	request.open("GET", "js/base.json");
	request.setRequestHeader("Content-type", "application/json; charset=utf-8");
	request.send();
	request.addEventListener("readystatechange", (event) => {
		if (request.readyState === 4 && request.status === 200) {
			infoFromBase = JSON.parse(request.response);
			TOKEN = infoFromBase.token;
			CHAT_ID = infoFromBase.chatId;
			URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
		}
	});

	document.querySelector('.order__button').addEventListener('click', event => {

		const input = document.querySelector('.order__input-name');
		const value = input.value.trim();
		const words = value.split(/\s+/); // разделяет по пробелам
		const isValid = words.length > 1 && words.every(word => word.length >= 2);
		
		if ( !isValid ) {
			document.querySelector('.order__message').textContent = 'Enter your full name';
			document.querySelector('.order__message').style.maxHeight = '60px';
			document.querySelector('.order__message').style.marginBottom = '20px';
			document.querySelector('.order__message').style.color = '#ff4a4a';
			document.querySelectorAll('.order__label p')[0].style.color = '#ff4a4a';
			// document.querySelectorAll('.order__input')[0].style.border = "1px solid rgb(255, 94, 94)";
			document.querySelectorAll('.order__input')[0].style.background = "#ffc1c1";
			setTimeout( () => {
				document.querySelector('.order__message').style.maxHeight = '0px';
				document.querySelector('.order__message').style.marginBottom = '0px';
				document.querySelectorAll('.order__label p')[0].style.color = '#000';
				// document.querySelectorAll('.order__input')[0].style.border = "1px solid #dcdcdc";
				document.querySelectorAll('.order__input')[0].style.background = "#fff";
			}, 2000)
		} else if ( document.querySelector('.order__input-phone').value.length < 8 ) {
			document.querySelector('.order__message').textContent = 'Enter your phone number';
			document.querySelector('.order__message').style.maxHeight = '60px';
			document.querySelector('.order__message').style.marginBottom = '20px';
			document.querySelector('.order__message').style.color = '#ff4a4a';
			document.querySelectorAll('.order__label p')[1].style.color = '#ff4a4a';
			// document.querySelectorAll('.order__input')[1].style.border = "1px solid rgb(255, 94, 94)";
			document.querySelectorAll('.order__input')[1].style.background = "#ffc1c1";
			setTimeout( () => {
				document.querySelector('.order__message').style.maxHeight = '0px';
				document.querySelector('.order__message').style.marginBottom = '0px';
				document.querySelectorAll('.order__label p')[1].style.color = '#000';
				// document.querySelectorAll('.order__input')[1].style.border = "1px solid #dcdcdc";
				document.querySelectorAll('.order__input')[1].style.background = "#fff";
			}, 2000)
		} else if ( document.querySelector('.order__input-email').value.length < 10 || !document.querySelector('.order__input-email').value.includes("@") || !document.querySelector('.order__input-email').value.includes(".") ) {
			document.querySelector('.order__message').textContent = 'Enter your e-mail';
			document.querySelector('.order__message').style.maxHeight = '60px';
			document.querySelector('.order__message').style.marginBottom = '20px';
			document.querySelector('.order__message').style.color = '#ff4a4a';
			document.querySelectorAll('.order__label p')[2].style.color = '#ff4a4a';
			// document.querySelectorAll('.order__input')[2].style.border = "1px solid rgb(255, 94, 94)";
			document.querySelectorAll('.order__input')[2].style.background = "#ffc1c1";
			setTimeout( () => {
				document.querySelector('.order__message').style.maxHeight = '0px';
				document.querySelector('.order__message').style.marginBottom = '0px';
				document.querySelectorAll('.order__label p')[2].style.color = '#000';
				// document.querySelectorAll('.order__input')[2].style.border = "1px solid #dcdcdc";
				document.querySelectorAll('.order__input')[2].style.background = "#fff";
			}, 2000)
		} else if ( document.querySelector('.order__input-address').value.length < 10 ) {
			document.querySelector('.order__message').textContent = 'Enter your full delivery address';
			document.querySelector('.order__message').style.maxHeight = '60px';
			document.querySelector('.order__message').style.marginBottom = '20px';
			document.querySelector('.order__message').style.color = '#ff4a4a';
			document.querySelectorAll('.order__label p')[3].style.color = '#ff4a4a';
			// document.querySelectorAll('.order__input')[2].style.border = "1px solid rgb(255, 94, 94)";
			document.querySelectorAll('.order__input')[3].style.background = "#ffc1c1";
			setTimeout( () => {
				document.querySelector('.order__message').style.maxHeight = '0px';
				document.querySelector('.order__message').style.marginBottom = '0px';
				document.querySelectorAll('.order__label p')[3].style.color = '#000';
				// document.querySelectorAll('.order__input')[2].style.border = "1px solid #dcdcdc";
				document.querySelectorAll('.order__input')[3].style.background = "#fff";
			}, 2000)
		} else {

      function extractPriceFromString(str) {
        if (!str) return 0;
        const cleaned = str.replace(/[^\d.,]/g, '').replace(',', '.');
        return parseFloat(cleaned) || 0;
      }

			let messageTg = `🛒 <b>Заказ товара</b> 🛒\n\n`;
			messageTg += `<b>👤 ФИО - </b>${document.querySelector('.order__input-name').value}\n`;
			messageTg += `<b>📞 Телефон - </b>${document.querySelector('.order__input-phone').value}\n`;
			messageTg += `<b>✉️ E-Mail - </b>${document.querySelector('.order__input-email').value}\n`;
			messageTg += `<b>🗺 Адрес - </b>${document.querySelector('.order__input-address').value}\n`;
			messageTg += `<b>💵 Сумма заказа - </b>${extractPriceFromString(document.querySelector('.order__summ').textContent)} ${localStorage.getItem("SportLabValuteMark")}\n\n`;
			messageTg += `<b>Список товаров [${document.querySelectorAll('.order__card').length} наименований]:</b>\n\n`;
			document.querySelectorAll('.order__card').forEach( (item, i) => {
				messageTg += `<b>📦 Товар №${i + 1}</b>\n`;
				messageTg += `<b>Наименование - </b>${document.querySelectorAll('.order__brand')[i].textContent} ${document.querySelectorAll('.order__model')[i].textContent}\n`;
				messageTg += `<b>Цена - </b>${document.querySelectorAll('.order__price')[i].textContent}\n`;
				messageTg += `<b>Количество - </b>${document.querySelectorAll('.order__number')[i].textContent} шт.\n`;
				// messageTg += `<b>Ссылка - </b><a href="${document.querySelectorAll('.order__model')[i].href}">на товар</a>\n\n`;
			})

			axios.post(URI_API, {
				chat_id: CHAT_ID,
				parse_mode: "html",
				text: messageTg
			});

			localStorage.clear();
			location.href = "success.html";

		}

	})
}