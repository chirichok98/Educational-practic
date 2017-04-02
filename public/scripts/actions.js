"use strict";
var actions = (function () {
    var ARRAY_TO_SHOW;

    var ERROR_TEXT;
    var LOGIN_FORM;
    /* add - edit form elements */
    var MAIN_CATEGORY;
    var PHOTO;
    var TITLE;
    var SUMMARY;
    var CONTENT;
    var TAGS;
    var EXAMPLE_PHOTO;
    var ARTICLE_ID;
    var FORM_TYPE;

    /* buttons */
    var ADD_ARTICLE_BUTTON;
    var EDIT_ARTICLE_BUTTON;
    var CANCEL_DELETE_BUTTON;
    var AGREE_DELETE_BUTTON;

    /* dropdowns */
    var SEARCH_FIELD;
    var FILTER_FIELD;
    var BURGER_FIELD;
    var FILTER_BUTTON;
    var SEARCH_BUTTON;
    var BURGER_BUTTON;
    var BACKGROUND;

    var ARTICLES_LIST;
    var ARTICLES_WALL;
    var ADD_ARTICLE;
    var ARTICLE_DETAILS;
    var ERROR;

    /* detail */
    var DETAIL_ARTICLE_ID;
    var DETAIL_MAIN_CATEGORY;
    var DETAIL_TITLE;
    var DETAIL_DATE;
    var DETAIL_PHOTO;
    var DETAIL_CONTENT;
    var DETAIL_TAGS;
    var DETAIL_AUTHOR;
    var DETAIL_ADDITIONAL_BUTTON;

    /* filter */
    var FILTER_TAGS;
    var FILTER_DATE_FROM;
    var FILTER_DATE_TO;
    var FILTER_AUTHOR;

    function init() {
        LOGIN_FORM = document.getElementById("loginForm");
        MAIN_CATEGORY = document.getElementById("main-category");
        PHOTO = document.getElementById("photo");
        TITLE = document.getElementById("title");
        SUMMARY = document.getElementById("summary");
        CONTENT = document.getElementById("content");
        TAGS = document.querySelectorAll('.tag');
        EXAMPLE_PHOTO = document.getElementById('example-photo');
        ARTICLE_ID = document.getElementById('article-id');
        FORM_TYPE = document.getElementById('form-type');

        ADD_ARTICLE_BUTTON = document.getElementById('add-article-button');
        EDIT_ARTICLE_BUTTON = document.getElementById('edit-article-button');
        CANCEL_DELETE_BUTTON = document.getElementById('cancel-delete-button');
        AGREE_DELETE_BUTTON = document.getElementById('agree-delete-button');

        SEARCH_FIELD = document.getElementById('dropdown-search');
        FILTER_FIELD = document.getElementById('dropdown-filter');
        BURGER_FIELD = document.getElementById('dropdown-menu');
        FILTER_BUTTON = document.getElementById('button-filter');
        SEARCH_BUTTON = document.getElementById('button-search');
        BURGER_BUTTON = document.getElementById('button-burger');
        BACKGROUND = document.getElementById('background');

        ARTICLES_LIST = document.getElementById('articles-list');
        ARTICLES_WALL = document.getElementById('articles-wall');
        ADD_ARTICLE = document.getElementById('add-article');
        ARTICLE_DETAILS = document.getElementById('article-details');
        ERROR = document.getElementById('error-form');

        DETAIL_ARTICLE_ID = document.getElementById('detail-article-id');
        DETAIL_MAIN_CATEGORY = document.getElementById('detail-main-category');
        DETAIL_TITLE = document.getElementById('detail-title');
        DETAIL_DATE = document.getElementById('detail-date');
        DETAIL_PHOTO = document.getElementById('detail-photo');
        DETAIL_CONTENT = document.getElementById('detail-content');
        DETAIL_TAGS = document.getElementById('detail-tags');
        DETAIL_AUTHOR = document.getElementById('detail-author');
        DETAIL_ADDITIONAL_BUTTON = document.getElementById('detail-additional-buttons');

        FILTER_TAGS = document.getElementById('filter-tags');
        FILTER_DATE_FROM = document.getElementById('filter-date-from');
        FILTER_DATE_TO = document.getElementById('filter-date-to');
        FILTER_AUTHOR = document.getElementById('filter-author');

        fillArrayFirstTime();
    }

    function fillArrayFirstTime() {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', handler);
        function handler() {
            ARRAY_TO_SHOW = JSON.parse(this.responseText);
            ARRAY_TO_SHOW.forEach(item => item.createdAt = new Date(item.createdAt));
            oReq.removeEventListener('load', handler);
        }
        oReq.open('GET', '/articles', false);
        oReq.send();
    }

    function sort(array) {
        return array.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    function closeAllDropdowns() {
        SEARCH_FIELD.classList.toggle('display-none', true);
        SEARCH_BUTTON.style.backgroundImage = "url(../images/search.png)";
        FILTER_FIELD.classList.toggle('display-none', true);
        FILTER_BUTTON.style.backgroundImage = "url(../images/filter.png)";
        BURGER_FIELD.classList.toggle('display-none', true);
        BURGER_BUTTON.style.backgroundImage = "url(../images/menu.png)";
    }

    function showFilter() {
        if (FILTER_BUTTON.style.backgroundImage === 'url("../images/close.png")') {
            closeAllDropdowns();
        } else {
            FILTER_FIELD.classList.remove('display-none');
            FILTER_BUTTON.style.backgroundImage = "url(../images/close.png)";
        }
    }

    function showSearch() {
        if (SEARCH_BUTTON.style.backgroundImage === 'url("../images/close.png")') {
            closeAllDropdowns();
        } else {
            SEARCH_FIELD.classList.remove('display-none');
            SEARCH_BUTTON.style.backgroundImage = "url(../images/close.png)";
        }
    }

    function showMenu() {
        if (BURGER_BUTTON.style.backgroundImage == 'url("../images/close.png")') {
            closeAllDropdowns();
        } else {
            BURGER_FIELD.classList.remove('display-none');
            BURGER_BUTTON.style.backgroundImage = "url(../images/close.png)";
        }
    }

    function loginFunction() {
        if (LOGIN_FORM.login.value !== '') {
            user = LOGIN_FORM.login.value;
            articleDOM.checkUser(user);
            //DETAIL_ADDITIONAL_BUTTON.classList.remove('display-none');
        }
    }

    function logoutFunction() {
        user = null;
        LOGIN_FORM.login.value = "";
        LOGIN_FORM.password.value = "";
        articleDOM.checkUser(user);
        //DETAIL_ADDITIONAL_BUTTON.classList.add('display-none');
        if (!ADD_ARTICLE.classList.contains('display-none')) {
            showArticlesWallFunction();
        }
    }

    function clearFields() {
        PHOTO.value = "";
        TITLE.value = "";
        SUMMARY.value = "";
        CONTENT.value = "";
        ARTICLE_ID.textContent = "";
        TAGS.forEach(function (tag) {
            tag.value = "";
        });
        EXAMPLE_PHOTO.classList.toggle('display-none', true);
    }

    function serialize(obj) {
        var query = [];
        for (let prop in obj)
            if (obj.hasOwnProperty(prop)) {
                query.push(encodeURIComponent(prop) + "=" + encodeURIComponent(obj[prop]));
            }
        return query.join("&");
    }

    function filterArticles() {
        closeAllDropdowns();
        ERROR_TEXT = 'Нет статей, удовлетворяющих введенным параметрам!';

        var filterConfig = {
            author: FILTER_AUTHOR.value,
            from: new Date(FILTER_DATE_FROM.value),
            to: new Date(FILTER_DATE_TO.value)
        };
        var tags = FILTER_TAGS.value.replace(/#/g, '').trim().split(' ');
        if (tags[0] !== '') {
            filterConfig.tags = tags;
        }
        var query = serialize(filterConfig);

        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', handler);
        function handler() {
            ARRAY_TO_SHOW = JSON.parse(this.responseText);
            ARRAY_TO_SHOW.forEach(item => item.createdAt = new Date(item.createdAt));
            if (ARRAY_TO_SHOW.length !== 0) {
                printArticles();
            } else {
                document.getElementById('error-name').textContent = ERROR_TEXT;
                hideAllForms();
                ERROR.classList.remove('display-none');
            }
            oReq.removeEventListener('load', handler);
        }
        oReq.open('GET', '/articles?' + query, false);
        oReq.send();
    }

    function addArticle() {
        var article = {
            mainCategory: MAIN_CATEGORY.value,
            photo: PHOTO.value,
            title: TITLE.value,
            summary: SUMMARY.value,
            author: user,
            content: CONTENT.value,
            tags: [].slice.call(TAGS).map(function (element) { return element.value })
        };

        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', function () {
            var res = JSON.parse(this.responseText);
            if (res) {
                article._id = res.id;
                article.createdAt = new Date(res.createdAt);
                ARRAY_TO_SHOW.push(article);
                printArticles();
                showArticlesWallFunction();
            } else {
                ////////erororororoorororor
            }
        });
        oReq.open('POST', '/articles');
        oReq.setRequestHeader('content-type', 'application/json');
        oReq.send(JSON.stringify(article));
    }

    function editArticle() {
        var id = ARTICLE_ID.textContent;
        var article = {
            mainCategory: MAIN_CATEGORY.value,
            photo: PHOTO.value,
            title: TITLE.value,
            summary: SUMMARY.value,
            content: CONTENT.value,
            tags: [].slice.call(TAGS).map(function (element) { return element.value })
        }
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', function () {
            if (this.status === 200) {
                var old = ARRAY_TO_SHOW.find(item => item._id === id);
                for (var key in article) {
                    if (old.hasOwnProperty(key)) {
                        old[key] = article[key];
                    }
                }
                articleDOM.editArticle(id, old);
                printArticles();
                showArticlesWallFunction();
            } else {
                ////////erororororoorororor
            }
        });
        oReq.open('PUT', '/articles/' + id);
        oReq.setRequestHeader('content-type', 'application/json');
        oReq.send(JSON.stringify(article));
    }

    function removeArticle(id) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', handler);
        function handler() {
            if (this.status === 200) {
                articleDOM.removeArticle(id);
                ARRAY_TO_SHOW.splice(ARRAY_TO_SHOW.findIndex(item => item._id === id), 1);
                oReq.removeEventListener('load', handler);
            }
        }
        oReq.open('DELETE', '/articles/' + id, false);
        oReq.send();

    }

    function hideAllForms() {
        ARTICLES_WALL.classList.toggle('display-none', true);
        ADD_ARTICLE.classList.toggle('display-none', true);
        ARTICLE_DETAILS.classList.toggle('display-none', true);
        ERROR.classList.toggle('display-none', true);
    }

    function showDeleteFormFunction(id) {
        BACKGROUND.classList.remove('display-none');
        document.getElementById('article-id').textContent = id;
        BACKGROUND.addEventListener('click', checkAnswer);
    }

    function checkAnswer(event) {
        if (event.target.id === 'agree-delete-button') {
            var id = document.getElementById('article-id').textContent;
            removeArticle(id);
            BACKGROUND.classList.add('display-none');
            showArticlesWallFunction();
            printArticles();
        }
        else if (event.target.id !== 'error-form') {
            BACKGROUND.classList.add('display-none');
        }
    }

    function showAddFormFunction() {
        window.scrollTo(0, 200);
        hideAllForms();
        clearFields();
        FORM_TYPE.textContent = "Добавление новости";
        EDIT_ARTICLE_BUTTON.classList.toggle('display-none', true);
        ADD_ARTICLE_BUTTON.classList.toggle('display-none', false);
        ADD_ARTICLE.classList.remove('display-none');
    }

    function showDetailArticleFunction(id) {
        window.scrollTo(0, 0);
        hideAllForms();
        closeAllDropdowns();
        var article;
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', handler);
        function handler() {
            article = JSON.parse(this.responseText);
            article.createdAt = new Date(article.createdAt);
            oReq.removeEventListener('load', handler);
        }
        oReq.open('GET', '/article/' + id, false);
        oReq.send();

        DETAIL_ARTICLE_ID.value = id;
        DETAIL_MAIN_CATEGORY.textContent = article.mainCategory;
        DETAIL_TITLE.textContent = article.title;
        DETAIL_DATE.textContent = article.createdAt.toLocaleDateString() + " " + article.createdAt.toLocaleTimeString();
        DETAIL_PHOTO.setAttribute('src', article.photo);
        DETAIL_CONTENT.textContent = article.content;
        DETAIL_TAGS.textContent = "#" + article.tags.join(' #');
        DETAIL_AUTHOR.textContent = article.author;
        ARTICLE_DETAILS.classList.remove('display-none');
    }

    function showEditFormFunction(id) {
        window.scrollTo(0, 0);
        ARTICLE_ID.textContent = id;
        FORM_TYPE.textContent = "Редактирование новости";
        EDIT_ARTICLE_BUTTON.classList.toggle('display-none', false);
        ADD_ARTICLE_BUTTON.classList.toggle('display-none', true);

        var article;
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', handler);
        function handler() {
            article = JSON.parse(this.responseText);
            article.createdAt = new Date(article.createdAt);
            oReq.removeEventListener('load', handler);
        }
        oReq.open('GET', '/article/' + id, false);
        oReq.send();

        MAIN_CATEGORY.value = article.mainCategory;
        PHOTO.value = article.photo;
        TITLE.value = article.title;
        SUMMARY.value = article.summary;
        CONTENT.value = article.content;
        for (let i = 0; i < 5; i++) {
            if (article.tags[i]) {
                TAGS[i].value = article.tags[i];
            }
        }
        showExamplePhoto();
        hideAllForms();
        closeAllDropdowns();
        ADD_ARTICLE.classList.remove('display-none');
    }

    function showArticlesWallFunction() {
        hideAllForms();
        window.scrollTo(0, 0);
        ARTICLES_WALL.classList.remove('display-none');
    }

    function showExamplePhoto() {
        EXAMPLE_PHOTO.setAttribute('src', PHOTO.value);
        EXAMPLE_PHOTO.classList.toggle('display-none', false);
    }

    function setCategory(category) {
        closeAllDropdowns();
        hideAllForms();
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', handler);
        function handler() {
            ARRAY_TO_SHOW = JSON.parse(this.responseText);
            ARRAY_TO_SHOW.forEach(item => item.createdAt = new Date(item.createdAt));
            oReq.removeEventListener('load', handler);
        }
        oReq.open('GET', '/articles/' + category, false);
        oReq.send();
        showArticlesWallFunction();
    }

    function printArticles() {

        closeAllDropdowns();
        showArticlesWallFunction();
        articleDOM.removeArticles();
        var total = ARRAY_TO_SHOW.length;
        var paginationParams = pagination.init(total, print);
        print(paginationParams.skip, paginationParams.top);
    }

    function print(skip, top) {
        articleDOM.showArticles(sort(ARRAY_TO_SHOW).slice(skip, skip + top));
    }

    return {
        init: init,

        loginFunction: loginFunction,
        logoutFunction: logoutFunction,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        filterArticles: filterArticles,
        showExamplePhoto: showExamplePhoto,

        printArticles: printArticles,
        showAddFormFunction: showAddFormFunction,
        showEditFormFunction: showEditFormFunction,
        showArticlesWallFunction: showArticlesWallFunction,
        showDetailArticleFunction: showDetailArticleFunction,
        showDeleteFormFunction: showDeleteFormFunction,

        showFilter: showFilter,
        showMenu: showMenu,
        showSearch: showSearch,
        setCategory: setCategory
    }
}());