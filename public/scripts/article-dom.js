const articleDOM = (function () {
  let ARTICLE_TEMPLATE;
  let ARTICLE_LIST_NODE;

  const ARTICLES_WALL = byId('articles-wall');
  const ADD_ARTICLE = byId('add-article');
  const ARTICLE_DETAILS = byId('article-details');
  const ERROR = byId('error-form');
  const FILTER_FIELD = byId('dropdown-filter');
  const FILTER_BUTTON = byId('button-filter');
  const BURGER_FIELD = byId('dropdown-menu');
  const BURGER_BUTTON = byId('button-burger');

  function init() {
    ARTICLE_TEMPLATE = qerSel(document, '#template-article');
    ARTICLE_LIST_NODE = qerSel(document, '#articles-list');
  }

  function closeAllDropdowns() {
    display(FILTER_FIELD, true);
    display(BURGER_FIELD, true);
    setBackgroundImage(FILTER_BUTTON, 'filter.png');
    setBackgroundImage(BURGER_BUTTON, 'menu.png');
  }

  function setBackgroundImage(field, file) {
    const name = file || 'close.png';
    const image = `url(../images/${name})`;
    field.style.backgroundImage = image;
  }

  function isShownDropdown(field) {
    const curImage = field.style.backgroundImage;
    const shown = 'url("../images/close.png")';
    const res = curImage === shown;
    return res;
  }

  function showFilter() {
    const filter = isShownDropdown(FILTER_BUTTON);
    if (filter) {
      closeAllDropdowns();
      return;
    }
    display(FILTER_FIELD, false);
    setBackgroundImage(FILTER_BUTTON);
  }

  function showMenu() {
    const menu = isShownDropdown(BURGER_BUTTON);
    if (menu) {
      closeAllDropdowns();
      return;
    }
    display(BURGER_FIELD, false);
    setBackgroundImage(BURGER_BUTTON);
  }

  function renderArticles(articles) {
    return articles.map(article => renderArticle(article));
  }

  function renderArticle(article) {
    const user = authentication.getCurrentUser();
    const template = ARTICLE_TEMPLATE.content;

    const CONTENT = qerSel(template, '.content');
    const BUTTONS = qerSel(template, '.addition-buttons');
    const MAIN_CATEGORY = qerSel(template, '.content-main-category');
    const TITLE = qerSel(template, '.content-title');
    const TAGS = qerSel(template, '.content-tags');
    const AUTHOR = qerSel(template, '.content-creator');
    const DATE = qerSel(template, '.content-date');

    function fillFields(curUser, curArticle) {
      const u = curUser;
      const a = curArticle;

      const backgroundStyle = `linear-gradient(rgba(0, 0, 0, 0.5), 
        rgba(0, 0, 0, 0.5)), url('${a.photo}') no-repeat`;
      const backgroundSize = '100% 100%';

      CONTENT.setAttribute('id', a._id);
      CONTENT.style.background = backgroundStyle;
      CONTENT.style.backgroundSize = backgroundSize;
      MAIN_CATEGORY.textContent = a.mainCategory;
      TITLE.textContent = a.title;
      TAGS.textContent = a.tags.join(' ');
      AUTHOR.textContent = a.author;
      DATE.textContent = a.createdAt.toLocaleString();

      if (u) {
        display(BUTTONS, false);
        return;
      }
      display(BUTTONS, true);
    }

    fillFields(user, article);
    return CONTENT.cloneNode(true);
  }

  function showArticles(articles) {
    const articlesNodes = renderArticles(articles);
    articlesNodes.forEach((node) => {
      ARTICLE_LIST_NODE.appendChild(node);
    });
  }

  function removeArticles() {
    ARTICLE_LIST_NODE.innerHTML = '';
    return true;
  }

  function hideAllForms() {
    display(ARTICLES_WALL, true);
    display(ADD_ARTICLE, true);
    display(ARTICLE_DETAILS, true);
    display(ERROR, true);
  }

  return {
    init,
    showArticles,
    removeArticles,
    closeAllDropdowns,
    hideAllForms,
    showFilter,
    showMenu,
  };
}());
