const mongoose = require("mongoose");

//connect to mongodb by use atlas
const { MONG_URI } = process.env;
const connectDB = async () => {
  try {
    await mongoose
      .connect(MONG_URI, {})
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {}
};

module.exports = connectDB;
