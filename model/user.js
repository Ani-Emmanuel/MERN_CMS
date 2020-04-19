const mongoose = require("mongoose");
const Schema = new mongoose.Schema();

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, min: 5 },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
