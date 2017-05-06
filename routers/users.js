const users = require('../controllers/users');
const passport = require('../models/passport');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const router = require('express').Router();

const sessionOptions = {
  secret: 'MY_SECRET',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/chirich',
    touchAfter: 24 * 3600
  })
};

router.use(cookieParser());
router.use(session(sessionOptions));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', users.login);
router.get('/logout', users.logout);
router.get('/user', users.getCurrentUser);

module.exports = router;
