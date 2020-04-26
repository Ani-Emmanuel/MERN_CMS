const { Article } = require("../model");

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({});
    res.status(200).json({ payload: { data: articles } });
  } catch (e) {
    next(e);
  }
};

const getOneArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId);
    res.status(200).json({ payload: { data: article } });
  } catch (e) {
    next(e);
  }
};

const createArticle = async (userId, req, res, next) => {
  try {
    const doc = req.body;
    doc.user = userId;
    const article = await Article.create(doc);
    res.status(201).json({ payload: { data: article } });
  } catch (e) {
    next(e);
  }
};

const updateArticle = async (userId, req, res, next) => {
  try {
    const { userId, articleId } = req.params;

    const post = await Article.findById(articleId);
    const { user } = post;

    //check to make sure its the author that can edit the article
    if (user !== userId) {
      return res.status(301).json({
        payload: { message: "Sorry only the author can update the article" },
      });
    }

    const doc = req.body;
    const article = await Article.findByIdAndUpdate(articleId, doc, {
      new: true,
    });
    res.status(200).json({ payload: { data: article } });
  } catch (e) {
    next(e);
  }
};

const voteArticle = async (userId, req, res, next) => {
  try {
    const { articleId } = req.params;
    const post = await Article.findById(articleId);
    Number((post.vote.total += 1));
    post.vote.voters.push(userId);
    const article = await post.save();
    res.status(200).json({ payload: { data: article } });
  } catch (e) {
    next(e);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { userId, articleId } = req.params;
    const { user } = await Article.findById(articleId);
    if (userId !== user) {
      return res
        .status(301)
        .json({ payload: { message: "You are not authorized" } });
    }
    await Article.findByIdAndRemove(articleId);
    res
      .status(200)
      .json({ payload: { message: "Article has been deeted successfully" } });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllArticles,
  getOneArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  voteArticle,
};
