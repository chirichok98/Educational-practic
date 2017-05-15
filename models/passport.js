const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./users');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  users.getUserById(id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  });
});

const fields = {
  usernameField: 'login',
  passwordField: 'password'
};

passport.use(new LocalStrategy(fields,
  (login, password, done) => {
    users.getUserByLogin(login, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (!user) {
        const e = { err: 'Invalid login' };
        return done(e, false);
      }
      checkPassword(user, password, done);
    });
  }
));

function checkPassword(user, password, cb) {
  const res = user.password === password;
  if (!res) {
    const e = { err: 'Invalid password' };
    return cb(e, false);
  }
  cb(null, user);
}

module.exports = passport;
