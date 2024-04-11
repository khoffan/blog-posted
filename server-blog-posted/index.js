// build express example code

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./DB-connect/db_connect");
const Users = require("./Model/Users");
// connect to mongodb
connectDB();
app.use(cors());
app.use(express.json);
app.use(express.urlencoded({ extended: true }));
// support json encoded bodies

app.get("/", (req, res) => {
  res.send({
    massage: "Hello World",
  });
  console.log("Hello World");
});

app.post("/api/register", (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const user = new Users({
      first_name,
      last_name,
      email,
      password,
    });
    user.save();
    res.status(201).send({
      massage: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(401).send({
      massage: "Invalid email or password",
      error,
    });
  }
});

server.listen(8001, () => {
  console.log(`Example app listening 8001`);
});
