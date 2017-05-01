const express = require('express');
const bodyParser = require('body-parser');
const meduza = require('../controllers/meduza');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', meduza.getFromMeduza);

module.exports = router;
