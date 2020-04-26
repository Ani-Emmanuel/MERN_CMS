const Router = require("express").Router();
const { createComment, updateComment, deleteComment } = require("../services");

Router.route("/create").post(createComment);
Router.route("/update/:commentId").put(updateComment);
Router.route("/delete/:commentId").delete(deleteComment);

module.exports = { Router };
