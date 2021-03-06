const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

function getArticlesByFilter(options, resOptions, filter, cb) {
  db.articles().find(filter, resOptions)
  .sort(options.sort)
  .toArray(cb);
}

function getArticlesByCategory(options, category, cb) {
  db.articles().find(category)
  .sort(options.sort)
  .toArray(cb);
}

function getArticleByID(id, cb) {
  const fieldId = { _id: ObjectID(id) };
  db.articles().findOne(fieldId, cb);
}

function createArticle(article, cb) {
  if (isValidArticle(article)) {
    return db.articles().insertOne(article, cb);
  }
  const err = { err: 'Invalid article' };
  cb(err);
}

function updateArticle(id, article, cb) {
  const fieldId = { _id: ObjectID(id) };
  const upgrade = { $set: article };
  if (isValidArticle(article)) {
    return db.articles().updateOne(fieldId, upgrade, cb);
  }
  const err = { err: 'Invalid article' };
  cb(err);
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
  getArticlesByFilter,
  getArticlesByCategory,
  getArticleByID,
  createArticle,
  updateArticle,
  removeArticle,
};
