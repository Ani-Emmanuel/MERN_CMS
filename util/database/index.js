const mongoose = require("mongoose");

const database = async (url) => {
  console.log(url);

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = { database };
