var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./controllers/articles');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', controller.getArticles);
app.get('/article/:id', controller.getArticleByID);
app.get('/articles/:category', controller.getArticlesByCategory);
app.post('/articles', controller.createArticle);
app.put('/articles/:id', controller.updateArticle);
app.delete('/articles/:id', controller.removeArticle);

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.send('index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
