var Articles = require('../models/articles');

exports.getArticles = function (req, res) {
    var tags = req.query.tags;
    if (typeof (req.query.tags) === 'string') {
        tags = req.query.tags.split(',');
    }
    var dateFrom = new Date(req.query.from);
    if (req.query.from === 'Invalid Date') {
        dateFrom = null;
    }
    var dateTo = new Date(req.query.to);
    if (req.query.to === 'Invalid Date') {
        dateTo = null;
    }
    var filterConfig = {
        author: req.query.author,
        tags: tags,
        date: {
            from: dateFrom,
            to: dateTo
        }
    }
    res.send(Articles.getArticles(req.query.skip, req.query.top, filterConfig));
}

exports.getArticleByID = function (req, res) {
    res.send(Articles.getArticleByID(req.params.id));
}

exports.createArticle = function (req, res) {
    var article = {
        mainCategory: req.body.mainCategory,
        photo: req.body.photo,
        title: req.body.title,
        summary: req.body.summary,
        createdAt: new Date(),
        author: req.body.user,
        content: req.body.content,
        tags: req.body.tags,
        deleted: false
    }
    var result = Articles.createArticle(article);
    res.send(result ? { id: result._id, createdAt: result.createdAt.toString() } : null);
}

exports.removeArticle = function (req, res) {
    res.sendStatus(Articles.removeArticle(req.params.id) ? 200 : 405);
}

exports.updateArticle = function (req, res) {
    var article = Articles.getArticleByID(req.params.id);
    var newArticle = article;
    if (req.body.mainCategory) { newArticle.mainCategory = req.body.mainCategory; }
    if (req.body.photo) { newArticle.photo = req.body.photo; }
    if (req.body.title) { newArticle.title = req.body.title; }
    if (req.body.summary) { newArticle.summary = req.body.summary; }
    if (req.body.content) { newArticle.content = req.body.content; }
    if (req.body.tags) { newArticle.tags = req.body.tags; }
    res.sendStatus(Articles.updateArticle(article, newArticle).updated === 1 ? 200 : 405);
}

exports.getArticlesByCategory = function (req, res) {
    res.send(Articles.getArticlesByCategory(req.params.category));
}