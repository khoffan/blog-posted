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
const Blogs = require("./Model/Blogs");
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
      res.cookie("token", token, {
        maxAge: 300000,
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });
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

app.get("/api/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send({
        massage: "Unauthenticated",
      });
    }

    const verifyToken = jwt.verify(token, process.env.TOKEN_KEY);
    if (verifyToken) {
      const email = verifyToken.email;
      const user = await Users.findOne({ email: email });
      res.status(200).send({
        massage: "User profile",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).send({
      massage: "Authentication failed",
    });
  }
});

// blogs api
app.post("/api/creatBlogs", async (req, res) => {
  const { title, description, author } = req.body;
  if (!(title && description && author)) {
    return res.status(400).send({
      massage: "All input is required",
    });
  }
  const blog = new Blogs({
    title,
    description,
    author,
  });
  blog.save();
  res.status(201).send({
    massage: "Blog created successfully",
    blog,
  });
});

// get all blogs
app.get("/api/getBlogs", async (req, res) => {
  const blogs = await Blogs.find();
  res.send(blogs);
});
app.listen(8001, () => {
  console.log(`Example app listening 8001`);
});
