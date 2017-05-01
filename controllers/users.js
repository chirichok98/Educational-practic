const Passport = require('../models/passport');

exports.getCurrentUser = function (req, res) {
  const sess = req.session;
  res.send(sess.user);
};

exports.logout = function (req, res) {
  req.session.destroy((error) => {
    if (error) {
      res.sendStatus(500);
    }
  });
  res.sendStatus(200);
};

exports.login = function (req, res) {
  Passport.authenticate('local', (err, user) => {
    if (!user) {
      res.sendStatus(401);
      return;
    }
    const sess = req.session;
    sess.user = user;
    sess.save();

    res.send(sess.user);
  })(req, res);
};
