const express = require('express');
const mongo = require('./db');
const articles = require('./routers/articles');
const users = require('./routers/users');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use('/', users);
app.use('/articles', articles);

const url = 'mongodb://server:6ihfqbl3KZUVSze1@cluster0-shard-00-00-guq8k.mongodb.net:27017,cluster0-shard-00-01-guq8k.mongodb.net:27017,cluster0-shard-00-02-guq8k.mongodb.net:27017/Portal?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
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
