const articleService = (function () {
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
  const FORM_TYPE = byId('form-type');

  const ADD_ARTICLE_BUTTON = byId('add-article-button');
  const EDIT_ARTICLE_BUTTON = byId('edit-article-button');

  const ARTICLES_WALL = byId('articles-wall');
  const ADD_ARTICLE = byId('add-article');
  const ARTICLE_DETAILS = byId('article-details');
  const ERROR = byId('error-form');

  const DETAIL_MAIN_CATEGORY = byId('detail-main-category');
  const DETAIL_TITLE = byId('detail-title');
  const DETAIL_DATE = byId('detail-date');
  const DETAIL_PHOTO = byId('detail-photo');
  const DETAIL_CONTENT = byId('detail-content');
  const DETAIL_TAGS = byId('detail-tags');
  const DETAIL_AUTHOR = byId('detail-author');
  const DETAIL_ADDIT_BUT = byId('detail-additional-buttons');

  const FILTER_TAGS = byId('filter-tags');
  const FILTER_DATE_FROM = byId('filter-date-from');
  const FILTER_DATE_TO = byId('filter-date-to');
  const FILTER_AUTHOR = byId('filter-author');

  function init() {
    authentication.getCurrentUser(fillArrayFirstTime);
  }

  function fillArrayFirstTime() {
    printArticles();
  }

  function clearFieldsAddForm() {
    PHOTO.value = '';
    TITLE.value = '';
    SUMMARY.value = '';
    CONTENT.value = '';
    ADD_ARTICLE.dataset.id = '';
    TAGS.forEach((tag) => {
      tag.value = '';
    });
    display(EXAMPLE_PHOTO, true);
  }

  function serialize(obj) {
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
  }

  function printArticles() {
    articleDOM.closeAllDropdowns();
    showArticlesWall();
    articleDOM.removeArticles();

    const ERROR_TEXT = 'Нет статей, удовлетворяющих введенным параметрам!';
    const from = new Date(FILTER_DATE_FROM.value);
    const to = new Date(FILTER_DATE_TO.value);
    const filterConfig = {
      skip: 0,
      amount: 6,
      author: FILTER_AUTHOR.value,
      dateFrom: from.getTime(),
      dateTo: to.getTime(),
    };
    const tags = FILTER_TAGS.value.replace(/#/g, '').trim().split(' ');
    if (tags[0] !== '') {
      filterConfig.tags = tags;
    }
    const query = serialize(filterConfig);
    let paginationParams = 0;
    requests.sendGetHttp(`articles?${query}`).then(
      (response) => {
        const res = JSON.parse(response);
        console.log(res);
        paginationParams = pagination.init(res.total, filter);
        const ARRAY_TO_SHOW = res.array;
        ARRAY_TO_SHOW.forEach(item => item.createdAt = new Date(item.createdAt));
        if (ARRAY_TO_SHOW.length !== 0) {
          displayArticles(ARRAY_TO_SHOW);
          return;
        }
        byId('error-name').textContent = ERROR_TEXT;
        articleDOM.hideAllForms();
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
        response = JSON.parse(response);
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
    const article = fillArticle();
    requests.sendPostHttp('/articles', article).then(
      (response) => {
        printArticles();
        showArticlesWall();
      },
      (error) => {
        const err = JSON.parse(error);
        messageService.showMessage(err.err);
      }
    );
  }

  function editArticle() {
    const id = ADD_ARTICLE.dataset.id;
    const article = fillArticle();

    requests.sendPutHttp(`/articles/${id}`, article).then(
      (response) => {
        printArticles();
        showArticlesWall();
      },
      (error) => {
        const err = JSON.parse(error);
        messageService.showMessage(err.err);
      }
    );
  }

  function removeArticle(id) {
    requests.sendDeleteHttp(`/articles/${id}`).then(
      (response) => {
        printArticles();
        showArticlesWall();
      },
      (error) => {
        const err = JSON.parse(error);
        messageService.showMessage(err.err);
      }
    );
  }

  function showDeleteForm(id) {
    const text = 'Вы уверены, что хотите удалить новость?';
    messageService.showMessage(text, id);
  }

  function showAddForm() {
    clearFieldsAddForm();
    window.scrollTo(0, 200);
    articleDOM.hideAllForms();

    FORM_TYPE.textContent = 'Добавление новости';

    display(EDIT_ARTICLE_BUTTON, true);
    display(ADD_ARTICLE_BUTTON, false);
    display(ADD_ARTICLE, false);
  }

  function showEditForm(id) {
    window.scrollTo(0, 0);

    FORM_TYPE.textContent = 'Редактирование новости';
    ADD_ARTICLE.dataset.id = id;

    display(EDIT_ARTICLE_BUTTON, false);
    display(ADD_ARTICLE_BUTTON, true);

    requests.sendGetHttp(`/articles/${id}`).then(
      (response) => {
        const article = JSON.parse(response);
        article.createdAt = new Date(article.createdAt);

        fillEditFields(article);

        articleDOM.closeAllDropdowns();
        articleDOM.hideAllForms();

        display(ADD_ARTICLE, false);
      },
      (error) => {
        const err = JSON.parse(error);
        messageService.showMessage(err.err);
      }
    );
  }

  function fillArticle() {
    const article = {
      mainCategory: MAIN_CATEGORY.value,
      photo: PHOTO.value,
      title: TITLE.value,
      summary: SUMMARY.value,
      content: CONTENT.value,
      tags: [].slice.call(TAGS).map(element => element.value),
    };
    return article;
  }

  function fillEditFields(article) {
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
  }

  function showExamplePhoto() {
    EXAMPLE_PHOTO.setAttribute('src', PHOTO.value);
    display(EXAMPLE_PHOTO, false);
  }

  function fillDetailFields(id, article) {
    DETAIL_ADDIT_BUT.dataset.id = id;
    DETAIL_MAIN_CATEGORY.textContent = article.mainCategory;
    DETAIL_TITLE.textContent = article.title;
    DETAIL_DATE.textContent = article.createdAt.toLocaleString();
    DETAIL_PHOTO.setAttribute('src', article.photo);
    DETAIL_CONTENT.textContent = article.content;
    DETAIL_TAGS.textContent = `${article.tags.join(' ')}`;
    DETAIL_AUTHOR.textContent = article.author;
  }

  function showDetailArticle(id) {
    window.scrollTo(0, 0);

    articleDOM.closeAllDropdowns();
    articleDOM.hideAllForms();

    requests.sendGetHttp(`/articles/${id}`).then(
      (response) => {
        const article = JSON.parse(response);
        article.createdAt = new Date(article.createdAt);

        fillDetailFields(id, article);

        display(ARTICLE_DETAILS, false);
      },
      (error) => {
        messageService.showMessage(error);
      }
    );
  }

  function showArticlesWall() {
    articleDOM.hideAllForms();
    display(ARTICLES_WALL, false);
  }

  function displayArticles(array) {
    articleDOM.closeAllDropdowns();
    articleDOM.showArticles(array);
    showArticlesWall();
  }

  function upDownScroll() {
    const pageY = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = byTagName('header')[0].offsetHeight;

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

    const compare = pageY > innerHeight;
    switch (updownElem.className) {
      case '':
        if (compare) {
          updownElem.className = 'up';
        }
        break;

      case 'up':
        if (!compare) {
          updownElem.className = '';
        }
        break;

      case 'down':
        if (compare) {
          updownElem.className = 'up';
        }
        break;
    }
  }

  return {
    init,

    addArticle,
    editArticle,
    removeArticle,
    printArticles,
    showExamplePhoto,

    showAddForm,
    showEditForm,
    showArticlesWall,
    showDetailArticle,
    showDeleteForm,

    upDownScroll,
    scrollListener,
  };
}());
