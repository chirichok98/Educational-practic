const express = require('express');
const articles = require('./routers/articles');
const users = require('./routers/users');

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use('/articles', articles);
app.use('/', users);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
