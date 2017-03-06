var articles = [
    {
        id: '1',
        title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
        summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
        createdAt: new Date('2017-02-27T23:00:00'),
        author: 'Иванов Иван',
        content: 'Гостоменты.',
        tags: ['политика', 'экономика', 'культура', 'здоровье']
    },
    {
        id: '2',
        title: 'Ярославский «Локомотив» победил в серии со счетом 4:1',
        summary: 'В 5-ом матче первого раунда плей-офф КХЛ Минское «Динамо» потерпело поражение от ярославского «Локомотива» и вылетело из борьбы за кубок',
        createdAt: new Date('2017-02-28T13:00:00'),
        author: 'Mikhail Chirich',
        content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
        tags: ['здоровье']
    },
    {
        id: '3',
        title: 'Главный тренер "Барселоны" заявил о скором уходе из клуба',
        summary: 'Я не буду подписывать новый контракт с клубом. Подходящее время пришло, — сказал наставник.',
        createdAt: new Date('2017-02-27T23:00:00'),
        author: 'Гмырик Иван',
        content: 'Главный тренер «Барселоны» Луис Энрике заявил, что покинет клуб. 46-летний специалист доработает нынешний сезон с каталонским клубом, а летом покинет свой пост.',
        tags: ['культура']
    },
    {
        id: '4',
        title: 'Цепкало освобожден от должности директора Администрации ПВТ',
        summary: 'Валерий Цепкало освобожден от должности директора государственного учреждения «Администрация Парка высоких технологий».',
        createdAt: new Date('2017-01-27T14:00:00'),
        author: 'Атомович Протон',
        content: 'Соответствующее распоряжение президент Беларуси Александр Лукашенко подписал 2 марта. Цепкало возглавлял его с момента создания.',
        tags: ['общество']
    },
    {
        id: '5',
        title: 'Не служил — не мужик? Анна Бонд об армии начистоту',
        summary: 'Нужно ли идти в армию, чтобы считаться мужчиной? И действительно ли мужиком можно стать только в казарме? Однозначного ответа на этот вопрос нет. ',
        createdAt: new Date('2017-01-19T22:00:00'),
        author: 'Анна Бонд',
        content: 'Одни говорят, что служить нужно обязательно, другие — что это потерянное время. Вообще никому ничего не должен и заставлять его не имеют права.',
        tags: ['спорт']
    },
    {
        id: '6',
        title: 'Восемь перестроений за три минуты, а толку? Разбор регулярных опережений на МКАД',
        summary: ' За три минуты автор видео, укорявший белорусов в медлительности, перестроился восемь раз. Что он выиграл? Вопрос спорный.',
        createdAt: new Date('2017-01-21T23:00:00'),
        author: 'Прошин Евгений',
        content: '„ай-яй-яй, меня не пропустили, подрезали, моргнули, вот тебе за твое поведение“.  А ведь нужно всего лишь проявить уважение и не забывать в зеркала смотреть».',
        tags: ['экономика']
    },
    {
        id: '7',
        title: '«Чистая биология. Детоксы и чистки чистят в первую очередь ваши кошельки»',
        summary: 'Наступила весна, и многие люди готовятся начать новую жизнь. А что может быть лучше, чем основательно «почиститься»? ',
        createdAt: new Date('2016-11-12T23:00:00'),
        author: 'Иванов Иван',
        content: 'Для ранних млекопитающих обоняние играло важную роль в выживании: они учились искать и оценивать пищу по запаху. Если что-то пахнет плохо, значит, этого нужно избегать.',
        tags: ['здоровье']
    },
    {
        id: '8',
        title: 'В Беларуси стартовали продажи нового BMW 5-Series.',
        summary: 'Первый покупатель — олимпийский чемпион Владислав Гончаров',
        createdAt: new Date('2016-10-27T23:00:00'),
        author: 'Артурчик Артур',
        content: 'Подписание контракта с BMW Motorrad означает, что в автоцентре стартуют продажи и обслуживание полного модельного ряда мотоциклов BMW, а также одежды, аксессуаров и дополнительного оборудования. ',
        tags: ['политика', 'экономика', 'культура', 'здоровье']
    },
    {
        id: '9',
        title: 'для BMW сегодня является старт продаж седьмого поколения BMW 5-Series',
        summary: 'Создатели говорят, что собрали в этой машине все лучшее, что есть у бренда.',
        createdAt: new Date('2017-03-01T23:00:00'),
        author: 'Противник МЕРСЕДЕС',
        content: 'Вслед за «Семеркой» бизнес-седан получил облегченную конструкцию с широким применением алюминия и высокопрочных сталей. По сравнению с предшественником машина «похудела» на центнер',
        tags: ['политика', 'культура', 'здоровье']
    },
    {
        id: '10',
        title: 'Mercedes делает свои машины слегка спортивнее, чтобы приблизить их к BMW',
        summary: 'G30 оснастили новым поколением iDrive',
        createdAt: new Date('2017-03-02T23:00:00'),
        author: 'БМВ',
        content: 'В топовой комплектации функции навигации, телефона, информационно-развлекательные функции и функции автомобиля отображаются на 10,25-дюймовом цветном дисплее высокого разрешения. ',
        tags: ['общество', 'культура', 'здоровье']
    },
    {
        id: '11',
        title: 'Фирменный head-up-дисплей BMW',
        summary: 'Фирменный head-up-дисплей BMW последнего поколения имеет увеличенную на 70%.',
        createdAt: new Date('2017-03-03T23:00:00'),
        author: 'Иванов Максим',
        content: ' На него выводятся дорожные знаки, списки телефонных контактов, название радиостанции, название музыкального трека, указания навигационной системы или предупреждения систем помощи водителю.',
        tags: ['политика', 'культура', 'здоровье']
    },
    {
        id: '12',
        title: 'Жена позвонила в ГАИ и рассказала, что ее муж сел за руль без прав.',
        summary: 'Супруги находятся на грани развода',
        createdAt: new Date('2017-03-04T23:00:00'),
        author: 'Трубкин Иван',
        content: 'Можно предположить, что у супругов натянутые отношения. Не вдаваясь в подробности, муж и жена даже живут порознь. Но друг о друге не забывают.',
        tags: ['политика', 'экономика']
    },
    {
        id: '13',
        title: 'в России создали лекарство от всех видов рака',
        summary: 'Наш препарат имеет рабочее название „Белок теплового шока',
        createdAt: new Date('2017-03-04T23:00:00'),
        author: 'Аптека России',
        content: 'Это молекула, которая синтезируется любыми клетками организма человека в ответ на различные стрессорные воздействия',
        tags: ['спорт', 'здоровье']
    },
    {
        id: '14',
        title: 'Энтузиаст собрал часы на Windows 98',
        summary: 'Умные часы не превратились в «the next big thing», хотя кто-то нашел в них вполне полезные девайсы. ',
        createdAt: new Date('2017-01-20T23:00:00'),
        author: 'Иванов Петр',
        content: 'Часы получились немного большими. Они работают на «железе» Raspberry Pi. В качестве концепта он выбрал наручные часы из фантастических кинофильмов 80—90-х годов прошлого века.',
        tags: ['общество', 'культура', 'здоровье']
    },
    {
        id: '15',
        title: 'Мы даже хуже бомжей',
        summary: 'Белоруска, прожившая в общежитии 25 лет, осталась с двумя дочерьми на улице без «прописки»',
        createdAt: new Date('2017-02-13T23:00:00'),
        author: 'Петров Генадий',
        content: 'Ольге Снапковой, несмотря на обладание полезными навыками маляра-штукатура и сотни сделанных за жизнь ремонтов. ',
        tags: ['политика', 'общество', 'культура']
    },
    {
        id: '16',
        title: 'Ремонт - это просто',
        summary: 'укладываем ламинат по правилам',
        createdAt: new Date('2017-02-18T23:00:00'),
        author: 'Mikhail Chirich',
        content: 'Учится новому никогда не поздно. Особенно, если хочешь сэкономить и готов приложить для этого усилияЧерпак',
        tags: ['политика', 'экономика', 'спорт']
    },
    {
        id: '17',
        title: 'От метро ехать минут 15. А потом еще столько же идти по грязи',
        summary: 'Деревенские контрасты под Минском',
        createdAt: new Date('2017-02-08T23:00:00'),
        author: 'Игнатьев Иван',
        content: 'В Минске тесно. Город борется с заторами на Немиге, учится ездить по площади Бангалор и не занимать крайнюю левую полосу на МКАД.',
        tags: ['политика', 'здоровье']
    },
    {
        id: '18',
        title: 'Деревня — это не обязательно три дома и колодец где-то вдали от цивилизации.',
        summary: 'Вот, к примеру, Ратомка. Пять километров от Минска по молодечненской трассе, 15 минут от метро.',
        createdAt: new Date('2016-09-08T23:00:00'),
        author: 'Фелпс Холс',
        content: 'Здесь расположен Республиканский центр олимпийской подготовки конного спорта и коневодства, проводятся соревнования международного уровня.',
        tags: ['политика', 'общество', 'культура', 'здоровье']
    },
    {
        id: '19',
        title: 'В целом пугаться нечего',
        summary: 'До станции метро «Каменная Горка» на маршрутке ехать минут 10—15. ',
        createdAt: new Date('2015-06-17T23:00:00'),
        author: 'Иванов Аркадий',
        content: 'Минчане зачастую больше времени тратят. Компактные автобусы бегают между Ратомкой и городом каждые 40 минут, стоимость билета в одну сторону — 1,5 рубля. ',
        tags: ['политика', 'экономика', 'спорт', 'здоровье']
    },
    {
        id: '20',
        title: 'Круглосуточная шаурменная, авторская кофейня и крафтовый бар.',
        summary: 'Девушка-тусовщица тестирует новые заведения Минска',
        createdAt: new Date('2017-02-24T23:00:00'),
        author: 'Высь Иван',
        content: 'В последние годы ресторанный мир Минска живет по принципу «Чем проще, тем лучше», оставив дорогущие места с белоснежными скатертями на столах в далеком прошлом',
        tags: ['политика', 'общество', 'культура', 'здоровье']
    },
    {
        id: '21',
        title: 'Бистро Gyros Grill на Коллекторной, 3',
        summary: 'Выбор ночных закусочных в Минске, несмотря на столичный статус, непозволительно узок',
        createdAt: new Date('2014-07-07T23:00:00'),
        author: 'Чепла Фан',
        content: 'Входим внутрь, и свежий весенний воздух сменяется запахом жареной курицы. Одежда потом еще долго пахла кухней — настоящая катастрофа для девушек.',
        tags: ['спорт', 'общество', 'культура', 'здоровье']
    }
];
var tags = ['политика', 'экономика', 'спорт', 'общество', 'культура', 'здоровье'];

