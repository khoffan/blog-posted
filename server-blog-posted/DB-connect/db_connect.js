const mongoose = require("mongoose");

//connect to mongodb by use atlas

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://admin:admin@cluster1.kn0o9e5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1",
        {
          useNewUrlParser: true, //to avoid warning
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      )
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {}
};

module.exports = connectDB;
