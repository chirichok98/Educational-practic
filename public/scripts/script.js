user = null;

(function () {
  articleDOM.init();
  actions.init();
  articleDOM.checkUser(user);
}());

function goBackFunction(pixel) {

}

function setCategory(event) {
  const element = event.target;
  if (element.className === 'dropdown-element') {
    actions.printArticles(element.textContent);
  }
}

function handleDropdown(event) {
  if (event.target.className === 'header-filter' || event.target.id === 'button-filter') {
    articleDOM.showFilter();
    return;
  }
  if (event.target.className === 'header-search' || event.target.id === 'button-search') {
    articleDOM.showSearch();
    return;
  }
  if (event.target.className === 'header-burger' || event.target.id === 'button-burger') {
    articleDOM.showMenu();
  }
}

function handleForArticle(event) {
  const id = event.target.offsetParent.id;
  if (event.target.id === 'edit-button' && id) {
    actions.showEditFormFunction(id);
    return;
  }
  if (event.target.id === 'remove-button' && id) {
    actions.showDeleteFormFunction(id);
    return;
  }
  if (event.target.tagName !== 'main' && id) {
    actions.showDetailArticleFunction(id);
  }
}

function handleDetailArticle(event) {
  const id = document.getElementById('detail-article-id').value;
  if (event.target.id === 'detail-edit-article-button' && id) {
    actions.showEditFormFunction(id);
    return;
  }
  if (event.target.id === 'detail-remove-article-button' && id) {
    actions.showDeleteFormFunction(id);
    return;
  }
  if (event.target.id === 'go-back-button') {
    actions.showArticlesWallFunction();
    const node = byId(id).offsetTop - 225;
    window.scrollTo(0, node);
  }
}

listenerId('login-button', actions.loginFunction);
listenerId('logout-button', actions.logoutFunction);
listenerId('add-form-button', actions.showAddFormFunction);
listenerId('articles-list', handleForArticle);
listenerId('photo', actions.showExamplePhoto);
listenerId('go-back-button', goBackFunction);
listenerId('add-article-button', actions.addArticle);
listenerId('edit-article-button', actions.editArticle);
listenerId('filter-button', actions.printArticles);
listenerId('article-details', handleDetailArticle);
listenerId('dropdown-menu', setCategory);
listenerId('up-down', actions.upDownScroll);
byClass('header-container')[0].addEventListener('click', handleDropdown);
window.addEventListener('scroll', actions.scrollListener);

