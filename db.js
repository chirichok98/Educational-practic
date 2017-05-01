const db = require('diskdb');

exports.connect = function () {
  db.connect('./database');
};

exports.loadArticles = function () {
  db.loadCollections(['articles']);
};

exports.loadUsers = function () {
  db.loadCollections(['users']);
};

exports.get = function () {
  return db;
};
