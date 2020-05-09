const ArticleRouter = require("express").Router();
const { compareToken } = require("../util");
const {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getOneArticle,
  voteArticle,
} = require("../services");

ArticleRouter.route("/").get(getAllArticles);
ArticleRouter.route("/:articleId").get(getOneArticle);
ArticleRouter.route("/create").post(compareToken, createArticle);
ArticleRouter.route("/voteArticle/:articleId").put(compareToken, voteArticle);
ArticleRouter.route("/update/:articleId").put(compareToken, updateArticle);
ArticleRouter.route("/delete/:articleId").delete(compareToken, deleteArticle);

module.exports = { ArticleRouter };
