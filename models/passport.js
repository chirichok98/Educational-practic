const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./users');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id).then(
    (response) => {
      const user = response;
      if (!user) return done(null, false);
      return done(null, user);
    }
  );
});

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
},
  (login, password, done) => {
    User.getUserByLP(login, password).then(
      (resolve) => {
        const user = resolve;
        if (!user) return done(null, false);
        return done(null, user);
      }
    );
  }
));

module.exports = passport;
