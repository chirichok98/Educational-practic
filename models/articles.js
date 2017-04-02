var db = require('../db');

db.connect();
db.loadArticles();

exports.getArticles = function (skip, top, filterConfig) {
    skip = skip || 0;
    top = top || db.get().articles.count();
    if (filterConfig) {
        var result = db.get().articles.find().filter(function (item) {
            if (item.deleted) {
                return false;
            }
            if (filterConfig.author && item.author !== filterConfig.author) {
                return false;
            }
            if (filterConfig.date) {
                if (filterConfig.date.from && new Date(item.createdAt) < filterConfig.date.from) {
                    return false;
                }
                if (filterConfig.date.to && new Date(item.createdAt) > filterConfig.date.to) {
                    return false;
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
        });
        return result.slice(skip, skip + top);
    }
    else {
        return db.get().articles.find().filter(item => !item.deleted).slice(skip, skip + top);
    }
}

exports.getArticleByID = function getArticleByID(id) {
    return db.get().articles.findOne({ _id: id });
}

exports.createArticle = function (article) {
    return validateArticle(article) ? db.get().articles.save(article) : false;
}

exports.updateArticle = function (article, newArticle) {
    return db.get().articles.update(article, newArticle);
}

exports.getArticlesByCategory = function (category) {
    console.log(category);
    if (category === 'Все') {
        return getArticles();
    }
    else {
        return db.get().articles.find().filter(function (item) {
            if (!item.deleted && item.mainCategory === category) {
                return true;
            }
        });
    }
}

exports.removeArticle = function (id) {
    return db.get().articles.findOne({ _id: id }) ? db.get().articles.update({ _id: id }, { deleted: true }) : false;
}

exports.getArticlesByCategory = function (category) {
    if (category === 'Все') {
        return db.get().articles.find({ deleted: false });
    }
    return db.get().articles.find({ mainCategory: category, deleted: false });
}

function validateArticle(article) {
    return article && article.title.length !== 0 && article.summary.length !== 0 && article.content.length !== 0
}
