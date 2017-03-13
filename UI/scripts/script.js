var user = 'Mikhail Chirich';

var articleModel = (function () {
    var ARTICLES = [
        {
            id: '2017-02-27T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2016/11/23/14/12/canyon-1853140__340.jpg',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2017-02-28 07:17:19'),
            author: 'Иванов Иван',
            content: 'Первая победа белорусской колманды в плей-офф КХЛ. Будем надеяться, что не последняя!!! Динамо - вперед!!!',
            tags: ['политика', 'экономика', 'культура', 'здоровье']
        },
        {
            id: '2017-02-28T13:00:00',
            photo: 'https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539__340.jpg',
            title: 'Ярославский «Локомотив» победил в серии со счетом 4:1',
            summary: 'В 5-ом матче первого раунда плей-офф КХЛ Минское «Динамо» потерпело поражение от ярославского «Локомотива» и вылетело из борьбы за кубок',
            createdAt: new Date("2017-02-24 04:24:19"),
            author: 'Mikhail Chirich',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['здоровье']
        },
        {
            id: '2017-02-27T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2017/03/05/14/45/comic-style-2118785__340.jpg',
            title: 'Главный тренер "Барселоны" заявил о скором уходе из клуба',
            summary: 'Я не буду подписывать новый контракт с клубом. Подходящее время пришло, — сказал наставник.',
            createdAt: new Date('2017-02-02 17:17:19'),
            author: 'Гмырик Иван',
            content: 'Главный тренер «Барселоны» Луис Энрике заявил, что покинет клуб. 46-летний специалист доработает нынешний сезон с каталонским клубом, а летом покинет свой пост.',
            tags: ['культура']
        },
        {
            id: '2017-01-27T14:00:00',
            photo: 'https://cdn.pixabay.com/photo/2017/02/28/23/00/swan-2107052__340.jpg',
            title: 'Цепкало освобожден от должности директора Администрации ПВТ',
            summary: 'Валерий Цепкало освобожден от должности директора государственного учреждения «Администрация Парка высоких технологий».',
            createdAt: new Date('2017-01-28 07:29:19'),
            author: 'Атомович Протон',
            content: 'Соответствующее распоряжение президент Беларуси Александр Лукашенко подписал 2 марта. Цепкало возглавлял его с момента создания.',
            tags: ['общество']
        },
        {
            id: '2017-01-19T22:00:00',
            photo: 'https://cdn.pixabay.com/photo/2017/01/18/16/46/hong-kong-1990268__340.jpg',
            title: 'Не служил — не мужик? Анна Бонд об армии начистоту',
            summary: 'Нужно ли идти в армию, чтобы считаться мужчиной? И действительно ли мужиком можно стать только в казарме? Однозначного ответа на этот вопрос нет. ',
            createdAt: new Date('2016-01-28 10:17:19'),
            author: 'Анна Бонд',
            content: 'Одни говорят, что служить нужно обязательно, другие — что это потерянное время. Вообще никому ничего не должен и заставлять его не имеют права.',
            tags: ['спорт']
        },
        {
            id: '2017-01-21T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2017/02/19/15/28/italy-2080072__340.jpg',
            title: 'Восемь перестроений за три минуты, а толку? Разбор регулярных опережений на МКАД',
            summary: ' За три минуты автор видео, укорявший белорусов в медлительности, перестроился восемь раз. Что он выиграл? Вопрос спорный.',
            createdAt: new Date('2017-01-01 14:17:19'),
            author: 'Прошин Евгений',
            content: '„ай-яй-яй, меня не пропустили, подрезали, моргнули, вот тебе за твое поведение“.  А ведь нужно всего лишь проявить уважение и не забывать в зеркала смотреть».',
            tags: ['экономика']
        },
        {
            id: '2016-11-12T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2016/06/09/23/46/war-1447021__340.jpg',
            title: '«Чистая биология. Детоксы и чистки чистят в первую очередь ваши кошельки»',
            summary: 'Наступила весна, и многие люди готовятся начать новую жизнь. А что может быть лучше, чем основательно «почиститься»? ',
            createdAt: new Date('2016-11-12 23:00:00'),
            author: 'Иванов Иван',
            content: 'Для ранних млекопитающих обоняние играло важную роль в выживании: они учились искать и оценивать пищу по запаху. Если что-то пахнет плохо, значит, этого нужно избегать.',
            tags: ['здоровье']
        },
        {
            id: '2016-10-27T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2017/02/26/11/57/mountaineer-2100050__340.jpg',
            title: 'В Беларуси стартовали продажи нового BMW 5-Series.',
            summary: 'Первый покупатель — олимпийский чемпион Владислав Гончаров',
            createdAt: new Date('2016-10-27 23:00:00'),
            author: 'Артурчик Артур',
            content: 'Подписание контракта с BMW Motorrad означает, что в автоцентре стартуют продажи и обслуживание полного модельного ряда мотоциклов BMW, а также одежды, аксессуаров и дополнительного оборудования. ',
            tags: ['политика', 'экономика', 'культура', 'здоровье']
        },
        {
            id: '2017-03-01T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2017/01/18/16/35/crab-1990198__340.jpg',
            title: 'для BMW сегодня является старт продаж седьмого поколения BMW 5-Series',
            summary: 'Создатели говорят, что собрали в этой машине все лучшее, что есть у бренда.',
            createdAt: new Date('2016-03-01 23:00:00'),
            author: 'Противник МЕРСЕДЕС',
            content: 'Вслед за «Семеркой» бизнес-седан получил облегченную конструкцию с широким применением алюминия и высокопрочных сталей. По сравнению с предшественником машина «похудела» на центнер',
            tags: ['политика', 'культура', 'здоровье']
        },
        {
            id: '2017-03-02T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2017/01/16/19/54/turkey-1985086__340.jpg',
            title: 'Mercedes делает свои машины слегка спортивнее, чтобы приблизить их к BMW',
            summary: 'G30 оснастили новым поколением iDrive',
            createdAt: new Date('2016-02-02 23:00:00'),
            author: 'БМВ',
            content: 'В топовой комплектации функции навигации, телефона, информационно-развлекательные функции и функции автомобиля отображаются на 10,25-дюймовом цветном дисплее высокого разрешения. ',
            tags: ['общество', 'культура', 'здоровье']
        },
        {
            id: '2017-03-03T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2016/12/01/18/15/hourglass-1875812__340.jpg',
            title: 'Фирменный head-up-дисплей BMW',
            summary: 'Фирменный head-up-дисплей BMW последнего поколения имеет увеличенную на 70%.',
            createdAt: new Date('2016-02-01 23:00:00'),
            author: 'Иванов Максим',
            content: ' На него выводятся дорожные знаки, списки телефонных контактов, название радиостанции, название музыкального трека, указания навигационной системы или предупреждения систем помощи водителю.',
            tags: ['политика', 'культура', 'здоровье']
        },
        {
            id: '2017-02-08T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2017/02/28/22/37/crocus-2107024__340.jpg',
            title: 'От метро ехать минут 15. А потом еще столько же идти по грязи',
            summary: 'Деревенские контрасты под Минском',
            createdAt: new Date('2016-01-18 23:00:00'),
            author: 'Игнатьев Иван',
            content: 'В Минске тесно. Город борется с заторами на Немиге, учится ездить по площади Бангалор и не занимать крайнюю левую полосу на МКАД.',
            tags: ['политика', 'здоровье']
        },
        {
            id: '2016-09-08T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2017/02/23/21/58/easter-eggs-2093315__340.jpg',
            title: 'Деревня — это не обязательно три дома и колодец где-то вдали от цивилизации.',
            summary: 'Вот, к примеру, Ратомка. Пять километров от Минска по молодечненской трассе, 15 минут от метро.',
            createdAt: new Date('2015-09-08 23:00:00'),
            author: 'Фелпс Холс',
            content: 'Здесь расположен Республиканский центр олимпийской подготовки конного спорта и коневодства, проводятся соревнования международного уровня.',
            tags: ['политика', 'общество', 'культура', 'здоровье']
        },
        {
            id: '2015-06-17T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2016/10/16/18/28/asters-1745959__340.jpg',
            title: 'В целом пугаться нечего',
            summary: 'До станции метро «Каменная Горка» на маршрутке ехать минут 10—15. ',
            createdAt: new Date('2015-06-17 23:00:00'),
            author: 'Иванов Аркадий',
            content: 'Минчане зачастую больше времени тратят. Компактные автобусы бегают между Ратомкой и городом каждые 40 минут, стоимость билета в одну сторону — 1,5 рубля. ',
            tags: ['политика', 'экономика', 'спорт', 'здоровье']
        },
        {
            id: '2017-02-24T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2016/07/22/09/59/bio-1534494__340.jpg',
            title: 'Круглосуточная шаурменная, авторская кофейня и крафтовый бар.',
            summary: 'Девушка-тусовщица тестирует новые заведения Минска',
            createdAt: new Date('2015-02-24 23:00:00'),
            author: 'Высь Иван',
            content: 'В последние годы ресторанный мир Минска живет по принципу «Чем проще, тем лучше», оставив дорогущие места с белоснежными скатертями на столах в далеком прошлом',
            tags: ['политика', 'общество', 'культура', 'здоровье']
        },
        {
            id: '2014-07-07T23:00:00',
            photo: 'https://cdn.pixabay.com/photo/2015/09/03/08/04/child-920128__340.jpg',
            title: 'Бистро Gyros Grill на Коллекторной, 3',
            summary: 'Выбор ночных закусочных в Минске, несмотря на столичный статус, непозволительно узок',
            createdAt: new Date('2014-07-07 23:00:00'),
            author: 'Чепла Фан',
            content: 'Входим внутрь, и свежий весенний воздух сменяется запахом жареной курицы. Одежда потом еще долго пахла кухней — настоящая катастрофа для девушек.',
            tags: ['спорт', 'общество', 'культура', 'здоровье']
        }
    ];
    var AUTHORS;
    var TAGS = ['политика', 'экономика', 'спорт', 'общество', 'культура', 'здоровье'];

    function fillAuthors() {
        ARTICLES.forEach(function (item) {
            AUTHORS.push(item.author);
        })
    }

    function sortArticles() {
        ARTICLES.sort(function (a, b) {
            return b.createdAt.getTime() - a.createdAt.getTime();
        });
    }

    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 10;
        if (filterConfig) {
            return ARTICLES.filter(function (item) {
                if (filterConfig.author) {
                    if (item.author !== filterConfig.author) {
                        return false;
                    }
                }
                if (filterConfig.date) {
                    if (filterConfig.date.from) {
                        if (item.createdAt.getTime() < filterConfig.date.from.getTime()) {
                            return false;
                        }
                    }
                    if (filterConfig.date.to) {
                        if (item.createdAt.getTime() > filterConfig.date.to.getTime()) {
                            return false;
                        }
                    }
                }
                if (filterConfig.tags) {
                    for (var i = 0; i < filterConfig.tags.length; i++) {
                        if (item.tags.indexOf(filterConfig.tags[i]) === -1) {
                            return false;
                        }
                    }
                }
                return true;
            }).slice(skip, skip + top);
        }
        else {
            return ARTICLES.slice(skip, skip + top);
        }
    }

    function validateArticle(article) {
        if (!article) {
            return false;
        }
        if ((typeof article.title !== 'string') || (article.title.length > 100) || (article.title.length === 0)) {
            return false;
        }
        if ((typeof article.summary !== 'string') || (article.summary.length > 200)) {
            return false;
        }
        if ((typeof article.content !== 'string') || (article.content.length === 0)) {
            return false;
        }
        if ((!article.tags) || (article.tags.length === 0) || (article.tags.length > 5)) {
            return false;
        }
        for (var i = 0; i < article.tags.length; i++) {
            if (TAGS.indexOf(article.tags[i]) === -1) {
                return false;
            }
        }
        return true;
    }

    function getArticle(id) {
        return ARTICLES.find(function (item) {
            return item.id === id;
        });
    }

    function removeArticle(id) {
        var index = ARTICLES.findIndex(function (item) {
            return item.id === id;
        });
        if (index != -1) {
            ARTICLES.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }

    function addArticle(article) {
        if (validateArticle(article)) {
            ARTICLES.unshift(article);
            sortArticles();
            return true;
        } else {
            return false;
        }
    }

    function editArticle(id, article) {
        if (!article || article.author || article.createdAt || article.id) {
            return false;
        }
        var index = ARTICLES.findIndex(function (item) {
            return item.id === id;
        });
        if (index != -1) {
            if (article.title) {
                if ((typeof article.title === 'string') && (article.title.length <= 100) && (article.title.length > 0)) {
                    ARTICLES[index].title = article.title;
                }
            }
            if (article.summary) {
                if ((typeof article.summary === 'string') && (article.summary.length <= 200)) {
                    ARTICLES[index].summary = article.summary;
                }
            }
            if (article.content) {
                if ((typeof article.content === 'string') && (article.content.length !== 0)) {
                    ARTICLES[index].content = article.content;
                }
            }
            if (article.tags) {
                if ((article.tags.length !== 0) && (article.tags.length <= 5)) {
                    for (var i = 0; i < article.tags.length; i++) {
                        if (TAGS.indexOf(article.tags[i]) === -1) {
                            return false;
                        }
                    }
                    ARTICLES[index].tags = article.tags;
                }
                else {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }

    function addTags(id, tag) {
        if (!id || !tag) {
            return false;
        }
        for (var i = 0; i < tag.length; i++) {
            if (TAGS.indexOf(tag[i]) === -1) {
                return false;
            }
        }
        var index = ARTICLES.findIndex(function (item) {
            return item.id === id;
        });
        if (index !== -1) {
            var tagsArray = Array.from(new Set(ARTICLES[index].tags.concat(tag)));
            if ((tagsArray.length <= 5) && (tagsArray.length > 0)) {
                ARTICLES[index].tags = tagsArray;
                return true;
            }
            return false;
        }
        else {
            return false;
        }
    }

    function removeTags(id, tag) {
        if (!id || !tag || tag.length === 0 || tag.length > 5) {
            return false;
        }
        for (var i = 0; i < tag.length; i++) {
            if (TAGS.indexOf(tag[i]) === -1) {
                return false;
            }
        }
        var index = ARTICLES.findIndex(function (item) {
            return item.id === id;
        });
        if (index != -1) {
            var tagsArray = ARTICLES[index].tags.filter(function (item) {
                for (var i = 0; i < tag.length; i++) {
                    if (tag.indexOf(item) === -1) {
                        return true;
                    }
                }
            });
            if (tagsArray.length !== 0) {
                ARTICLES[index].tags = tagsArray;
                return true;
            }
            return false;
        }
        return false;
    }

    return {
        getArticles: getArticles,
        validateArticles: validateArticle,
        getArticle: getArticle,
        removeArticle: removeArticle,
        addArticle: addArticle,
        editArticle: editArticle,
        addTags: addTags,
        removeTags: removeTags,
        fillAuthors: fillAuthors
    };
}());

var articleDOM = (function () {
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article');
        ARTICLE_LIST_NODE = document.querySelector('#main-page');
    }

    function checkUser(user) {
        var articles = document.getElementsByClassName('addition-buttons');
        if (user) {
            document.getElementsByClassName('log-in')[0].className += ' display-none';
            document.getElementsByClassName('log-out display-none')[0].className = 'log-out';
            document.getElementsByClassName('name')[0].textContent = user;
            for (var i = 0; i < articles.length; i++) {
                articles[i].style.display = 'block';
            }
        }
        else {
            document.getElementsByClassName('log-out')[0].className += ' display-none';
            document.getElementsByClassName('log-in display-none').className = 'log-in';
            for (i = 0; i < articles.length; i++) {
                articles[i].style.display = 'none';
            }
        }
    }

    function showArticles(articles) {
        removeArticles();
        var articlesNodes = renderArticles(articles);
        articlesNodes.forEach(function (node) {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function addArticle(article) {
        var newArticle = renderArticle(article);
        var amount = ARTICLE_LIST_NODE.childNodes.length;
        console.log(amount);
        if (newArticle !== false) {
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
            newArticle.querySelector('.content-photo').setAttribute('src', article.photo);
            newArticle.querySelector('.content-title').textContent = article.title;
            newArticle.querySelector('.content-summary').textContent = article.summary;
            newArticle.querySelector('.content-text').textContent = article.content;
            newArticle.querySelector('.content-tags').textContent = article.tags;
            return true;
        }
        return false;
    }

    function addTags(id, tag) {
        var node = document.getElementById(id);
        if (node) {
            var tagsArray = Array.from(new Set(node.querySelector('.content-tags').textContent.split(', ').concat(tag)));
            if ((tagsArray.length <= 5) && (tagsArray.length > 0)) {
                node.querySelector('.content-tags').textContent = tagsArray.join(', ');
                return true;
            }
            return false;
        }
        return false;
    }

    function removeTags(id, tag) {
        var node = document.getElementById(id);
        var tagsArray = node.querySelector('.content-tags').textContent.split(', ').filter(function (item) {
            for (var i = 0; i < tag.length; i++) {
                if (tag.indexOf(item) === -1) {
                    return true;
                }
            }
        });
        console.log(tagsArray);
        if (tagsArray.length !== 0) {
            node.querySelector('.content-tags').textContent = tagsArray.join(', ');
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
        template.content.querySelector('.content-photo').setAttribute('src', article.photo);
        template.content.querySelector('.content-title').textContent = article.title;
        template.content.querySelector('.content-summary').textContent = article.summary;
        template.content.querySelector('.content-text').textContent = article.content;
        template.content.querySelector('.content-tags').textContent = article.tags.join(', ');
        template.content.querySelector('.content-creater').textContent = article.author;
        template.content.querySelector('.content-date').textContent = formatDate(article.createdAt);
        return template.content.querySelector('.content').cloneNode(true);
    }

    function formatDate(d) {
        return d.getFullYear() + '-' + ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-' +
            ('0' + d.getUTCDate()).slice(-2) + ' ' + ('0' + d.getUTCHours()).slice(-2) +
            ':' + ('0' + d.getUTCMinutes()).slice(-2) + ':' + ('0' + d.getUTCSeconds()).slice(-2);
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
        removeTags: removeTags
    };
}());

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    articleDOM.init();
    printArticles(0, 10);
    editArticle('2017-02-28T13:00:00', {
        photo: 'https://cdn.pixabay.com/photo/2017/02/28/22/37/crocus-2107024__340.jpg',
        title: 'От метро ехать минут 15. А потом еще столько же идти по грязи',
        summary: 'Деревенские контрасты под Минском',
        content: 'В Минске тесно. Город борется с заторами на Немиге, учится ездить по площади Бангалор и не занимать крайнюю левую полосу на МКАД.',
        tags: ['политика', 'здоровье']
    });
    addArticle({
        id: '2014-07-07T23:00:00',
        photo: 'https://cdn.pixabay.com/photo/2015/09/03/08/04/child-920128__340.jpg',
        title: 'Бистро Gyros Grill на Коллекторной, 3',
        summary: 'Выбор ночных закусочных в Минске, несмотря на столичный статус, непозволительно узок',
        createdAt: new Date('2014-07-07 23:00:00'),
        author: 'Чепла Фан',
        content: 'Входим внутрь, и свежий весенний воздух сменяется запахом жареной курицы. Одежда потом еще долго пахла кухней — настоящая катастрофа для девушек.',
        tags: ['спорт', 'общество', 'культура', 'здоровье']
    });
    removeArticle('2017-01-27T14:00:00');
    addTags('2017-02-27T23:00:00', ['спорт', 'общество']);
    addTags('2017-02-27T23:00:00', ['спорт']);
    removeTags('2017-02-27T23:00:00', ['политика', 'экономика', 'спорт']);
    checkUser(user);
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

