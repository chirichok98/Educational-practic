var user = null;

(function () {
    articleDOM.init();
    if (!localStorage.getItem("articles"))
        articleModel.fillLocalStorage();
    if (!localStorage.getItem("user"))
        localStorage.setItem('user', JSON.stringify(user));
    user = JSON.parse(localStorage.getItem('user'));
    articleModel.updateArticles();
    actions.init();
    printArticles();
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
    printArticles();
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
    printArticles();
}

function showMenu() {
    actions.showMenu();
}

function setCategory(event) {
    var element = event.target;
    if (element.className === 'dropdown-element') {
        displayByCategory(element.textContent);
    }
    else { return; }
}

function handleDropdown(event) {
    if (event.target.className === 'header-filter' || event.target.id === 'button-filter') {
        showFilter();
    }
    else if (event.target.className === 'header-search' || event.target.id === 'button-search') {
        showSearch();
    }
    else if (event.target.className === 'header-burger' || event.target.id === 'button-burger') {
        showMenu();
    }
    else { return; }
}

function handleForArticle(event) {
    if (event.target.id === 'edit-button') {
        var id = event.target.offsetParent.id;
        if (id) {
            showEditFormFunction(id);
        }
    }
    else if (event.target.id === 'remove-button') {
        var id = event.target.offsetParent.id;
        if (id) {
            removeArticle(id);
        }
    }
    else if (event.target.tagName !== 'main') {
        var id = event.target.offsetParent.id;
        if (id) {
            showDetailArticleFunction(id);
        }
    }
    else { return; }
}

function handleDetailArticle(event) {
    var id = document.getElementById('detail-article-id').value;
    if (event.target.id === 'detail-edit-article-button' && id) {
        showEditFormFunction(id);
    }
    else if (event.target.id === 'detail-remove-article-button' && id) {
        removeArticle(id);
    }
    else if (event.target.id === 'go-back-button') {
        goBackFunction();
    }
    else { return; }
}

document.getElementById('login-button').addEventListener('click', loginFunction);
document.getElementById('logout-button').addEventListener('click', logoutFunction);
document.getElementById('add-form-button').addEventListener('click', showAddFormFunction);
document.getElementById('articles-list').addEventListener('click', handleForArticle);
document.getElementById('photo').addEventListener('change', showExamplePhoto);
document.getElementById('go-back-button').addEventListener('click', goBackFunction);
document.getElementById('add-article-button').addEventListener('click', addArticle);
document.getElementById('edit-article-button').addEventListener('click', editArticle);
document.getElementById('filter-button').addEventListener('click', filterArticles);
document.getElementsByClassName('header-container')[0].addEventListener('click', handleDropdown);
document.getElementById('article-details').addEventListener('click', handleDetailArticle);
document.getElementById('dropdown-menu').addEventListener('click', setCategory);