function getArticles(skip, top, filterConfig) {
    skip = skip || 0;
    top = top || 10;
    if (filterConfig) {
        return articles.filter(function (item) {
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
        return articles.slice(skip, skip + top);
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
        if (tags.indexOf(article.tags[i]) === -1) {
            return false;
        }
    }
    return true;
}
function getArticle(id) {
    return articles.find(function (item) {
        return item.id === id;
    });
}
function removeArticle(id) {
    var index = articles.findIndex(function (item) {
        return item.id === id;
    });
    if (index != -1) {
        articles.splice(index, 1);
        return true;
    }
    else {
        return false;
    }
}
function addArticle(article) {
    if (validateArticle(article)) {
        articles.push(article);
        return true;
    }
    return false;
}
function editArticle(id, article) {
    if (!article || article.author || article.createdAt || article.id) {
        return false;
    }
    var index = articles.findIndex(function (item) {
        return item.id === id;
    });
    if (index != -1) {
        if (article.title) {
            if ((typeof article.title === 'string') && (article.title.length <= 100) && (article.title.length > 0)) {
                articles[index].title = article.title;
            }
        }
        if (article.summary) {
            if ((typeof article.summary === 'string') && (article.summary.length <= 200)) {
                articles[index].summary = article.summary;
            }
        }
        if (article.content) {
            if ((typeof article.content === 'string') && (article.content.length !== 0)) {
                articles[index].content = article.content;
            }
        }
        if (article.tags) {
            if ((article.tags.length !== 0) && (article.tags.length <= 5)) {
                for (var i = 0; i < article.tags.length; i++) {
                    if (tags.indexOf(article.tags[i]) === -1) {
                        return false;
                    }
                }
                articles[index].tags = article.tags;
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
        if (tags.indexOf(tag[i]) === -1) {
            return false;
        }
    }
    var index = articles.findIndex(function (item) {
        return item.id === id;
    });
    if (index !== -1) {
        var tagsArray = Array.from(new Set(articles[index].tags.concat(tag)));
        if ((tagsArray.length <= 5) && (tagsArray.length > 0)) {
            articles[index].tags = tagsArray;
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
        if (tags.indexOf(tag[i]) === -1) {
            return false;
        }
    }
    var index = articles.findIndex(function (item) {
        return item.id === id;
    });
    if (index != -1) {
        var tagsArray = articles[index].tags.filter(function (item) {
            for (var i = 0; i < tag.length; i++) {
                if (tag.indexOf(item) === -1) {
                    return true;
                }
            }
        });
        if (tagsArray.length !== 0) {
            articles[index].tags = tagsArray;
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

console.log('Testing: getArticle()');
console.log(getArticle());
console.log(getArticle('5'));
console.log(getArticle('100'));
console.log(getArticle(true));
console.log(getArticle(42));

console.log('Testing: getArticles()');
console.log(getArticles());
console.log(getArticles(0, 5));
console.log(getArticles('4', true));
console.log(getArticles(0, 10, {author: 'Mikhail Chirich'}));
console.log(getArticles(0, 10, {tags: ['политика', 'экономика', 'спорт']}));
console.log(getArticles(0, 10, {author: 'Mikhail Chirich', tags: ['политика', 'экономика', 'спорт']}));
console.log(getArticles(0, 10, {tags: ['ошибка', 'экономика', 'спорт']}));
console.log(getArticles(0, 10, {tags: [undefined, 'экономика', 'спорт']}));
console.log(getArticles(0, 10, {date: {from: new Date('2017')}}));
console.log(getArticles(0, 10, {date: {from: new Date('2014'), to: new Date('2016')}}));
console.log(getArticles(0, 10, {date: {to: new Date('2017')}}));
console.log(getArticles(2, 10, {date: {to: new Date('2017')}}));

console.log('Testing: addArticle()');
console.log(addArticle());
console.log(addArticle({
    id: '100',
    title: 'Ярославский «Локомотив» победил в серии со счетом 4:1',
    summary: 'В 5-ом матче первого раунда плей-офф КХЛ Минское «Динамо» потерпело поражение от ярославского «Локомотива» и вылетело из борьбы за кубок',
    createdAt: new Date('2017-05-28T13:00:00'),
    author: 'Mikhail Chirich',
    content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
    tags: ['здоровье']
}));
console.log(addArticle({
    id: '-15',
    summary: 'В 5-ом матче первого раунда плей-офф КХЛ Минское «Динамо» потерпело поражение от ярославского «Локомотива» и вылетело из борьбы за кубок',
    createdAt: new Date('2017-02-28T13:00:00'),
    author: 'Mikhail Chirich',
    content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
    tags: ['здоровье']
}));
console.log(addArticle({id: '100',
    title: 'Ярославский «Локомотив» победил в серии со счетом 4:1',
    summary: 'В 5-ом матfcvbaslkjcblskjdb cijbdsailhcbslahdbcasjldvcljdvscljvscljavsdbhasckjbask;jcbskj;dbc;kjashilabxhc;lsesilufblsidhfiuashbk;fjsче первого раунда плей-офф КХЛ Минское «Динамо» потерпело поражение от ярославского «Локомотива» и вылетело из борьбы за кубок',
    createdAt: new Date('2017-05-28T13:00:00'),
    author: 'Mikhail Chirich',
    content: 'Гости создали больше опасных моfxcghbvknml,nbcgfxcghjkml,lnkbvhcfxghbjklmhjgdgfchjbklm;mkbsvjchbaskjldbckjdshbcbhckjadfshkjcvkhacvaskghdvckcshvhacvaskjcvkjcvhcvkcvdcgvaskvcментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
    tags: ['здоровье']}));
console.log(addArticle({
    id: '100',
    title: 'Ярославский «Локомотив» победил в серии со счетом 4:1',
    summary: 'В 5-ом матче первого раунда плей-офф КХЛ Минское «Динамо» потерпело поражение от ярославского «Локомотива» и вылетело из борьбы за кубок',
    createdAt: new Date('2017-05-28T13:00:00'),
    author: 'Mikhail Chirich',
    content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',

}));
console.log(addArticle({
    id: '100',
    title: 'Ярославский «Локомотив» победил в серии со счетом 4:1',
    summary: 'В 5-ом матче первого раунда плей-офф КХЛ Минское «Динамо» потерпело поражение от ярославского «Локомотива» и вылетело из борьбы за кубок',
    createdAt: new Date('2017-05-28T13:00:00'),
    author: 'Mikhail Chirich',
    content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
    tags: ['ошибка']
}));

console.log('Testing: removeArticle()');
console.log(removeArticle(1));
console.log(removeArticle('ahasbckj'));
console.log(removeArticle('4'));
console.log(removeArticle('100'));
console.log(removeArticle('-15'));
console.log(removeArticle(true));
console.log(removeArticle(false));

console.log('Testing: editArticle()');
console.log(editArticle());
console.log(editArticle(undefined));
console.log(editArticle(undefined,{title:'hello niger'}));
console.log(editArticle('5',{title:'hello niger'}));
console.log(editArticle('5',{id:'1000',title:'hello niger'}));
console.log(editArticle('7',{tags:['политика', 'экономика', 'спорт', 'общество', 'культура', 'здоровье']}));
console.log(editArticle('7',{tags:['политика', 'культура', 'здоровье']}));
console.log(editArticle('10',{tags:['политика', 'культура', 'здоровье'], title:'i snova ya'}));

console.log('Testing: addTags()');
console.log(addTags());
console.log(addTags(undefined));
console.log(addTags(6,['политика', 'культура']));
console.log(addTags('6',['политика', 'культура']));
console.log(addTags('6',['культура', 'здоровье']));
console.log(addTags('6',['культура', 'здоровье', 'экономика', 'спорт', 'общество']));
console.log(addTags('9',['ошибка', 'культура']));
console.log(addTags('9'));

console.log('Testing: removeTags()');
console.log(removeTags());
console.log(removeTags(undefined));
console.log(removeTags(6));
console.log(removeTags('6',['политика', 'культура']));
console.log(removeTags('6',['культура']));
console.log(removeTags('6',['культура', 'здоровье', 'экономика', 'спорт', 'общество']));
console.log(removeTags('9',['ошибка', 'культура']));
console.log(removeTags('9'));




