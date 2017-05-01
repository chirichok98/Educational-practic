const db = require('../db');

db.connect();
db.loadUsers();

exports.getUserById = function (id) {
  return new Promise(resolve => resolve(db.get().users.findOne({ _id: id })));
};

exports.getUserByLP = function (login, password) {
  return new Promise(resolve => resolve(db.get().users.findOne({ login, password })));
};
