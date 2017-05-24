const users = require('../controllers/users');
const passport = require('../services/passport');

const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const router = require('express').Router();

const url = 'mongodb://server:6ihfqbl3KZUVSze1@cluster0-shard-00-00-guq8k.mongodb.net:27017,cluster0-shard-00-01-guq8k.mongodb.net:27017,cluster0-shard-00-02-guq8k.mongodb.net:27017/Portal?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

const sessionOptions = {
  secret: 'MY_SECRET',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    url,
    touchAfter: 24 * 3600
  })
};

router.use(session(sessionOptions));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', users.login);
router.get('/logout', users.logout);
router.get('/user', users.getCurrentUser);

module.exports = router;
