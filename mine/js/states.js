// js/states.js — Пагинация статей (по 10 на страницу)
document.addEventListener('DOMContentLoaded', function () {
  const ITEMS_PER_PAGE = 10;
  let allArticles = [];

  const container = document.getElementById('states-container');  // <--- будет вместо .states
  const pagination = document.getElementById('pagination');

  if (!container || !pagination) {
    console.error('Не найдены #states-container или #pagination');
    return;
  }

  // Загружаем статьи
  fetch('js/states.json')
    .then(res => {
      if (!res.ok) throw new Error('Не удалось загрузить states.json');
      return res.json();
    })
    .then(data => {
      allArticles = data;
      renderPage();
    })
    .catch(err => {
      container.innerHTML = '<p style="color:red;text-align:center;">Ошибка загрузки статей</p>';
      console.error(err);
    });

  function getCurrentPage() {
    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get('page') || '1');

    if ( page > 1 ) {
      document.querySelector('.wrapper__page').textContent = `Без рубрики (страница ${page})`;
      document.title = `Статьи - страница ${page}`;
    }

    return page > 0 ? page : 1;
  }

  function updateURL(page) {
    const url = new URL(window.location);
    if (page === 1) {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', page);
    }
    window.history.pushState({}, '', url);
  }

  function renderPage() {
    let currentPage = getCurrentPage();
    const totalPages = Math.ceil(allArticles.length / ITEMS_PER_PAGE);

    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
      updateURL(currentPage);
    }

    container.innerHTML = '';

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = allArticles.slice(start, end);

    pageItems.forEach(article => {
      const card = document.createElement('div');
      card.className = 'states__card';
      card.innerHTML = `
        <a href="${article.link}" class="states__name">${article.name}</a>
        <div class="states__date">${article.date}</div>
        <div class="states__info">${article.text}</div>
        <div class="states__line">
          <div class="states__category">Раздел: <a href="states.html">Без рубрики</a></div>
          <a href="${article.link}" class="states__enter">
            <p>Подробнее</p>
            <img src="images/right.png" alt="→">
          </a>
        </div>
      `;
      container.appendChild(card);
    });

    renderPagination(totalPages, currentPage);
  }

  function renderPagination(totalPages, currentPage) {
    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }

    currentPage = getCurrentPage();
    if (currentPage > totalPages) currentPage = totalPages;

    pagination.innerHTML = '';

    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;

    // Первая + ←
    if (!isFirst) {
      addBtn('pages__first', 'Первая', 1);
      addBtn('pages__prev', '←', currentPage - 1);
    }

    // Логика номеров (точно как у отзывов — по 2 слева/справа в центре)
    let startPage, endPage;
    if (currentPage <= 5) {
      startPage = 1;
      endPage = Math.min(totalPages, 7);
    } else if (currentPage >= totalPages - 4) {
      startPage = Math.max(1, totalPages - 6);
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    if (startPage > 1) {
      addBtn('pages__num', '1', 1);
      if (startPage > 2) addDots();
    }

    for (let i = startPage; i <= endPage; i++) {
      addBtn('pages__num', i, i, i === currentPage);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) addDots();
      addBtn('pages__num', totalPages, totalPages);
    }

    // Далее + Последняя
    if (!isLast) {
      addBtn('pages__next', '→', currentPage + 1);
      addBtn('pages__last', 'Последняя', totalPages);
    }

    function addBtn(className, text, page, isActive = false) {
      const btn = document.createElement('div');
      btn.className = className + (isActive ? ' pages__num-active' : '');
      btn.textContent = text;
      btn.style.cursor = 'pointer';
      btn.onclick = () => {
        updateURL(page);
        renderPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      pagination.appendChild(btn);
    }

    function addDots() {
      const dots = document.createElement('div');
      dots.className = 'pages__dotes';
      dots.textContent = '...';
      pagination.appendChild(dots);
    }
  }

  document.querySelector('.pages').addEventListener('click', event => {
      window.scrollTo(0, 0);
      this.location.reload();
  })
});