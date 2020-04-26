const { User } = require("../../model");
const { comparePaswword, signToken } = require("../../util");

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.find({ email });

  if (!user) {
    return res
      .status(404)
      .json({ message: "Please create an account to be able to login" });
  }

  const hashedPassword = user.password;
  const checkPassword = comparePaswword(password, hashedPassword);

  if (!checkPassword) {
    return res.status(401).json({ message: "Incorrect Password" });
  }

  const token = await signToken(user._id);
  res.header("auth-token", token);

  res
    .status(200)
    .json({ message: "You are loggedin successfully", token: { data: token } });
};

module.exports = {
  signIn,
};
