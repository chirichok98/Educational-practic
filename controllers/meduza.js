const request = require('request');
const zlib = require('zlib');

exports.getFromMeduza = function (req, res) {
  const url = `https://meduza.io/api/v3/${req.query.url}`;
  request(url, { encoding: null }, (err, response, body) => {
    if (response.headers['content-encoding'] === 'gzip') {
      zlib.gunzip(body, (error, dezipped) => {
        const object = JSON.parse(dezipped.toString());
        const article = convertArticle(object);
        if (validateArticle(article)) {
          return res.send(article);
        }
        return res.sendStatus(400);
      });
    }
    res.send(body);
  });
};

function convertArticle(meduzaArticle) {
  const root = meduzaArticle.root;
  const article = {
    title: root.title,
    summary: root.description,
    author: 'Meduza',
    createdAt: Date.now(),
    content: root.content.body,
    photo: getImage(root)
  };
  return article;
}

function getImage(root) {
  const img = root.image.small_url;
  return `https://meduza.io/${img}`;
}

function validateArticle(article) {
  return article && article.title.length <= 100 &&
    article.summary.length <= 200 && article.content.length !== 0;
}
