"use strict";
var articleModel = (function () {
    var mainCategory = ["Развлечения", "Политика", "Экономика", "Культура", "Бизнес", "Наука", "Спорт"];
    var ARTICLES = [
        {
            id: '2017-02-27T14:27:00',
            mainCategory: 'Политика',
            photo: 'https://cdn.pixabay.com/photo/2016/11/23/14/12/canyon-1853140__340.jpg',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2017-02-24 07:17:19'),
            author: 'Иванов Иван',
            content: 'Первая победа белорусской колманды в плей-офф КХЛ. Будем надеяться, что не последняя!!! Динамо - вперед!!!',
            tags: ['политика', 'экономика', 'культура', 'здоровье'],
            deleted: false
        },
        {
            id: '2017-02-28T13:00:00',
            mainCategory: 'Экономика',
            photo: 'https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539__340.jpg',
            title: 'Ярославский «Локомотив» победил в серии со счетом 4:1',
            summary: 'В 5-ом матче первого раунда плей-офф КХЛ Минское «Динамо» потерпело поражение от ярославского «Локомотива» и вылетело из борьбы за кубок',
            createdAt: new Date("2017-02-23 04:24:19"),
            author: 'Mikhail Chirich',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['здоровье'],
            deleted: false
        },
        {
            id: '2017-02-27T23:00:00',
            mainCategory: 'Развлечения',
            photo: 'https://cdn.pixabay.com/photo/2017/03/05/14/45/comic-style-2118785__340.jpg',
            title: 'Главный тренер "Барселоны" заявил о скором уходе из клуба',
            summary: 'Я не буду подписывать новый контракт с клубом. Подходящее время пришло, — сказал наставник.',
            createdAt: new Date('2017-02-22 17:17:19'),
            author: 'Гмырик Иван',
            content: 'Главный тренер «Барселоны» Луис Энрике заявил, что покинет клуб. 46-летний специалист доработает нынешний сезон с каталонским клубом, а летом покинет свой пост.',
            tags: ['культура'],
            deleted: false
        },
        {
            id: '2017-01-27T14:00:00',
            mainCategory: 'Бизнес',
            photo: 'https://cdn.pixabay.com/photo/2017/02/28/23/00/swan-2107052__340.jpg',
            title: 'Цепкало освобожден от должности директора Администрации ПВТ',
            summary: 'Валерий Цепкало освобожден от должности директора государственного учреждения «Администрация Парка высоких технологий».',
            createdAt: new Date('2017-02-21 07:29:19'),
            author: 'Атомович Протон',
            content: 'Соответствующее распоряжение президент Беларуси Александр Лукашенко подписал 2 марта. Цепкало возглавлял его с момента создания.',
            tags: ['общество'],
            deleted: false
        },
        {
            id: '2017-01-19T22:00:00',
            mainCategory: 'Культура',
            photo: 'https://cdn.pixabay.com/photo/2017/01/18/16/46/hong-kong-1990268__340.jpg',
            title: 'Не служил — не мужик? Анна Бонд об армии начистоту',
            summary: 'Нужно ли идти в армию, чтобы считаться мужчиной? И действительно ли мужиком можно стать только в казарме? Однозначного ответа на этот вопрос нет. ',
            createdAt: new Date('2017-02-19 10:17:19'),
            author: 'Анна Бонд',
            content: 'Одни говорят, что служить нужно обязательно, другие — что это потерянное время. Вообще никому ничего не должен и заставлять его не имеют права.',
            tags: ['спорт'],
            deleted: false
        },
        {
            id: '2017-01-21T23:00:00',
            mainCategory: 'Экономика',
            photo: 'https://cdn.pixabay.com/photo/2017/02/19/15/28/italy-2080072__340.jpg',
            title: 'Восемь перестроений за три минуты, а толку? Разбор регулярных опережений на МКАД',
            summary: ' За три минуты автор видео, укорявший белорусов в медлительности, перестроился восемь раз. Что он выиграл? Вопрос спорный.',
            createdAt: new Date('2017-01-21 14:17:19'),
            author: 'Прошин Евгений',
            content: '„ай-яй-яй, меня не пропустили, подрезали, моргнули, вот тебе за твое поведение“.  А ведь нужно всего лишь проявить уважение и не забывать в зеркала смотреть».',
            tags: ['экономика'],
            deleted: false
        },
        {
            id: '2016-11-12T23:00:00',
            mainCategory: 'Развлечения',
            photo: 'https://cdn.pixabay.com/photo/2016/06/09/23/46/war-1447021__340.jpg',
            title: '«Чистая биология. Детоксы и чистки чистят в первую очередь ваши кошельки»',
            summary: 'Наступила весна, и многие люди готовятся начать новую жизнь. А что может быть лучше, чем основательно «почиститься»? ',
            createdAt: new Date('2017-01-13 23:00:00'),
            author: 'Иванов Иван',
            content: 'Для ранних млекопитающих обоняние играло важную роль в выживании: они учились искать и оценивать пищу по запаху. Если что-то пахнет плохо, значит, этого нужно избегать.',
            tags: ['здоровье'],
            deleted: false
        },
        {
            id: '2017-03-01T23:00:00',
            mainCategory: 'Развлечения',
            photo: 'https://cdn.pixabay.com/photo/2017/01/18/16/35/crab-1990198__340.jpg',
            title: 'для BMW сегодня является старт продаж седьмого поколения BMW 5-Series',
            summary: 'Создатели говорят, что собрали в этой машине все лучшее, что есть у бренда.',
            createdAt: new Date('2017-01-01 23:00:00'),
            author: 'Противник МЕРСЕДЕС',
            content: 'Вслед за «Семеркой» бизнес-седан получил облегченную конструкцию с широким применением алюминия и высокопрочных сталей. По сравнению с предшественником машина «похудела» на центнер',
            tags: ['политика', 'культура', 'здоровье'],
            deleted: false
        },
        {
            id: '2017-03-02T23:00:00',
            mainCategory: 'Наука',
            photo: 'https://cdn.pixabay.com/photo/2017/01/16/19/54/turkey-1985086__340.jpg',
            title: 'Mercedes делает свои машины слегка спортивнее, чтобы приблизить их к BMW',
            summary: 'G30 оснастили новым поколением iDrive',
            createdAt: new Date('2016-11-02 23:00:00'),
            author: 'БМВ',
            content: 'В топовой комплектации функции навигации, телефона, информационно-развлекательные функции и функции автомобиля отображаются на 10,25-дюймовом цветном дисплее высокого разрешения. ',
            tags: ['общество', 'культура', 'здоровье'],
            deleted: false
        },
        {
            id: '2017-03-03T23:00:00',
            mainCategory: 'Экономика',
            photo: 'https://cdn.pixabay.com/photo/2016/12/01/18/15/hourglass-1875812__340.jpg',
            title: 'Фирменный head-up-дисплей BMW',
            summary: 'Фирменный head-up-дисплей BMW последнего поколения имеет увеличенную на 70%.',
            createdAt: new Date('2016-10-01 23:00:00'),
            author: 'Иванов Максим',
            content: ' На него выводятся дорожные знаки, списки телефонных контактов, название радиостанции, название музыкального трека, указания навигационной системы или предупреждения систем помощи водителю.',
            tags: ['политика', 'культура', 'здоровье'],
            deleted: false
        },
        {
            id: '2017-02-08T23:00:00',
            mainCategory: 'Культура',
            photo: 'https://cdn.pixabay.com/photo/2017/02/28/22/37/crocus-2107024__340.jpg',
            title: 'От метро ехать минут 15. А потом еще столько же идти по грязи',
            summary: 'Деревенские контрасты под Минском',
            createdAt: new Date('2016-09-18 23:00:00'),
            author: 'Игнатьев Иван',
            content: 'В Минске тесно. Город борется с заторами на Немиге, учится ездить по площади Бангалор и не занимать крайнюю левую полосу на МКАД.',
            tags: ['политика', 'здоровье'],
            deleted: false
        },
        {
            id: '2016-09-08T23:00:00',
            mainCategory: 'Развлечения',
            photo: 'https://cdn.pixabay.com/photo/2017/02/23/21/58/easter-eggs-2093315__340.jpg',
            title: 'Деревня — это не обязательно три дома и колодец где-то вдали от цивилизации.',
            summary: 'Вот, к примеру, Ратомка. Пять километров от Минска по молодечненской трассе, 15 минут от метро.',
            createdAt: new Date('2016-09-08 23:00:00'),
            author: 'Фелпс Холс',
            content: 'Здесь расположен Республиканский центр олимпийской подготовки конного спорта и коневодства, проводятся соревнования международного уровня.',
            tags: ['политика', 'общество', 'культура', 'здоровье'],
            deleted: false
        },
        {
            id: '2015-06-17T23:00:00',
            mainCategory: 'Культура',
            photo: 'https://cdn.pixabay.com/photo/2016/10/16/18/28/asters-1745959__340.jpg',
            title: 'В целом пугаться нечего',
            summary: 'До станции метро «Каменная Горка» на маршрутке ехать минут 10—15. ',
            createdAt: new Date('2016-06-17 23:00:00'),
            author: 'Иванов Аркадий',
            content: 'Минчане зачастую больше времени тратят. Компактные автобусы бегают между Ратомкой и городом каждые 40 минут, стоимость билета в одну сторону — 1,5 рубля. ',
            tags: ['политика', 'экономика', 'спорт', 'здоровье'],
            deleted: false
        },
        {
            id: '2017-02-24T23:00:00',
            mainCategory: 'Экономика',
            photo: 'https://cdn.pixabay.com/photo/2016/07/22/09/59/bio-1534494__340.jpg',
            title: 'Круглосуточная шаурменная, авторская кофейня и крафтовый бар.',
            summary: 'Девушка-тусовщица тестирует новые заведения Минска',
            createdAt: new Date('2016-04-24 23:00:00'),
            author: 'Высь Иван',
            content: 'В последние годы ресторанный мир Минска живет по принципу «Чем проще, тем лучше», оставив дорогущие места с белоснежными скатертями на столах в далеком прошлом',
            tags: ['политика', 'общество', 'культура', 'здоровье'],
            deleted: false
        },
        {
            id: '2014-07-07T23:00:00',
            mainCategory: 'Наука',
            photo: 'https://cdn.pixabay.com/photo/2015/09/03/08/04/child-920128__340.jpg',
            title: 'Бистро Gyros Grill на Коллекторной, 3',
            summary: 'Выбор ночных закусочных в Минске, несмотря на столичный статус, непозволительно узок',
            createdAt: new Date('2015-11-17 23:00:00'),
            author: 'Чепла Фан',
            content: 'Входим внутрь, и свежий весенний воздух сменяется запахом жареной курицы. Одежда потом еще долго пахла кухней — настоящая катастрофа для девушек.',
            tags: ['спорт', 'общество', 'культура', 'здоровье'],

        }
    ];

    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || ARTICLES.length;
        if (filterConfig) {
            return ARTICLES.filter(function (item) {
                if (item.deleted) {
                    return false;
                }
                if (filterConfig.author) {
                    if (item.author !== filterConfig.author) {
                        return false;
                    }
                }

                if (filterConfig.date) {
                    if (filterConfig.date.from) {
                        if (item.createdAt < filterConfig.date.from) {
                            return false;
                        }
                    }
                    if (filterConfig.date.to) {
                        if (item.createdAt > filterConfig.date.to) {
                            return false;
                        }
                    }
                }
                if (filterConfig.tags && !filterConfig.tags.every(function (fTag) {
                    return item.tags.some(function (tag) {
                        return tag === fTag;
                    })
                })) {
                    return false;
                }
                return true;
            }).slice(skip, skip + top);
        }
        else {
            return ARTICLES.filter(function (item) {
                if (!item.deleted) {
                    return true;
                }
            }).slice(skip, skip + top);
        }
    }

    function getArticlesByCategory(category) {
        if (category === 'Все') {
            return getArticles(0, ARTICLES.length);
        }
        else {
            return ARTICLES.filter(function (item) {
                if (!item.deleted && item.mainCategory === category) {
                    return true;
                }
            });
        }
    }

    function validateArticle(article) {
        if (!article || article.title.length === 0 || article.summary.length === 0 || article.content.length === 0) {
            return false;
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
            ARTICLES[index].deleted = true;
            fillLocalStorage();
            return true;
        }
        else {
            return false;
        }
    }

    function addArticle(article) {
        if (validateArticle(article)) {
            ARTICLES.unshift(article);
            fillLocalStorage();
            return true;
        } else {
            return false;
        }
    }

    function editArticle(id, article) {
        if (!validateArticle(article)) {
            return false;
        }
        var index = ARTICLES.findIndex(function (item) {
            return item.id === id;
        });
        if (index != -1) {
            if (article.mainCategory) {
                ARTICLES[index].mainCategory = article.mainCategory;
            }
            if (article.title && article.title.length > 0) {
                ARTICLES[index].title = article.title;
            }
            if (article.summary) {
                ARTICLES[index].summary = article.summary;
            }
            if (article.photo || article.photo.length === 0) {
                ARTICLES[index].photo = article.photo;
            }
            if (article.content && article.content.length > 0) {
                ARTICLES[index].content = article.content;
            }
            if (article.tags) {
                ARTICLES[index].tags = article.tags;
            }
            fillLocalStorage();
            return true;
        }
        else {
            return false;
        }
    }

    function getArticlesAmount() {
        return ARTICLES.length;
    }

    function updateArticles() {
        ARTICLES = JSON.parse(localStorage.getItem("articles"));
        ARTICLES.forEach(function (item) {
            item.createdAt = new Date(item.createdAt);
        });
    }

    function fillLocalStorage() {
        localStorage.setItem("articles", JSON.stringify(ARTICLES));
    }

    return {
        getArticles: getArticles,
        validateArticles: validateArticle,
        getArticle: getArticle,
        removeArticle: removeArticle,
        addArticle: addArticle,
        editArticle: editArticle,
        getArticlesAmount: getArticlesAmount,
        getArticlesByCategory: getArticlesByCategory,
        updateArticles: updateArticles,
        fillLocalStorage: fillLocalStorage
    };
}());