const articles = require('../models/articles');
const util = require('../utils/parser');

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

function createFilter(request) {
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

function createPagParams(request) {
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
  const from = util.parseDate(dateFrom);
  const to = util.parseDate(dateTo);
  if (!from && !to) return null;
  const option = {};
  if (from) option.$gte = from;
  if (to) option.$lte = to;
  return option;
}

function resolveOptions() {
  const obj = {
    content: 0,
    summary: 0,
    deleted: 0,
  };
  return obj;
}

function categoryOption(request) {
  const q = request.query;
  const categ = q.mainCategory;
  const isAll = categ === 'Все';
  if (isAll) return;
  const option = { mainCategory: categ };
  return option;
}

function parseResult(options, ans) {
  const result = {
    total: ans.length,
    array: ans.slice(options.skip, options.skip + options.limit)
  };
  return result;
}

function getArticlesByFilter(req, res) {
  const options = createPagParams(req);
  const filter = createFilter(req);
  const resOptions = resolveOptions();

  articles.getArticlesByFilter(options, resOptions, filter, (err, ans) => {
    if (err) return res.status(400).send(err);
    const result = parseResult(options, ans);
    res.send(result);
  });
}

function getArticlesByCategory(req, res) {
  const options = createPagParams(req);
  const category = categoryOption(req);

  articles.getArticlesByCategory(options, category, (err, ans) => {
    if (err) return res.status(400).send(err);
    const result = parseResult(options, ans);
    res.send(result);
  });
}

function getArticleByID(req, res) {
  const id = req.params.id;
  articles.getArticleByID(id, (err, result) => {
    if (err) return res.status(400).send(err);
    res.send(result);
  });
}

function createArticle(req, res) {
  const user = req.session.user;
  if (!user) {
    const err = { err: 'Unauthenticated person' };
    return res.status(400).send(err);
  }
  const article = makeArticle.create(req);
  articles.createArticle(article, (err, result) => {
    if (err) return res.status(400).send(err);
    res.send(result.ops[0]);
  });
}

function removeArticle(req, res) {
  const user = req.session.user;
  if (!user) {
    const err = { err: 'Unauthenticated person' };
    return res.status(400).send(err);
  }
  const id = req.params.id;
  articles.removeArticle(id, (err) => {
    if (err) return res.status(400).send(err);
    res.status(200).end();
  });
}

function updateArticle(req, res) {
  const user = req.session.user;
  if (!user) {
    const err = { err: 'Unauthenticated person' };
    return res.status(400).send(err);
  }
  const id = req.params.id;
  const article = makeArticle.update(req);
  articles.updateArticle(id, article, (err) => {
    if (err) return res.status(400).send(err);
    res.status(200).end();
  });
}

module.exports = {
  getArticlesByFilter,
  getArticlesByCategory,
  getArticleByID,
  createArticle,
  removeArticle,
  updateArticle
};
