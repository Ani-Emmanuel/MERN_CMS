const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT,
  secret: process.env.SECRET,
};
