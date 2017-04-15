user = null;

(function () {
  articleDOM.init();
  actions.init();
 // printArticles();
  articleDOM.checkUser(user);
}());

function loginFunction() {
  actions.loginFunction();
}

function logoutFunction() {
  actions.logoutFunction();
}

function printArticles() {
  actions.printArticles();
}

function addArticle() {
  actions.addArticle();
}

function filterArticles() {
  actions.filterArticles();
}

function showAddFormFunction() {
  actions.showAddFormFunction();
}

function showEditFormFunction(id) {
  actions.showEditFormFunction(id);
}

function editArticle() {
  actions.editArticle();
}

function removeArticle(id) {
  actions.showDeleteFormFunction(id);
}

function showDetailArticleFunction(id) {
  actions.showDetailArticleFunction(id);
}

function showExamplePhoto() {
  actions.showExamplePhoto();
}

function goBackFunction() {
  actions.showArticlesWallFunction();
  printArticles();
}

function showFilter() {
  actions.showFilter();
}

function showSearch() {
  actions.showSearch();
}

function displayByCategory(category) {
  actions.setCategory(category);
}

function showMenu() {
  actions.showMenu();
}

function setCategory(event) {
  const element = event.target;
  if (element.className === 'dropdown-element') {
    displayByCategory(element.textContent);
  }
}

function handleDropdown(event) {
  if (event.target.className === 'header-filter' || event.target.id === 'button-filter') {
    showFilter();
    return;
  }
  if (event.target.className === 'header-search' || event.target.id === 'button-search') {
    showSearch();
    return;
  }
  if (event.target.className === 'header-burger' || event.target.id === 'button-burger') {
    showMenu();
  }
}

function handleForArticle(event) {
  const id = event.target.offsetParent.id;
  if (event.target.id === 'edit-button' && id) {
    showEditFormFunction(id);
    return;
  }
  if (event.target.id === 'remove-button' && id) {
    removeArticle(id);
    return;
  }
  if (event.target.tagName !== 'main' && id) {
    showDetailArticleFunction(id);
  }
}

function handleDetailArticle(event) {
  const id = document.getElementById('detail-article-id').value;
  if (event.target.id === 'detail-edit-article-button' && id) {
    showEditFormFunction(id);
    return;
  }
  if (event.target.id === 'detail-remove-article-button' && id) {
    removeArticle(id);
    return;
  }
  if (event.target.id === 'go-back-button') {
    goBackFunction();
  }
}


listenerId('login-button', loginFunction);
listenerId('logout-button', logoutFunction);
listenerId('add-form-button', showAddFormFunction);
listenerId('articles-list', handleForArticle);
listenerId('photo', showExamplePhoto);
listenerId('go-back-button', goBackFunction);
listenerId('add-article-button', addArticle);
listenerId('edit-article-button', editArticle);
listenerId('filter-button', filterArticles);
listenerId('article-details', handleDetailArticle);
listenerId('dropdown-menu', setCategory);
byClass('header-container')[0].addEventListener('click', handleDropdown);
