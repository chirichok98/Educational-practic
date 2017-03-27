"use strict";
var actions = (function () {
    var ARRAY_TO_SHOW = articleModel.getArticles(0, articleModel.getArticlesAmount());

    var ERROR_TEXT;
    var LOGIN_FORM = document.getElementById("loginForm");
    /* add - edit form elements */
    var MAIN_CATEGORY = document.getElementById("main-category");
    var PHOTO = document.getElementById("photo");
    var TITLE = document.getElementById("title");
    var SUMMARY = document.getElementById("summary");
    var CONTENT = document.getElementById("content");
    var TAGS = document.querySelectorAll('.tag');
    var EXAMPLE_PHOTO = document.getElementById('example-photo');
    var ARTICLE_ID = document.getElementById('article-id');
    var FORM_TYPE = document.getElementById('form-type');

    /* buttons */
    var ADD_ARTICLE_BUTTON = document.getElementById('add-article-button');
    var EDIT_ARTICLE_BUTTON = document.getElementById('edit-article-button');
    var CANCEL_DELETE_BUTTON = document.getElementById('cancel-delete-button');
    var AGREE_DELETE_BUTTON = document.getElementById('agree-delete-button');

    /* dropdowns */
    var SEARCH_FIELD = document.getElementById('dropdown-search');
    var FILTER_FIELD = document.getElementById('dropdown-filter');
    var BURGER_FIELD = document.getElementById('dropdown-menu');
    var FILTER_BUTTON = document.getElementById('button-filter');
    var SEARCH_BUTTON = document.getElementById('button-search');
    var BURGER_BUTTON = document.getElementById('button-burger');
    var BACKGROUND = document.getElementById('background');

    var ARTICLES_LIST = document.getElementById('articles-list');
    var ARTICLES_WALL = document.getElementById('articles-wall');
    var ADD_ARTICLE = document.getElementById('add-article');
    var ARTICLE_DETAILS = document.getElementById('article-details');
    var ERROR = document.getElementById('error-form');

    /* detail */
    var DETAIL_ARTICLE_ID = document.getElementById('detail-article-id');
    var DETAIL_MAIN_CATEGORY = document.getElementById('detail-main-category');
    var DETAIL_TITLE = document.getElementById('detail-title');
    var DETAIL_DATE = document.getElementById('detail-date');
    var DETAIL_PHOTO = document.getElementById('detail-photo');
    var DETAIL_CONTENT = document.getElementById('detail-content');
    var DETAIL_TAGS = document.getElementById('detail-tags');
    var DETAIL_AUTHOR = document.getElementById('detail-author');
    var DETAIL_ADDITIONAL_BUTTON = document.getElementById('detail-additional-buttons');

    /* filter */
    var FILTER_TAGS = document.getElementById('filter-tags');
    var FILTER_DATE_FROM = document.getElementById('filter-date-from');
    var FILTER_DATE_TO = document.getElementById('filter-date-to');
    var FILTER_AUTHOR = document.getElementById('filter-author');

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
            DETAIL_ADDITIONAL_BUTTON.classList.remove('display-none');
        }
    }

    function logoutFunction() {
        user = null;
        LOGIN_FORM.login.value = "";
        LOGIN_FORM.password.value = "";
        articleDOM.checkUser(user);
        DETAIL_ADDITIONAL_BUTTON.classList.add('display-none');
        showArticlesWallFunction();
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

    function filterArticles() {
        closeAllDropdowns();
        ERROR_TEXT = 'Нет статей, удовлетворяющих введенным параметрам!';
        var tags = FILTER_TAGS.value.replace(/#/g, '').trim().split(' ');
        if (tags[0] === '') {
            tags = undefined;
        }

        var dateFrom = new Date(FILTER_DATE_FROM.value);
        if (dateFrom.toString() === 'Invalid Date') {
            dateFrom = undefined;
        }

        var dateTo = new Date(FILTER_DATE_TO.value);
        if (dateTo.toString() === 'Invalid Date') {
            dateTo = undefined;
        }

        var filterConfig = {
            author: FILTER_AUTHOR.value,
            tags: tags,
            date: {
                from: dateFrom,
                to: dateTo
            }
        };
        ARRAY_TO_SHOW = articleModel.getArticles(0, articleModel.getArticlesAmount(), filterConfig);
        if (ARRAY_TO_SHOW.length === 0) {
            document.getElementById('error-name').textContent = ERROR_TEXT;
            hideAllForms();
            ERROR.classList.remove('display-none');
        }
        else { printArticles(); }
    }

    function addArticle() {
        var date = new Date();
        var article = {
            id: date + user,
            mainCategory: MAIN_CATEGORY.value,
            photo: PHOTO.value,
            title: TITLE.value,
            summary: SUMMARY.value,
            createdAt: date,
            author: user,
            content: CONTENT.value,
            tags: [].slice.call(TAGS).map(function (element) { return element.value }),
            deleted: false
        }
        if (articleModel.addArticle(article)) {
            articleDOM.addArticle(article);
            clearFields();
            hideAllForms();
            ARRAY_TO_SHOW = articleModel.getArticles();
            printArticles();
            showArticlesWallFunction();
        }
        else {
            /* Fill with form of error  */
            return false;
        }
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
        if (articleModel.editArticle(id, article)) {
            articleDOM.editArticle(id, article);
            clearFields();
            hideAllForms();
            ARRAY_TO_SHOW = articleModel.getArticles();
            showArticlesWallFunction();
        }
        else {
            /* Fill with form of error  */
            return false;
        }
    }

    function removeArticle(id) {
        if (articleModel.removeArticle(id)) {
            articleDOM.removeArticle(id);
            ARRAY_TO_SHOW = articleModel.getArticles();
            showArticlesWallFunction();
        } else {
            /* Fill with form of error  */
            return false;
        }
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
            printArticles();
        }
        else {
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
        var article = articleModel.getArticle(id);
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
        var article = articleModel.getArticle(id);
        MAIN_CATEGORY.value = article.mainCategory;
        PHOTO.value = article.photo;
        TITLE.value = article.title;
        SUMMARY.value = article.summary;
        CONTENT.value = article.content;
        for (var i = 0; i < 5; i++) {
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
        ARRAY_TO_SHOW = articleModel.getArticlesByCategory(category);
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
        articleDOM.showArticles(ARRAY_TO_SHOW.slice(skip, skip + top));
    }

    return {
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