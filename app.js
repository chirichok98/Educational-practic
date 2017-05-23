const express = require('express');
const mongo = require('./db');
const articles = require('./routers/articles');
const users = require('./routers/users');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use('/', users);
app.use('/articles', articles);

const url = 'mongodb://localhost:27017/chirich';
const port = process.env.PORT || 3000;

mongo.connect(url, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(port, () => {
    console.log('Server listening on port 3000!');
  });
});
