const Articles = require('../models/articles');

exports.getArticles = function (req, res) {
  let tags = req.query.tags;
  if (typeof (req.query.tags) === 'string') {
    tags = req.query.tags.split(',');
  }
  let dateFrom = new Date(req.query.from);
  if (req.query.from === 'Invalid Date') {
    dateFrom = null;
  }
  let dateTo = new Date(req.query.to);
  if (req.query.to === 'Invalid Date') {
    dateTo = null;
  }
  const filterConfig = {
    author: req.query.author,
    tags,
    date: {
      from: dateFrom,
      to: dateTo,
    },
  };
  Articles.getArticles(req.query.skip, req.query.top, filterConfig).then(
    response => res.send(response),
    error => res.sendStatus(404)
  );
};

exports.getArticleByID = function (req, res) {
  Articles.getArticleByID(req.params.id).then(
    response => res.send(response),
    error => res.sendStatus(404)
  );
};

exports.createArticle = function (req, res) {
  const article = {
    mainCategory: req.body.mainCategory,
    photo: req.body.photo,
    title: req.body.title,
    summary: req.body.summary,
    createdAt: new Date(),
    author: req.body.author,
    content: req.body.content,
    tags: req.body.tags,
    deleted: false,
  };
  Articles.createArticle(article).then(
    response => res.send(
      { id: response._id,
        createdAt: response.createdAt.toString(),
        author: response.author
      }),
    error => res.sendStatus(404)
  );
};

exports.removeArticle = function (req, res) {
  res.sendStatus(Articles.removeArticle(req.params.id) ? 200 : 405);
};

exports.updateArticle = function (req, res) {
  const newArticle = Articles.getArticleByID(req.params.id);
  if (req.body.mainCategory) { newArticle.mainCategory = req.body.mainCategory; }
  if (req.body.photo) { newArticle.photo = req.body.photo; }
  if (req.body.title) { newArticle.title = req.body.title; }
  if (req.body.summary) { newArticle.summary = req.body.summary; }
  if (req.body.content) { newArticle.content = req.body.content; }
  if (req.body.tags) { newArticle.tags = req.body.tags; }
  Articles.updateArticle(newArticle).then(
      () => res.sendStatus(200),
      () => res.sendStatus(405)
  );
};

exports.getArticlesByCategory = function (req, res) {
  Articles.getArticlesByCategory(req.params.category).then(
    response => res.send(response),
    error => res.sendStatus(404)
  );
};
