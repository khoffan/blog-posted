// build express example code

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const connectDB = require("./DB-connect/db_connect");
const Users = require("./Model/Users");
// connect to mongodb
app.use(cookies());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
// support json encoded bodies

app.get("/", (req, res) => {
  res.send({
    massage: "Hello World",
  });
  console.log("Hello World");
});

app.post("/api/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const passEndcript = await bcrypt.hash(password, 10);
    if (!(email && password && first_name && last_name)) {
      res.status(400).send({
        massage: "All input is required",
      });
    }
    const user = new Users({
      first_name,
      last_name,
      email,
      password: passEndcript,
    });
    user.save();
    res.status(201).send({
      massage: "User created successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      massage: "Invalid email or password",
      err,
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send({
        massage: "All input is required",
      });
    }
    const user = await Users.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).send({
        massage: "Login successfully",
        token,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({
      massage: "Invalid email or password",
      err,
    });
  }
});

app.listen(8001, () => {
  console.log(`Example app listening 8001`);
});
