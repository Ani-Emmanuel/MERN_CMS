const AuthRouter = require("express").Router();
const { signIn, createUser } = require("../services");

AuthRouter.route("/register").post(createUser);
AuthRouter.route("/login").post(signIn);

module.exports = {
  AuthRouter,
};
