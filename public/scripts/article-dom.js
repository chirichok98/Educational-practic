const articleDOM = (function () {
  let ARTICLE_TEMPLATE;
  let ARTICLE_LIST_NODE;
  const FILTER_FIELD = byId('dropdown-filter');
  const FILTER_BUTTON = byId('button-filter');
  const BURGER_FIELD = byId('dropdown-menu');
  const BURGER_BUTTON = byId('button-burger');

  function init() {
    ARTICLE_TEMPLATE = qerSel(document, '#template-article');
    ARTICLE_LIST_NODE = qerSel(document, '#articles-list');
  }

  function closeAllDropdowns() {
    FILTER_FIELD.classList.toggle('display-none', true);
    FILTER_BUTTON.style.backgroundImage = 'url(../images/filter.png)';
    BURGER_FIELD.classList.toggle('display-none', true);
    BURGER_BUTTON.style.backgroundImage = 'url(../images/menu.png)';
  }

  function showFilter() {
    if (FILTER_BUTTON.style.backgroundImage === 'url("../images/close.png")') {
      closeAllDropdowns();
      return;
    }
    FILTER_FIELD.classList.remove('display-none');
    FILTER_BUTTON.style.backgroundImage = 'url(../images/close.png)';
  }

  function showMenu() {
    if (BURGER_BUTTON.style.backgroundImage === 'url("../images/close.png")') {
      closeAllDropdowns();
      return;
    }
    BURGER_FIELD.classList.remove('display-none');
    BURGER_BUTTON.style.backgroundImage = 'url(../images/close.png)';
  }

  function renderArticles(articles) {
    return articles.map(article => renderArticle(article));
  }

  function renderArticle(article) {
    const template = ARTICLE_TEMPLATE.content;
    qerSel(template, '.content').setAttribute('id', article._id);
    qerSel(template, '.content').style.background = `linear-gradient(rgba(0, 0, 0, 0.5), 
        rgba(0, 0, 0, 0.5)), url('${article.photo}') no-repeat`;
    qerSel(template, '.content-main-category').textContent = article.mainCategory;
    qerSel(template, '.content-title').textContent = article.title;
    qerSel(template, '.content-tags').textContent = article.tags.join(' ');
    qerSel(template, '.content-creator').textContent = article.author;
    qerSel(template, '.content-date').textContent = article.createdAt.toLocaleString();
    const user = authentication.getCurrentUser();
    if (user) {
      qerSel(template, '.addition-buttons').classList.remove('display-none');
      return qerSel(template, '.content').cloneNode(true);
    }
    qerSel(template, '.addition-buttons').classList.add('display-none');
    return qerSel(template, '.content').cloneNode(true);
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

  return {
    init,
    showArticles,
    removeArticles,
    closeAllDropdowns,
    showFilter,
    showMenu,
  };
}());
