const { Comment, Article } = require("../model");

const createComment = async ({ userId }, req, res, next) => {
  try {
    const { articleId } = req.params;
    const doc = req.body;
    doc.article = articleId;
    doc.user = userId;

    const comment = new Comment(doc);
    const { _id } = comment;

    const article = await Article.findById(articleId);
    article.comments.push(_id);
    await article.save();
    await comment.save();
    res.status(201).json({ payload: { data: comment } });
  } catch (e) {
    next(e);
  }
};

const updateComment = async ({ userId }, req, res, next) => {
  try {
    const { commentId } = req.params;
    const doc = req.body;

    const post = await Comment.findById(commentId);

    if (!post) {
      return res.status(404).json({
        payload: { message: "Comment not founds" },
      });
    }

    if (userId != post.user) {
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

const deleteComment = async ({ userId }, req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        payload: { message: "Comment not founds" },
      });
    }

    if (userId != comment.user) {
      return res
        .status(301)
        .json({ payload: { message: "You are not authorized" } });
    }

    const { _id } = await Comment.findByIdAndRemove(commentId);
    const article = await Article.find({ comments: { $in: [_id] } });

    const index = article[0].comments.indexOf(_id);
    if (index > -1) {
      article[0].comments.splice(index, 1);
      await article[0].save();
    }

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
