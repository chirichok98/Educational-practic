var db = require('diskdb');

exports.connect = function() {
    db.connect('./database');
}

exports.loadArticles = function() {
    db.loadCollections(['articles']);
}

exports.get = function() {
    return db;
}
