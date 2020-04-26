const Router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../services");

Router.route("/").get(getAllUsers);
Router.route("/:userId").get(getOneUser);
Router.route("/update/:userId").put(updateUser);
Router.route("/delete/:userId").delete(deleteUser);

module.exports = { Router };
