const express = require("express");
const { port, dbUrl, database } = require("./util");
const {
  AuthRouter,
  UserRouter,
  ArticleRouter,
  CommentRouter,
} = require("./routes");

const app = express();
database(dbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);
app.use("/article", ArticleRouter);
app.use("/comment", CommentRouter);

//catches 404 errors
app.use((req, res, next) => {
  const error = new Error("not found");
  res.statusCode = 404;
  next(error);
});

//catches every other error
app.use((error, req, res, next) => {
  const err = app.get("env") === "development" ? error : {};
  const status = error.status || 500;
  res.status(status).json({ error: { message: err.message } });
});

app.listen(port);
