const jwt = require("jsonwebtoken");

const signToken = async (userId, secret) => {
  const token = await jwt.sign({ userId }, secret);
  return token;
};

const compareToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "You have to login to perform this action" });
  }
  try {
    const verify = jwt.verify(token, process.env.SECRET);
    if (verify) next(verify);
  } catch (error) {
    next(error);
  }
};

module.exports = { signToken, compareToken };
