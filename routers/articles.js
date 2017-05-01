const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/articles');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', controller.getArticles);
router.get('/:id', controller.getArticleByID);
router.post('/', controller.createArticle);
router.put('/:id', controller.updateArticle);
router.delete('/:id', controller.removeArticle);

module.exports = router;
