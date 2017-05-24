(function () {
  articleDOM.init();
  articleService.init();
}());

function goBack() {
  articleService.showArticlesWall(false);
}

function getCategory(event) {
  const element = event.target;
  const condition = element.className === 'dropdown-element';
  if (condition) {
    const categ = element.textContent;
    articleService.useCategory(categ);
  }
}

function handleDropdown(event) {
  const name = event.target.className;
  const id = event.target.id;

  const hFilter = 'header-filter';
  const butFilter = 'button-filter';
  const hBurger = 'header-burger';
  const butBurger = 'button-burger';

  const filter = name === hFilter || id === butFilter;
  const menu = name === hBurger || id === butBurger;

  if (filter) {
    articleDOM.showFilter();
    return;
  }
  if (menu) {
    articleDOM.showMenu();
  }
}

function handleForArticle(event) {
  const ev = event.target;
  const id = ev.offsetParent.id;

  const edit = ev.id === 'edit-button' && id;
  const remove = ev.id === 'remove-button' && id;
  const detail = ev.tagName !== 'main' && id;

  if (edit) {
    articleService.showEditForm(id);
    return;
  }
  if (remove) {
    articleService.showDeleteForm(id);
    return;
  }
  if (detail) {
    articleService.showDetailArticle(id);
  }
}

function handleDetailArticle(event) {
  const ev = event.target.id;
  const id = byId('detail-additional-buttons').dataset.id;
  const editButton = 'detail-edit-article-button';
  const removeButton = 'detail-remove-article-button';
  const backButton = 'go-back-button';

  const edit = ev === editButton && id;
  const remove = ev === removeButton && id;
  const back = ev === backButton;

  if (edit) {
    articleService.showEditForm(id);
    return;
  }
  if (remove) {
    articleService.showDeleteForm(id);
    return;
  }
  if (back) {
    articleService.showArticlesWall();
    const node = byId(id).offsetTop - 225;
    window.scrollTo(0, node);
  }
}

(function () {
  listenerId('login-button', authentication.logIn);
  listenerId('logout-button', authentication.logOut);
  listenerId('add-form-button', articleService.showAddForm);
  listenerId('articles-list', handleForArticle);
  listenerId('photo', articleService.showExamplePhoto);
  listenerId('go-back-button', goBack);
  listenerId('add-article-button', articleService.addArticle);
  listenerId('edit-article-button', articleService.editArticle);
  listenerId('filter-button', articleService.useFilter);
  listenerId('article-details', handleDetailArticle);
  listenerId('dropdown-menu', getCategory);
  listenerId('up-down', articleService.upDownScroll);
  byClass('header-container')[0].addEventListener('click', handleDropdown);
  window.addEventListener('scroll', articleService.scrollListener);
}());
