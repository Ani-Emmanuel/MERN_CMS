const Router = require("express").Router();
const { compareToken } = require("../util");
const {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getOneArticle,
  voteArticle,
} = require("../services");

Router.route("/").get(getAllArticles);
Router.route("/:articleId").get(getOneArticle);
Router.route("/create").post(compareToken, createArticle);
Router.route("/voteArticle").post(compareToken, voteArticle);
Router.route("/update/:articleId").put(compareToken, updateArticle);
Router.route("/delete/:articleId").delete(compareToken, deleteArticle);
