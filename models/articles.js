const db = require('../db');

db.connect();
db.loadArticles();

exports.getArticles = function (skip, top, filterConfig, category) {
  return new Promise(resolve => resolve(getArticles(skip, top, filterConfig, category)));
};

exports.getArticleByID = function getArticleByID(id) {
  return new Promise(resolve => resolve(db.get().articles.findOne({ _id: id })));
};

exports.createArticle = function (article) {
  return new Promise((resolve, reject) => {
    if (validateArticle(article)) {
      resolve(db.get().articles.save(article));
      return;
    }
    reject();
  });
};

exports.updateArticle = function (newArticle) {
  return new Promise((resolve, reject) => {
    const result = db.get().articles.update({ _id: newArticle._id }, newArticle);
    if (result.updated === 1) {
      resolve();
      return;
    }
    reject();
  });
};

exports.removeArticle = function (id) {
  return new Promise((resolve, reject) => {
    if (db.get().articles.findOne({ _id: id })) {
      resolve(db.get().articles.update({ _id: id }, { deleted: true }));
      return;
    }
    reject();
  });
};

function getArticles(skip, top, filterConfig, category) {
  if (category) {
    console.log(category);
    if (category === 'Все') {
      const result = db.get().articles.find({ deleted: false });
      return { length: result.length, array: result.slice(skip, top) };
    }
    const result = db.get().articles.find({ mainCategory: category, deleted: false });
    return { length: result.length, array: result.slice(skip, top) };
  }
  if (filterConfig) {
    const result = db.get().articles.find().filter((item) => {
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
      if (filterConfig.tags && !filterConfig.tags.every(fTag =>
        item.tags.some(tag => tag === fTag))) {
        return false;
      }
      return true;
    });
    return { length: result.length, array: result.slice(skip, top) };
  }
  const array = db.get().articles.find({ deleted: false });
  return { length: array.length, array: array.slice(skip, top) };
}

function validateArticle(article) {
  return article && article.title.length !== 0 &&
    article.summary.length !== 0 && article.content.length !== 0;
}

function sort(array) {
  return array.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
