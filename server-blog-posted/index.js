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
    origin: "http://localhost:5173",
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

    // Check if all input is provided
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send({
        message: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
    }

    // check if user already exist
    const oldUser = await Users.findOne({ email });

    if (oldUser) {
      return res.status(409).send({
        message: "อีเมลนี้มีผู้ใช้งานแล้ว",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new Users({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Send success response
    res.status(200).send({
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    // Send error response
    res.status(401).send({
      message: "Invalid email or password",
      error: err,
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send({
        massage: "กรุณากรอกข้อมูลให้ครบถ้วน",
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
        maxAge: 30000000,
        httpOnly: true,
      });
      res.status(200).send({
        massage: "Login successfully",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      massage: "Invalid email or password",
      error: err,
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
        statusbar: "success",
      });
    } else {
      res.status(401).send({
        massage: "Unauthenticated",
        statusbar: "failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).send({
      massage: "Authentication failed",
      error,
    });
  }
});

app.put("/api/updateprofile/:id", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send({
        massage: "Unauthenticated",
      });
    }
    const verifyToken = jwt.verify(token, process.env.TOKEN_KEY);
    if (verifyToken) {
      const { id } = req.params;
      const { first_name, last_name, email } = req.body;

      await Users.findByIdAndUpdate(id, {
        first_name,
        last_name,
        email,
      });
      res.status(200).send({
        massage: "User updated successfully",
      });
    } else {
      res.status(401).send({
        massage: "Unauthenticated",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).send({
      massage: "Authentication failed",
      error,
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

const port = process.env.POST || 3001;
app.listen(port, () => {
  console.log(`Example app listening ${port}`);
});
