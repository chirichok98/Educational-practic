const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

function getUserById(id, cb) {
  const fieldId = { _id: ObjectID(id) };
  db.users().findOne(fieldId, cb);
}

function getUserByLogin(login, cb) {
  const options = { login };
  db.users().findOne(options, cb);
}

module.exports = {
  getUserById,
  getUserByLogin
};
