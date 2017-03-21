document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    articleDOM.init();
    printArticles(0, 9);
}

function login_user(){
    articleDOM.login();
}

function show_filter(){
    articleDOM.show_filter();
}

function show_search(){
    articleDOM.show_search();
}

function show_menu(){
    articleDOM.show_menu();
}

function printArticles(skip, top) {
    articleDOM.showArticles(articleModel.getArticles(skip, top));
}

function addArticle(article) {
    if (articleModel.addArticle(article) !== false) {
        articleDOM.addArticle(article);
    }
    else {
        return false;
    }
}

function removeArticle(id) {
    if (articleModel.removeArticle(id) !== false) {
        return articleDOM.removeArticle(id);
    }
    return false;

}

function editArticle(id, article) {
    if (articleModel.editArticle(id, article)) {
        return articleDOM.editArticle(id, article);
    }
    return false;
}

function checkUser(user) {
    articleDOM.checkUser(user);
}

function addTags(id, tags) {
    if (articleModel.addTags(id, tags)) {
        return articleDOM.addTags(id, tags);
    }
    return false;
}

function removeTags(id, tags) {
    if (articleModel.removeTags(id, tags)) {
        return articleDOM.removeTags(id, tags);
    }
    return false;

}

