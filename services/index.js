const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("./userServices");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("./commentService");
const {
  getAllArticles,
  getOneArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  voteArticle,
} = require("./articleServices");
const { signIn, createUser } = require("./authServices");

export default {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  createComment,
  updateComment,
  deleteComment,
  getAllArticles,
  getOneArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  voteArticle,
  signIn,
  createUser,
};
