// build express example code
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const CookiesParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();
const connectDB = require("./DB-connect/db_connect");
// router
const AuthPath = require("./Controller/auth");
const ProfilePath = require("./Controller/users");
const BlogPath = require("./Controller/blogs");
const CommentsPath = require("./Controller/comments");
const TagsController = require("./Controller/tags");
//upload file disk stroage multer

// connect to mongodb
connectDB();
//use middlewares
app.use(CookiesParser());
app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(
    session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/api", AuthPath);
app.use("/api", ProfilePath);
app.use("/api", BlogPath);
app.use("/api", CommentsPath);
app.use("/api", TagsController);

// support json encoded bodies

app.get("/", (req, res) => {
    res.send({
        massage: "Hello World",
    });
    console.log("Hello World");
});

//listen server
const port = process.env.POST || 3001;
app.listen(port, () => {
    console.log(`Example app listening ${port}`);
});
