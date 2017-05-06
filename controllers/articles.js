const Articles = require('../models/articles');

const makeArticle = {
  create: (request) => {
    const s = request.session;
    const b = request.body;

    const article = {
      mainCategory: b.mainCategory,
      photo: b.photo,
      title: b.title,
      author: s.user.login,
      createdAt: Date.now(),
      summary: b.summary,
      content: b.content,
      tags: b.tags,
      deleted: false
    };
    return article;
  },
  update: (request) => {
    const b = request.body;

    const article = {
      mainCategory: b.mainCategory,
      photo: b.photo,
      title: b.title,
      summary: b.summary,
      content: b.content,
      tags: b.tags
    };
    return article;
  }
};

function makeFilterQuery(filter, options) {
  const params = [
    { $match: filter },

    { $group: { _id: '$_id', article: { $push: '$$ROOT' } } },
    { $project: { article: 1, _id: 0 } },
    { $group: { _id: null, total: { $sum: 1 }, articles: { $push: '$$ROOT' } } },
    { $sort: options.sort },
    { $skip: options.skip },
    { $limit: options.limit },
    { $project: { total: 1, articles: 1, _id: 0 } }
  ];
  return params;
}

function makeFilter(request) {
  const q = request.query;
  const author = authorOption(q.author);
  const date = dateOption(q.dateFrom, q.dateTo);
  const tags = tagsOption(q.tags);
  const filterConfig = { deleted: false };
  if (author) filterConfig.author = author;
  if (date) filterConfig.createdAt = date;
  if (tags) filterConfig.tags = tags;
  return filterConfig;
}

function makeFilterParams(request) {
  const q = request.query;
  const params = {
    skip: Number(q.skip) || 0,
    limit: Number(q.amount) || 6,
    sort: { createdAt: -1 }
  };
  return params;
}

function authorOption(author) {
  if (!author) return null;
  const option = { $eq: author };
  return option;
}

function tagsOption(tags) {
  if (!tags) return null;
  tags = tags.split(',');
  const option = { $all: tags };
  return option;
}

function dateOption(dateFrom, dateTo) {
  const from = parseDate(dateFrom);
  const to = parseDate(dateTo);
  if (!from && !to) return null;
  const option = {};
  if (from) option.$gte = from;
  if (to) option.$lte = to;
  return option;
}

function parseDate(date) {
  if (date === 'NaN') return null;
  return Number(date);
}

function parseResponse(res) {
  const total = res[0].total;
  const articles = res[0].articles.map(item => item.article[0]);
  const result = {
    total,
    articles
  };
  return result;
}

function getArticles(req, res) {
  const options = makeFilterParams(req);
  const filter = makeFilter(req);

  //const params = //makeFilterQuery(filter, options);

  Articles.getArticles(options, filter, (err, ans) => {
    if (err) {
      return res.status(400).send('Troubles with getting articles!');
    }
    const result = {
      total: ans.length,
      array: ans.slice(options.skip, options.skip + options.limit)
    };
    res.send(result);
  });
}

function getArticleByID(req, res) {
  const id = req.params.id;
  Articles.getArticleByID(id, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
}

function createArticle(req, res) {
  const article = makeArticle.create(req);
  Articles.createArticle(article, (err, result) => {
    if (err) return res.send(err);
    res.send(result.ops[0]);
  });
}

function removeArticle(req, res) {
  const id = req.params.id;
  Articles.removeArticle(id, (err) => {
    if (err) return res.send(err);
    res.status(200).end();
  });
}

function updateArticle(req, res) {
  const id = req.params.id;
  const article = makeArticle.update(req);
  Articles.updateArticle(id, article, (err) => {
    if (err) return res.send(err);
    res.status(200).end();
  });
}

module.exports = {
  getArticles,
  getArticleByID,
  createArticle,
  removeArticle,
  updateArticle
};
