const express = require('express');
const mongo = require('./db');
const articles = require('./routers/articles');
const users = require('./routers/users');
const meduza = require('./routers/meduza');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use('/', users);
app.use('/articles', articles);
app.use('/meduza', meduza);

const url = 'mongodb://localhost:27017/chirich';

mongo.connect(url, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(3000, () => {
    console.log('Server listening on port 3000!');
  });
});
