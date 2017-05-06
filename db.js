const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null
};

function connect(url, done) {
  if (state.db) {
    done();
    return;
  }
  MongoClient.connect(url, (err, db) => {
    if (err) {
      done(err);
      return;
    }
    state.db = db;
    done();
  });
}

function articles() {
  return state.db.collection('articles');
}

function users() {
  return state.db.collection('users');
}

module.exports = {
  connect,
  articles,
  users,
};

