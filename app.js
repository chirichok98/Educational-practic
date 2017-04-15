const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/articles');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', controller.getArticles);
app.get('/article/:id', controller.getArticleByID);
app.get('/articles/:category', controller.getArticlesByCategory);
app.post('/articles', controller.createArticle);
app.put('/articles/:id', controller.updateArticle);
app.delete('/articles/:id', controller.removeArticle);

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('index.html');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
