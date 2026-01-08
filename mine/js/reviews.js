// js/reviews.js — Пагинация отзывов (по 10 на страницу)
document.addEventListener('DOMContentLoaded', function () {
  const REVIEWS_PER_PAGE = 10;
  let allReviews = [];

  const container = document.getElementById('reviews-container');
  const pagination = document.getElementById('pagination');
  const mobilePag = document.querySelector('.mobile__pag');

  if (!container || !pagination) {
    console.error('Не найдены #reviews-container или #pagination');
    return;
  }
  if (!mobilePag) {
    console.warn('Элемент .mobile__pag не найден — мобильная пагинация отключена');
  }

  // Загружаем отзывы
  fetch('js/reviews.json')
    .then(res => {
      if (!res.ok) throw new Error('Не удалось загрузить reviews.json');
      return res.json();
    })
    .then(data => {
      allReviews = data;
      renderPage();
      window.addEventListener('popstate', renderPage);
    })
    .catch(err => {
      container.innerHTML = '<p style="color:red; text-align:center;">Ошибка загрузки отзывов</p>';
      console.error(err);
    });

  function getPageFromURL() {
    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get('page') || '1');

    if (page > 1) {
      document.querySelector('.wrapper__page').textContent = `Отзывы (страница ${page})`;
      // document.title = `Отзывы - страница ${page}`;
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
    const currentPage = getPageFromURL();
    container.innerHTML = '';

    const start = (currentPage - 1) * REVIEWS_PER_PAGE;
    const end = start + REVIEWS_PER_PAGE;
    const pageReviews = allReviews.slice(start, end);

    const totalPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);

    // Если страница пустая — переходим на последнюю
    if (pageReviews.length === 0 && currentPage > 1) {
      updateURL(totalPages || 1);
      return renderPage();
    }

    // Рендерим отзывы
    pageReviews.forEach(review => {
      const card = document.createElement('div');
      card.className = 'reviews__card';
      card.innerHTML = `
        <p>${review.name} ${review.date}</p>
        <span>${review.text}</span>
      `;
      container.appendChild(card);
    });

    renderPagination(totalPages, currentPage);
    renderMobilePagination(totalPages, currentPage);
  }

  function renderPagination(totalPages, currentPage) {
    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }

    if (currentPage > totalPages) currentPage = totalPages;

    pagination.innerHTML = '';

    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;

    if (!isFirst) {
      const first = document.createElement('div');
      first.className = 'pages__first';
      first.textContent = 'Первая';
      first.onclick = () => goToPage(1);
      pagination.appendChild(first);

      const prev = document.createElement('div');
      prev.className = 'pages__prev';
      prev.textContent = '←';
      prev.onclick = () => goToPage(currentPage - 1);
      pagination.appendChild(prev);
    }

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
      addPage(1);
      if (startPage > 2) addDots();
    }

    for (let i = startPage; i <= endPage; i++) {
      addPage(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) addDots();
      addPage(totalPages);
    }

    if (!isLast) {
      const next = document.createElement('div');
      next.className = 'pages__next';
      next.textContent = '→';
      next.onclick = () => goToPage(currentPage + 1);
      pagination.appendChild(next);

      const last = document.createElement('div');
      last.className = 'pages__last';
      last.textContent = 'Последняя';
      last.onclick = () => goToPage(totalPages);
      pagination.appendChild(last);
    }

    function addPage(num) {
      const el = document.createElement('div');
      el.className = `pages__num ${currentPage === num ? 'pages__num-active' : ''}`;
      el.textContent = num;
      el.onclick = () => goToPage(num);
      pagination.appendChild(el);
    }

    function addDots() {
      const dots = document.createElement('div');
      dots.className = 'pages__dotes';
      dots.textContent = '...';
      pagination.appendChild(dots);
    }
  }

  function renderMobilePagination(totalPages, currentPage) {
    if (totalPages <= 1 || !mobilePag) {
      mobilePag.innerHTML = '';
      return;
    }

    mobilePag.innerHTML = '';

    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;

    if (!isFirst) {
      addMobileBtn('←', currentPage - 1);
    }

    let pagesToShow = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      if (currentPage === 1) {
        pagesToShow = [1, 2, 3];
      } else if (currentPage === totalPages) {
        pagesToShow = [totalPages - 2, totalPages - 1, totalPages];
      } else if (currentPage === 2) {
        pagesToShow = [1, 2, 3];
      } else if (currentPage === totalPages - 1) {
        pagesToShow = [totalPages - 2, totalPages - 1, totalPages];
      } else {
        pagesToShow = [currentPage - 1, currentPage, currentPage + 1];
      }
    }

    pagesToShow.forEach(page => {
      addMobileBtn(page.toString(), page, page === currentPage);
    });

    if (!isLast) {
      addMobileBtn('→', currentPage + 1);
    }

    function addMobileBtn(text, page, isActive = false) {
      const btn = document.createElement('div');
      btn.className = 'mobile__pag-btn';
      if (isActive) {
        btn.classList.add('mobile__pag-btn-active');
      }
      btn.textContent = text;
      btn.style.cursor = 'pointer';
      btn.onclick = () => goToPage(page);
      mobilePag.appendChild(btn);
    }
  }

  function goToPage(page) {
    updateURL(page);
    renderPage();
    window.scrollTo({ top: container.offsetTop - 100, behavior: 'smooth' });
  }

  // Удаляем старый listener — теперь клики обрабатываются в кнопках
  // document.querySelector('.pages').addEventListener('click', event => {
  //     window.scrollTo(0, 0);
  //     this.location.reload();
  // });
});
