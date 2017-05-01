const Users = require('../controllers/users');
const Passport = require('../models/passport');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SessionStore = require('connect-diskdb')(session);
const router = require('express').Router();

const storeOptions = {
  path: './database',
  name: 'sessions',
};
const storeDisk = new SessionStore(storeOptions);
const sessionOptions = {
  secret: 'MY_SECRET',
  resave: false,
  saveUninitialized: false,
  store: storeDisk
};

router.use(cookieParser());
router.use(session(sessionOptions));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(Passport.initialize());
router.use(Passport.session());

router.post('/login', Users.login);

router.get('/logout', Users.logout);

router.get('/user', Users.getCurrentUser);

module.exports = router;
