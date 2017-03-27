"use strict";
var articleDOM = (function () {
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article');
        ARTICLE_LIST_NODE = document.querySelector('#articles-list');
    }

    function displayAdditionalButtons(user) {
        var articles = document.getElementsByClassName('addition-buttons');
        if (user) {
            [].forEach.call(articles, function (item) {
                item.classList.remove('display-none');
            });
        }
        else {
            [].forEach.call(articles, function (item) {
                item.classList.add('display-none');
            });
        }
    }

    function checkUser(user) {
        var login = document.getElementsByClassName('log-in')[0];
        var logout = document.getElementsByClassName('log-out')[0];
        if (user) {
            login.classList.add('display-none');
            logout.classList.remove('display-none');
            document.getElementsByClassName('user-name')[0].textContent = user;
        }
        else {
            logout.classList.add('display-none');
            login.classList.remove('display-none');
        }
        displayAdditionalButtons(user);
    }

    function showArticles(articles) {
        var articlesNodes = renderArticles(articles);
        var amount = ARTICLE_LIST_NODE.childNodes.length;
        articlesNodes.forEach(function (node) {
            ARTICLE_LIST_NODE.appendChild(node);
            return true;
        });
    }

    function addArticle(article) {
        var newArticle = renderArticle(article);
        var amount = ARTICLE_LIST_NODE.childNodes.length;
        if (newArticle) {
            if (amount !== 0) {
                ARTICLE_LIST_NODE.insertBefore(newArticle, ARTICLE_LIST_NODE.childNodes[0]);
                return true;
            } else {
                ARTICLE_LIST_NODE.appendChild(newArticle);
                return true;
            }
            displayAdditionalButtons(user);
        }
        return false;
    }

    function removeArticles() {
        ARTICLE_LIST_NODE.innerHTML = '';
        return true;
    }

    function removeArticle(id) {
        var node = document.getElementById(id);
        if (node) {
            node.parentNode.removeChild(node);
            return true;
        }
        return false;
    }

    function editArticle(id, article) {
        var newArticle = document.getElementById(id);
        if (newArticle) {
            newArticle.style.background = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + article.photo + "') no-repeat";
            newArticle.querySelector('.content-main-category').textContent = article.mainCategory;
            newArticle.querySelector('.content-title').textContent = article.title;
            newArticle.querySelector('.content-tags').textContent = article.tags.join(' ');
            return true;
        }
        return false;
    }

    function renderArticles(articles) {
        return articles.map(function (article) {
            return renderArticle(article);
        });
    }

    function renderArticle(article) {
        var template = ARTICLE_TEMPLATE;
        template.content.querySelector('.content').setAttribute('id', article.id);
        template.content.querySelector('.content').style.background = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + article.photo + "') no-repeat";
        template.content.querySelector('.content-main-category').textContent = article.mainCategory;
        template.content.querySelector('.content-title').textContent = article.title;
        template.content.querySelector('.content-tags').textContent = article.tags.join(' ');
        template.content.querySelector('.content-creator').textContent = article.author;
        template.content.querySelector('.content-date').textContent = article.createdAt.toLocaleDateString() + " " + article.createdAt.toLocaleTimeString();
        if (user) {
            template.content.querySelector('.addition-buttons').classList.remove('display-none');
        }
        else {
            template.content.querySelector('.addition-buttons').classList.add('display-none');
        }
        return template.content.querySelector('.content').cloneNode(true);
    }

    return {
        init: init,
        showArticles: showArticles,
        addArticle: addArticle,
        removeArticle: removeArticle,
        editArticle: editArticle,
        removeArticles: removeArticles,
        checkUser: checkUser,
    };
}());