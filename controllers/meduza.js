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
          console.log('valid');
          return res.send(article);
        }
        console.log('invalid');
        return res.sendStatus(400);
      });
    }
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
  if (root.gallery) {
    const g = root.gallery[0];
    return `https://meduza.io/${g.original_url}`;
  }
  console.log(root);
  const img = root.share_image;
  return `https://meduza.io/${img}`;
}

function validateArticle(article) {
  console.log(`summary${article.summary.length}`);
  return article && article.title.length <= 100 &&
    article.summary.length <= 200 && article.content.length !== 0;
}
