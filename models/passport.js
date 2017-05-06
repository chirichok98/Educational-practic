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
    users.getUserByLP(login, password, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    });
  }
));

module.exports = passport;
