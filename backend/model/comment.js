const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
