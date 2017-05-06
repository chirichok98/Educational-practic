const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

function getUserById(id, cb) {
  const fieldId = { _id: ObjectID(id) };
  db.users().findOne(fieldId, cb);
}

function getUserByLP(login, password, cb) {
  const options = { login, password };
  db.users().findOne(options, cb);
}

module.exports = {
  getUserById,
  getUserByLP
};
