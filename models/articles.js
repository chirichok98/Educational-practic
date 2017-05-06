const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

function getArticles(options, filter, cb) {
  db.articles().find(filter).sort(options.sort).toArray(cb);
  /*db.articles().aggregate([
    { $match: filter },

    { $group: { _id: '$_id', article: { $push: '$$ROOT' } } },
    { $project: { article: 1, _id: 0 } },
    { $group: { _id: null, total: { $sum: 1 }, articles: { $push: '$$ROOT' } } },
    { $sort: options.sort },
    { $skip: options.skip },
    { $limit: options.limit },
    { $project: { total: 1, articles: 1, _id: 0 } }
  ], cb);*/
}

function getArticleByID(id, cb) {
  const fieldId = { _id: ObjectID(id) };
  db.articles().findOne(fieldId, cb);
}

function createArticle(article, cb) {
  if (isValidArticle(article)) {
    return db.articles().insertOne(article, cb);
  }
  cb({ err: 'Invalid article' });
}

function updateArticle(id, article, cb) {
  const fieldId = { _id: ObjectID(id) };
  const upgrade = { $set: article };
  db.articles().updateOne(fieldId, upgrade, cb);
}

function removeArticle(id, cb) {
  const fieldId = { _id: ObjectID(id) };
  const deleted = { $set: { deleted: true } };
  db.articles().updateOne(fieldId, deleted, cb);
}


function isValidArticle(article) {
  const isValid = article &&
    article.title.length &&
    article.summary.length &&
    article.content.length;
  return isValid;
}

module.exports = {
  getArticles,
  getArticleByID,
  createArticle,
  updateArticle,
  removeArticle,
};
