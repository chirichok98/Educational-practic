const actions = (function () {
  let pageYLabel = 0;
  const updownElem = document.getElementById('up-down');
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
    printArticles();
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

  function clearAddForm() {
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

  function printArticles(category) {
    articleDOM.closeAllDropdowns();
    showArticlesWallFunction();
    articleDOM.removeArticles();
    if (!category || category.type === 'click') {
      category = '';
    }
    const ERROR_TEXT = 'Нет статей, удовлетворяющих введенным параметрам!';
    const filterConfig = {
      skip: 0,
      top: 6,
      category,
      author: FILTER_AUTHOR.value,
      from: new Date(FILTER_DATE_FROM.value),
      to: new Date(FILTER_DATE_TO.value),
    };
    const tags = FILTER_TAGS.value.replace(/#/g, '').trim().split(' ');
    if (tags[0] !== '') {
      filterConfig.tags = tags;
    }
    const query = serialize(filterConfig);
    let paginationParams = 0;
    requests.sendGetHttp(`/articles?${query}`).then(
      (response) => {
        paginationParams = pagination.init(response.length, filter);
        const ARRAY_TO_SHOW = response.array;
        ARRAY_TO_SHOW.forEach(item => item.createdAt = new Date(item.createdAt));
        if (response.length !== 0) {
          displayArticles(ARRAY_TO_SHOW);
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

  function filter(paramSkip, paramTop) {
    articleDOM.closeAllDropdowns();
    const filterConfig = {
      skip: paramSkip,
      top: paramSkip + paramTop,
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
        const ARRAY_TO_SHOW = response.array;
        ARRAY_TO_SHOW.forEach(item => item.createdAt = new Date(item.createdAt));
        if (response.length !== 0) {
          displayArticles(ARRAY_TO_SHOW);
        }
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
        printArticles();
        showArticlesWallFunction();
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
        printArticles();
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
    clearAddForm();
    FORM_TYPE.textContent = 'Добавление новости';
    EDIT_ARTICLE_BUTTON.classList.toggle('display-none', true);
    ADD_ARTICLE_BUTTON.classList.toggle('display-none', false);
    ADD_ARTICLE.classList.remove('display-none');
  }

  function showDetailArticleFunction(id) {
    window.scrollTo(0, 0);
    hideAllForms();
    articleDOM.closeAllDropdowns();
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
        articleDOM.closeAllDropdowns();
        ADD_ARTICLE.classList.remove('display-none');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function showArticlesWallFunction() {
    hideAllForms();
    ARTICLES_WALL.classList.remove('display-none');
  }

  function showExamplePhoto() {
    EXAMPLE_PHOTO.setAttribute('src', PHOTO.value);
    EXAMPLE_PHOTO.classList.toggle('display-none', false);
  }
  /*
    function setCategory(category) {
      articleDOM.closeAllDropdowns();
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
  */
  function displayArticles(array) {
    articleDOM.closeAllDropdowns();
    articleDOM.showArticles(array);
    showArticlesWallFunction();
  }

  function upDownScroll() {
    const pageY = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;

    switch (this.className) {
      case 'up':
        pageYLabel = pageY;
        window.scrollTo(0, headerHeight);
        this.className = 'down';
        break;

      case 'down':
        window.scrollTo(0, pageYLabel);
        this.className = 'up';
        break;
    }
  }

  function scrollListener() {
    const pageY = window.pageYOffset || document.documentElement.scrollTop;
    const innerHeight = document.documentElement.clientHeight / 2;

    switch (updownElem.className) {
      case '':
        if (pageY > innerHeight) {
          updownElem.className = 'up';
        }
        break;

      case 'up':
        if (pageY < innerHeight) {
          updownElem.className = '';
        }
        break;

      case 'down':
        if (pageY > innerHeight) {
          updownElem.className = 'up';
        }
        break;
    }
  }

  return {
    init,

    loginFunction,
    logoutFunction,
    addArticle,
    editArticle,
    removeArticle,
    printArticles,
    showExamplePhoto,

    showAddFormFunction,
    showEditFormFunction,
    showArticlesWallFunction,
    showDetailArticleFunction,
    showDeleteFormFunction,

    //    setCategory,
    upDownScroll,
    scrollListener,
  };
}());
