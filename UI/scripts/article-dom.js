var user = 'Mikhail Chirich'
var articleDOM = (function () {
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article');
        ARTICLE_LIST_NODE = document.querySelector('#articles-wall');
    }
    /*
        function login() {
            var loginForm = document.getElementsByName("loginForm")[0];
            console.log(loginForm);
        }
    */
    function checkUser(user) {
        var articles = document.getElementsByClassName('addition-buttons');
        var login = document.getElementsByClassName('log-in')[0];
        var logout = document.getElementsByClassName('log-out')[0];
        if (user) {
            login.classList.add('display-none');
            logout.classList.remove('display-none');
            document.getElementsByClassName('user-name')[0].textContent = user;
            for (var i = 0; i < articles.length; i++) {
                articles[i].classList.remove('display-none');
            }
        }
        else {
            logout.classList.add('display-none');
            login.classList.remove('display-none');
            for (i = 0; i < articles.length; i++) {
                articles[i].classList.add('display-none');
            }
        }
    }

    function showArticles(articles) {
        removeArticles();
        var articlesNodes = renderArticles(articles);
        var amount = ARTICLE_LIST_NODE.childNodes.length;
        articlesNodes.forEach(function (node) {
            if (amount !== 0) {
                ARTICLE_LIST_NODE.insertBefore(node, ARTICLE_LIST_NODE.childNodes[0]);
                return true;
            } else {
                ARTICLE_LIST_NODE.appendChild(node);
                return true;
            }
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
            newArticle.querySelector('.content').style.background = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + article.photo + "') no-repeat";;
            newArticle.querySelector('.content-title').textContent = article.title;
            newArticle.querySelector('.content-summary').textContent = article.summary;
            newArticle.querySelector('.content-text').textContent = article.content;
            newArticle.querySelector('.content-tags').textContent = article.tags;
            return true;
        }
        return false;
    }

    function addTags(id, tags) {
        var node = document.getElementById(id);
        if (node) {
            var tagsArray = Array.from(new Set(node.querySelector('.content-tags').textContent.split(' ').concat(tags)));
            if ((tagsArray.length <= 5) && (tagsArray.length > 0)) {
                node.querySelector('.content-tags').textContent = tagsArray.join(' ');
                return true;
            }
            return false;
        }
        return false;
    }

    function removeTags(id, tags) {
        var node = document.getElementById(id);
        var tagsArray = node.querySelector('.content-tags').textContent.split(' ').filter(function (item) {
            tags.forEach(function (tag) {
                if (tag.indexOf(item) === -1) {
                    return true;
                }
            });
        });
        if (tagsArray.length !== 0) {
            node.querySelector('.content-tags').textContent = tagsArray.join(' ');
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
        template.content.querySelector('.content-main-category').textContent = article.main_category;
        template.content.querySelector('.content-title').textContent = article.title;
        template.content.querySelector('.content-tags').textContent = article.tags.join(' ');
        template.content.querySelector('.content-creator').textContent = article.author;
        template.content.querySelector('.content-date').textContent = formatDate(article.createdAt);
        return template.content.querySelector('.content').cloneNode(true);
    }

    function formatDate(d) {
        return d.getFullYear() + '-' + ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-' +
            ('0' + d.getUTCDate()).slice(-2) + ' ' + ('0' + d.getUTCHours()).slice(-2) +
            ':' + ('0' + d.getUTCMinutes()).slice(-2) + ':' + ('0' + d.getUTCSeconds()).slice(-2);
    }

    function show_filter() {
        showBlock('dropdown-filter');
    }

    function show_menu() {
        showBlock('dropdown-menu');
    }

    function show_search() {
        showBlock('dropdown-search');
    }

    function showBlock(id) {
        var block = document.getElementById(id);
        if (block.className.endsWith("display-none")) {
            block.classList.remove("display-none");
        }
        else {
            block.classList.add("display-none");
        }
    }

    return {
        init: init,
        showArticles: showArticles,
        addArticle: addArticle,
        removeArticle: removeArticle,
        editArticle: editArticle,
        removeArticles: removeArticles,
        checkUser: checkUser,
        addTags: addTags,
        removeTags: removeTags,
        show_filter: show_filter,
        show_menu: show_menu,
        show_search: show_search,
        //login: login
    };
}());