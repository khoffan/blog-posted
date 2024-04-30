// build express example code
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");

require("dotenv").config();
const connectDB = require("./DB-connect/db_connect");

// import model
const Users = require("./Model/Users");
const Blogs = require("./Model/Blogs");
const veriflyAuth = require("./middleware/veriflyAuth");

//upload file disk stroage multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

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
    } else {
      return res.status(400).send({
        massage: "Invalid email or password",
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

app.get("/api/profile", veriflyAuth, async (req, res) => {
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
        auth: true,
      });
    } else {
      res.status(401).send({
        massage: "Unauthenticated",
        auth: false,
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

//get one profile user
app.get("/api/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    res.status(200).send({
      massage: "profile found",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      massage: "profile not found",
      error,
    });
  }
});

app.put("/api/updateprofile/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    const fileSelacter = req.file;
    console.log(fileSelacter);

    // Check if user exists
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).send({
        massage: "User not found",
      });
    }
    await Users.findByIdAndUpdate(id, {
      first_name,
      last_name,
      image_path: fileSelacter ? fileSelacter.path : null,
      image_name: fileSelacter ? fileSelacter.originalname : null,
    });
    res.status(200).send({
      massage: "User updated successfully",
    });
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
// get one blog
app.get("/api/getBlogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    resstatus(200).send({
      message: "Blog found",
      blog,
    });
  } catch (error) {
    res.status(400).send({
      message: "Blog not found",
      error,
    });
  }
});

//listen server
const port = process.env.POST || 3001;
app.listen(port, () => {
  console.log(`Example app listening ${port}`);
});
