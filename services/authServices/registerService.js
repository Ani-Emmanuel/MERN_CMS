const { User } = require("../../model");
const { encryptPassword } = require("../../util");

const createUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const { email, password } = req.body;
    //check if user already exists
    const checkUser = await User.findById({ email });
    if (checkUser) {
      return res.status(401).json({
        payload: {
          message: "User already exist please login or reset password",
        },
      });
    }
    //encrypt password and save the payload
    payload.password = encryptPassword(password);
    const user = await User.create(payload);
    res
      .status(201)
      .json({ payload: { message: "User created successfully", data: user } });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUser,
};
