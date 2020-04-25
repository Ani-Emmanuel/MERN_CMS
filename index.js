const express = require("express");
const { port, dbUrl } = require("./util/config");
const database = require("./util/database");

const app = express();
database(dbUrl)



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port);
