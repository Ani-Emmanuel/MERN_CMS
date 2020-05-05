const UserRouter = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../services");

UserRouter.route("/").get(getAllUsers);
UserRouter.route("/:userId").get(getOneUser);
UserRouter.route("/update/:userId").put(updateUser);
UserRouter.route("/delete/:userId").delete(deleteUser);

module.exports = { UserRouter };
