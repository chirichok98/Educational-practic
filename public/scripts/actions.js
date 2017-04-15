const actions = (function () {
  let ARRAY_TO_SHOW;
  let ERROR_TEXT;
  const LOGIN_FORM = byId('loginForm');
  const MAIN_CATEGORY = byId('main-category');
  const PHOTO = byId('photo');
  const TITLE = byId('title');
  const SUMMARY = byId('summary');
  const CONTENT = byId('content');
  const TAGS = document.querySelectorAll('.tag');
  const EXAMPLE_PHOTO = byId('example-photo');
  const ARTICLE_ID = byId('article-id');
  const FORM_TYPE = byId('form-type');

  const ADD_ARTICLE_BUTTON = byId('add-article-button');
  const EDIT_ARTICLE_BUTTON = byId('edit-article-button');

  const SEARCH_FIELD = byId('dropdown-search');
  const FILTER_FIELD = byId('dropdown-filter');
  const BURGER_FIELD = byId('dropdown-menu');
  const FILTER_BUTTON = byId('button-filter');
  const SEARCH_BUTTON = byId('button-search');
  const BURGER_BUTTON = byId('button-burger');
  const BACKGROUND = byId('background');

  const ARTICLES_WALL = byId('articles-wall');
  const ADD_ARTICLE = byId('add-article');
  const ARTICLE_DETAILS = byId('article-details');
  const ERROR = byId('error-form');

  const DETAIL_ARTICLE_ID = byId('detail-article-id');
  const DETAIL_MAIN_CATEGORY = byId('detail-main-category');
  const DETAIL_TITLE = byId('detail-title');
  const DETAIL_DATE = byId('detail-date');
  const DETAIL_PHOTO = byId('detail-photo');
  const DETAIL_CONTENT = byId('detail-content');
  const DETAIL_TAGS = byId('detail-tags');
  const DETAIL_AUTHOR = byId('detail-author');

  const FILTER_TAGS = byId('filter-tags');
  const FILTER_DATE_FROM = byId('filter-date-from');
  const FILTER_DATE_TO = byId('filter-date-to');
  const FILTER_AUTHOR = byId('filter-author');

  function init() {
    fillArrayFirstTime();
  }

  function fillArrayFirstTime() {
    requests.sendGetHttp('/articles').then(
      (response) => {
        ARRAY_TO_SHOW = response;
        ARRAY_TO_SHOW.forEach(item => item.createdAt = new Date(item.createdAt));
        printArticles();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function sort(array) {
    return array.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  function closeAllDropdowns() {
    SEARCH_FIELD.classList.toggle('display-none', true);
    SEARCH_BUTTON.style.backgroundImage = 'url(../images/search.png)';
    FILTER_FIELD.classList.toggle('display-none', true);
    FILTER_BUTTON.style.backgroundImage = 'url(../images/filter.png)';
    BURGER_FIELD.classList.toggle('display-none', true);
    BURGER_BUTTON.style.backgroundImage = 'url(../images/menu.png)';
  }

  function showFilter() {
    if (FILTER_BUTTON.style.backgroundImage === 'url("../images/close.png")') {
      closeAllDropdowns();
    } else {
      FILTER_FIELD.classList.remove('display-none');
      FILTER_BUTTON.style.backgroundImage = 'url(../images/close.png)';
    }
  }

  function showSearch() {
    if (SEARCH_BUTTON.style.backgroundImage === 'url("../images/close.png")') {
      closeAllDropdowns();
    } else {
      SEARCH_FIELD.classList.remove('display-none');
      SEARCH_BUTTON.style.backgroundImage = 'url(../images/close.png)';
    }
  }

  function showMenu() {
    if (BURGER_BUTTON.style.backgroundImage === 'url("../images/close.png")') {
      closeAllDropdowns();
    } else {
      BURGER_FIELD.classList.remove('display-none');
      BURGER_BUTTON.style.backgroundImage = 'url(../images/close.png)';
    }
  }

  function loginFunction() {
    if (LOGIN_FORM.login.value !== '') {
      user = LOGIN_FORM.login.value;
      articleDOM.checkUser(user);
    }
  }

  function logoutFunction() {
    user = null;
    LOGIN_FORM.login.value = '';
    LOGIN_FORM.password.value = '';
    articleDOM.checkUser(user);
    if (!ADD_ARTICLE.classList.contains('display-none')) {
      showArticlesWallFunction();
    }
  }

  function clearFields() {
    PHOTO.value = '';
    TITLE.value = '';
    SUMMARY.value = '';
    CONTENT.value = '';
    ARTICLE_ID.textContent = '';
    TAGS.forEach((tag) => {
      tag.value = '';
    });
    EXAMPLE_PHOTO.classList.toggle('display-none', true);
  }

  function serialize(obj) {
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
  }
   
  function filterArticles() {
    closeAllDropdowns();
    ERROR_TEXT = 'Нет статей, удовлетворяющих введенным параметрам!';

    const filterConfig = {
      author: FILTER_AUTHOR.value,
      from: new Date(FILTER_DATE_FROM.value),
      to: new Date(FILTER_DATE_TO.value),
    };
    const tags = FILTER_TAGS.value.replace(/#/g, '').trim().split(' ');
    if (tags[0] !== '') {
      filterConfig.tags = tags;
    }
    const query = serialize(filterConfig);
    requests.sendGetHttp(`/articles?${query}`).then(
      (response) => {
        ARRAY_TO_SHOW = response;
        ARRAY_TO_SHOW.forEach(item => item.createdAt = new Date(item.createdAt));
        if (ARRAY_TO_SHOW.length !== 0) {
          printArticles();
          return;
        }
        byId('error-name').textContent = ERROR_TEXT;
        hideAllForms();
        ERROR.classList.remove('display-none');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function addArticle() {
    const article = {
      mainCategory: MAIN_CATEGORY.value,
      photo: PHOTO.value,
      title: TITLE.value,
      summary: SUMMARY.value,
      author: user,
      content: CONTENT.value,
      tags: [].slice.call(TAGS).map(element => element.value),
    };
    requests.sendPostHttp('/articles', article).then(
      (response) => {
        const res = response;
        if (res) {
          article._id = res.id;
          article.createdAt = new Date(res.createdAt);
          ARRAY_TO_SHOW.push(article);
          printArticles();
          showArticlesWallFunction();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function editArticle() {
    const id = ARTICLE_ID.textContent;
    const article = {
      mainCategory: MAIN_CATEGORY.value,
      photo: PHOTO.value,
      title: TITLE.value,
      summary: SUMMARY.value,
      content: CONTENT.value,
      tags: [].slice.call(TAGS).map(element => element.value),
    };
    requests.sendPutHttp(`/articles/${id}`, article).then(
      (response) => {
        const old = ARRAY_TO_SHOW.find(item => item._id === id);
        const keys = Object.keys(article);
        keys.forEach(key => old[key] = article[key]);
        articleDOM.editArticle(id, old);
        showArticlesWallFunction();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function removeArticle(id) {
    requests.sendDeleteHttp(`/articles/${id}`).then(
      (response) => {
        articleDOM.removeArticle(id);
        ARRAY_TO_SHOW.splice(ARRAY_TO_SHOW.findIndex(item => item._id === id), 1);
        printArticles();
        showArticlesWallFunction();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function hideAllForms() {
    ARTICLES_WALL.classList.toggle('display-none', true);
    ADD_ARTICLE.classList.toggle('display-none', true);
    ARTICLE_DETAILS.classList.toggle('display-none', true);
    ERROR.classList.toggle('display-none', true);
  }

  function showDeleteFormFunction(id) {
    BACKGROUND.classList.remove('display-none');
    byId('article-id').textContent = id;
    BACKGROUND.addEventListener('click', checkAnswer);
  }

  function checkAnswer(event) {
    if (event.target.id === 'agree-delete-button') {
      const id = byId('article-id').textContent;
      removeArticle(id);
      BACKGROUND.classList.add('display-none');
      showArticlesWallFunction();
      printArticles();
    } else if (event.target.id !== 'error-form') {
      BACKGROUND.classList.add('display-none');
    }
  }

  function showAddFormFunction() {
    window.scrollTo(0, 200);
    hideAllForms();
    clearFields();
    FORM_TYPE.textContent = 'Добавление новости';
    EDIT_ARTICLE_BUTTON.classList.toggle('display-none', true);
    ADD_ARTICLE_BUTTON.classList.toggle('display-none', false);
    ADD_ARTICLE.classList.remove('display-none');
  }

  function showDetailArticleFunction(id) {
    window.scrollTo(0, 0);
    hideAllForms();
    closeAllDropdowns();
    let article;
    requests.sendGetHttp(`/article/${id}`).then(
      (response) => {
        article = response;
        article.createdAt = new Date(article.createdAt);
        DETAIL_ARTICLE_ID.value = id;
        DETAIL_MAIN_CATEGORY.textContent = article.mainCategory;
        DETAIL_TITLE.textContent = article.title;
        DETAIL_DATE.textContent = `${article.createdAt.toLocaleDateString()} ${article.createdAt.toLocaleTimeString()}`;
        DETAIL_PHOTO.setAttribute('src', article.photo);
        DETAIL_CONTENT.textContent = article.content;
        DETAIL_TAGS.textContent = `#${article.tags.join(' #')}`;
        DETAIL_AUTHOR.textContent = article.author;
        ARTICLE_DETAILS.classList.remove('display-none');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function showEditFormFunction(id) {
    window.scrollTo(0, 0);
    ARTICLE_ID.textContent = id;
    FORM_TYPE.textContent = 'Редактирование новости';
    EDIT_ARTICLE_BUTTON.classList.toggle('display-none', false);
    ADD_ARTICLE_BUTTON.classList.toggle('display-none', true);

    let article;

    requests.sendGetHttp(`/article/${id}`).then(
      (response) => {
        article = response;
        article.createdAt = new Date(article.createdAt);
        MAIN_CATEGORY.value = article.mainCategory;
        PHOTO.value = article.photo;
        TITLE.value = article.title;
        SUMMARY.value = article.summary;
        CONTENT.value = article.content;
        for (let i = 0; i < 5; i += 1) {
          if (article.tags[i]) {
            TAGS[i].value = article.tags[i];
          }
        }
        showExamplePhoto();
        hideAllForms();
        closeAllDropdowns();
        ADD_ARTICLE.classList.remove('display-none');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function showArticlesWallFunction() {
    hideAllForms();
    window.scrollTo(0, 0);
    ARTICLES_WALL.classList.remove('display-none');
  }

  function showExamplePhoto() {
    EXAMPLE_PHOTO.setAttribute('src', PHOTO.value);
    EXAMPLE_PHOTO.classList.toggle('display-none', false);
  }

  function setCategory(category) {
    closeAllDropdowns();
    hideAllForms();
    ERROR_TEXT = `Нет статей по категории - ${category}!`;
    requests.sendGetHttp(`/articles/${category}`).then(
      (response) => {
        ARRAY_TO_SHOW = response;
        ARRAY_TO_SHOW.forEach(item => item.createdAt = new Date(item.createdAt));
        if (ARRAY_TO_SHOW.length !== 0) {
          printArticles();
          showArticlesWallFunction();
          return;
        }
        byId('error-name').textContent = ERROR_TEXT;
        hideAllForms();
        ERROR.classList.remove('display-none');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function printArticles() {
    closeAllDropdowns();
    showArticlesWallFunction();
    articleDOM.removeArticles();
    const total = ARRAY_TO_SHOW.length;
    const paginationParams = pagination.init(total, print);
    print(paginationParams.skip, paginationParams.top);
  }

  function print(skip, top) {
    articleDOM.showArticles(sort(ARRAY_TO_SHOW).slice(skip, skip + top));
  }

  return {
    init,

    loginFunction,
    logoutFunction,
    addArticle,
    editArticle,
    removeArticle,
    filterArticles,
    showExamplePhoto,

    printArticles,
    showAddFormFunction,
    showEditFormFunction,
    showArticlesWallFunction,
    showDetailArticleFunction,
    showDeleteFormFunction,

    showFilter,
    showMenu,
    showSearch,
    setCategory,
  };
}());
