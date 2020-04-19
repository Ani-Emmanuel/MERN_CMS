const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    vote: {
      total: { type: Number, default: 0 },
      voters: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
