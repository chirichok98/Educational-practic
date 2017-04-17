const articleDOM = (function () {
  let ARTICLE_TEMPLATE;
  let ARTICLE_LIST_NODE;
  const SEARCH_FIELD = byId('dropdown-search');
  const SEARCH_BUTTON = byId('button-search');
  const FILTER_FIELD = byId('dropdown-filter');
  const FILTER_BUTTON = byId('button-filter');
  const BURGER_FIELD = byId('dropdown-menu');
  const BURGER_BUTTON = byId('button-burger');

  function init() {
    ARTICLE_TEMPLATE = qerSel(document, '#template-article');
    ARTICLE_LIST_NODE = qerSel(document, '#articles-list');
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

  function displayAdditionalButtons(user) {
    const articles = byClass('addition-buttons');
    if (user) {
      byId('detail-additional-buttons').classList.remove('display-none');
      [].forEach.call(articles, (item) => {
        item.classList.remove('display-none');
      });
    } else {
      byId('detail-additional-buttons').classList.add('display-none');
      [].forEach.call(articles, (item) => {
        item.classList.add('display-none');
      });
    }
  }

  function checkUser(user) {
    const login = byClass('log-in')[0];
    const logout = byClass('log-out')[0];
    if (user) {
      login.classList.add('display-none');
      logout.classList.remove('display-none');
      byClass('user-name')[0].textContent = user;
    } else {
      logout.classList.add('display-none');
      login.classList.remove('display-none');
    }
    displayAdditionalButtons(user);
  }

  function renderArticles(articles) {
    return articles.map(article => renderArticle(article));
  }

  function renderArticle(article) {
    const template = ARTICLE_TEMPLATE;
    qerSel(template.content, '.content').setAttribute('id', article._id);
    qerSel(template.content, '.content').style.background = `linear-gradient(rgba(0, 0, 0, 0.5), 
        rgba(0, 0, 0, 0.5)), url('${article.photo}') no-repeat`;
    qerSel(template.content, '.content-main-category').textContent = article.mainCategory;
    qerSel(template.content, '.content-title').textContent = article.title;
    qerSel(template.content, '.content-tags').textContent = article.tags.join(' ');
    qerSel(template.content, '.content-creator').textContent = article.author;
    qerSel(template.content, '.content-date').textContent =
      `${article.createdAt.toLocaleDateString()} 
      ${article.createdAt.toLocaleTimeString()}`;
    if (user) {
      qerSel(template.content, '.addition-buttons').classList.remove('display-none');
      return qerSel(template.content, '.content').cloneNode(true);
    }
    qerSel(template.content, '.addition-buttons').classList.add('display-none');
    return qerSel(template.content, '.content').cloneNode(true);
  }

  function showArticles(articles) {
    const articlesNodes = renderArticles(articles);
    articlesNodes.forEach((node) => {
      ARTICLE_LIST_NODE.appendChild(node);
      return true;
    });
  }

  function addArticle(article) {
    const newArticle = renderArticle(article);
    const amount = ARTICLE_LIST_NODE.childNodes.length;
    if (newArticle) {
      if (amount !== 0) {
        ARTICLE_LIST_NODE.insertBefore(newArticle, ARTICLE_LIST_NODE.childNodes[0]);
        return true;
      }
      ARTICLE_LIST_NODE.appendChild(newArticle);
      return true;
    }
    return false;
  }

  function removeArticles() {
    ARTICLE_LIST_NODE.innerHTML = '';
    return true;
  }

  function removeArticle(id) {
    const node = byId(id);
    if (node) {
      node.parentNode.removeChild(node);
      return true;
    }
    return false;
  }

  function editArticle(id, article) {
    const newArticle = byId(id);
    if (newArticle) {
      newArticle.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), 
        rgba(0, 0, 0, 0.5)), url('${article.photo}') no-repeat`;
      qerSel(newArticle, '.content-main-category').textContent = article.mainCategory;
      qerSel(newArticle, '.content-title').textContent = article.title;
      qerSel(newArticle, '.content-tags').textContent = article.tags.join(' ');
      return true;
    }
    return false;
  }


  return {
    init,
    showArticles,
    addArticle,
    removeArticle,
    editArticle,
    removeArticles,
    checkUser,
    closeAllDropdowns,
    showFilter,
    showMenu,
    showSearch,
  };
}());
