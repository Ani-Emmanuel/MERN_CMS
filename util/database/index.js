const mongoose = require("mongoose");

function database(url) {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    },
    (err) => {
      if (err) return err;
      console.log("database connected successfully");
      console.log(db);
    }
  );
}

module.exports = database;
