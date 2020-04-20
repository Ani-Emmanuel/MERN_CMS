import { Comment } from "../model";

const createComment = async (userId, req, res, next) => {
  try {
    const { articleId } = req.params;
    const doc = req.body;
    doc.article = articleId;
    doc.user = userId;

    const comment = await Comment.create(doc);
    res.status(201).json({ payload: { data: comment } });
  } catch (e) {
    next(e);
  }
};

const updateComment = async (userId, req, res, next) => {
  try {
    const { commentId } = req.params;
    const doc = req.body;
    const { user } = await Comment.findById(commentId);

    if (userId !== user) {
      return res
        .status(301)
        .json({ payload: { message: "You are not authorized" } });
    }

    const comment = await Comment.findByIdAndUpdate(commentId, doc, {
      new: true,
    });

    res.status(200).json({ payload: { data: comment } });
  } catch (e) {
    next(e);
  }
};

const deleteComment = async (userId, req, res, next) => {
  try {
    const { commentId } = req.params;
    const { user } = await Comment.findById(commentId);

    if (userId !== user) {
      return res
        .status(301)
        .json({ payload: { message: "You are not authorized" } });
    }

    await Comment.findByIdAndRemove(commentId);

    res
      .status(200)
      .json({ payload: { message: "comment deleted successfully" } });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
