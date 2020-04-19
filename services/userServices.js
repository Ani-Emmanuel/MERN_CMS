import { User } from ("../model");

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.status(200).json({ payload: { data: user } });
  } catch (e) {
    next(e);
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json({ payload: { data: user } });
  } catch (e) {
    next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const { email } = req.body;
    const checkUser = await User.findById({ email });
    if (checkUser) {
      return res.status(401).json({
        payload: {
          message: "User already exist please login or reset password",
        },
      });
    }
    const user = await User.create(payload);
    res
      .status(201)
      .json({ payload: { message: "User created successfully", data: user } });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const payload = req.body;
    const user = await User.findByIdAndUpdate(userId, payload, { new: true });
    res
      .status(200)
      .json({ payload: { message: "User updated successfully", data: user } });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { fullName } = await User.findByIdAndRemove(userId);
    res
      .status(200)
      .json({ payload: { message: `${fullName} deleted succcessfully` } });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
