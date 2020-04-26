const Router = require("express").Router();
const { signIn, createUser } = require("../services");

Router.route("/register").post(createUser);
Router.route("/login").post(signIn);

module.exports = {
  Router,
};
