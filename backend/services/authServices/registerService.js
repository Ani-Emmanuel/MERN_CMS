const { User } = require("../../model");
const { encryptPassword } = require("../../util");

const createUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const { email, password } = req.body;
    //check if user already exists
    console.log("here");
    const checkUser = await User.findOne({ email: email });

    if (checkUser !== null) {
      return res.status(401).json({
        payload: {
          message: "User already exist please login or reset password",
        },
      });
    }
    console.log("here again");

    //encrypt password and save the payload
    payload.password = encryptPassword(password);
    console.log(payload);

    const user = new User(payload);
    console.log(user);

    const newUser = await user.save();
    res.status(201).json({
      payload: { message: "User created successfully", data: newUser },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUser,
};
