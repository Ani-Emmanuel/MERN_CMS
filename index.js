const express = require("express");
const { port, dbUrl, database } = require("./util");

const app = express();
database(dbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//catches 404 errors
app.use((req, res, next) => {
  const error = new Error("not found");
  res.statusCode = 404;
  next(error);
});

//catches every other error
app.use((error, req, res, next) => {
  const err = app.get("env") === "developement" ? error : {};
  const status = eror.status || 500;
  res.status(status).json({ error: { message: error.message } });
});

app.listen(port);
