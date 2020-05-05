const CommentRouter = require("express").Router();
const { createComment, updateComment, deleteComment } = require("../services");
const { compareToken } = require("../util");

CommentRouter.route("/create/:articleId").post(compareToken, createComment);
CommentRouter.route("/update/:commentId").put(compareToken, updateComment);
CommentRouter.route("/delete/:commentId").delete(compareToken, deleteComment);

module.exports = { CommentRouter };
