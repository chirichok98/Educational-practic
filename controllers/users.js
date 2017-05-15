const passport = require('../models/passport');

function getCurrentUser(req, res) {
  const sess = req.session;
  res.send(sess.user);
}

function logout(req, res) {
  req.session.destroy((error) => {
    if (error) {
      res.sendStatus(500);
    }
  });
  res.sendStatus(200);
}

function login(req, res) {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(401).send(err);
    }
    if (!user) {
      return res.status(401).end();
    }
    const sess = req.session;
    sess.user = user;
    sess.save();

    res.send(sess.user);
  })(req, res);
}

module.exports = {
  login,
  logout,
  getCurrentUser,
};
