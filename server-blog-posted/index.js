// build express example code
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const bcrypt = require("bcrypt");
const CookiesParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const multer = require("multer");

require("dotenv").config();
const connectDB = require("./DB-connect/db_connect");

// import model
const Users = require("./Model/Users");
const Blogs = require("./Model/Blogs");
const Profiles = require("./Model/Profile");
const veriflyAuth = require("./middleware/veriflyAuth");
const { verify } = require("crypto");

//upload file disk stroage multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/profile");
	},
	filename: function (req, file, cb) {
		const fileName = Date.now() + "-" + file.originalname;
		cb(null, fileName);
	}
});

const upload = multer({ storage });

// connect to mongodb
app.use(CookiesParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true
	})
);
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
connectDB();
// support json encoded bodies

app.get("/", (req, res) => {
	res.send({
		massage: "Hello World"
	});
	console.log("Hello World");
});

app.post("/api/register", async (req, res) => {
	try {
		const { first_name, last_name, email, password } = req.body;

		// Check if all input is provided
		if (!(email && password && first_name && last_name)) {
			return res.status(400).send({
				message: "กรุณากรอกข้อมูลให้ครบถ้วน"
			});
		}

		// check if user already exist
		const oldUser = await Users.findOne({ email });

		if (oldUser) {
			return res.status(409).send({
				message: "อีเมลนี้มีผู้ใช้งานแล้ว"
			});
		}
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user instance
		const user = new Users({
			first_name,
			last_name,
			email,
			password: hashedPassword
		});

		// Save the user to the database
		await user.save();

		// Send success response
		res.status(200).send({
			message: "User created successfully"
		});
	} catch (err) {
		console.log(err);
		// Send error response
		res.status(401).send({
			message: "Invalid email or password",
			error: err
		});
	}
});

app.post("/api/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			res.status(400).send({
				massage: "กรุณากรอกข้อมูลให้ครบถ้วน"
			});
		}
		console.log(email, password);
		const user = await Users.findOne({ email: email });
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
				expiresIn: "2h"
			});
			res.cookie("token", token, {
				maxAge: 30000000,
				httpOnly: true,
				secure: true,
				sameSite: "none"
			});
			return res.status(200).send({
				massage: "Login successfully",
				user
			});
		} else {
			return res.status(400).send({
				massage: "Invalid email or password"
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(401).send({
			massage: "Invalid email or password",
			error: err
		});
	}
});

app.post("/api/logout", async (req, res) => {
	try {
		const token = req.cookies.token;
		console.log(token);
		if (token) {
			res.clearCookie("token");
			return res.status(200).send({
				massage: "Logout successfully"
			});
		}
		return res.status(401).send({
			massage: "Unauthenticated"
		});
	} catch (error) {
		console.log(error);
		return res.status(401).send({
			massage: "Invalid email or password",
			error: error.massage
		});
	}
});

app.get("/protected-route", veriflyAuth, (req, res) => {
	try {
		return res.status(200).send({
			massage: "Welcome to protected route",
			protect: true
		});
	} catch (error) {
		return res.status(401).send({
			massage: "Unauthenticated",
			error: error.massage,
			protect: false
		});
	}
});

app.post("/api/user/", veriflyAuth, async (req, res) => {
	try {
		const token = req.cookies.token;
		const veriflyToken = jwt.verify(token, process.env.TOKEN_KEY);
		const email = veriflyToken.email;

		if (email == null || email == "") {
			return res.status(400).send({
				massage: "ไม่มี email นี้ในระบบ",
				isUser: false
			});
		}
		const user = await Users.findOne({ email: email });
		if (user == null || user == "" || user == undefined) {
			return res.status(400).send({
				massage: "ไม่มีผู้ใช้รายนี้",
				isUser: false
			});
		}
		return res.status(200).send({
			massage: "User profile",
			user,
			auth: true
		});
	} catch (error) {
		console.log(error);
		return res.status(403).send({
			massage: "Authentication failed",
			error: error.massage
		});
	}
});

app.get("/api/profile", veriflyAuth, async (req, res) => {
	try {
		const email = req.body;
		if (email == null || email == "") {
			return res.status(400).send({
				massage: "กรุณากรอกข้อมูลให้ครบถ้วน",
				isprofile: false
			});
		}
		const profile = await Profiles.findOne(email);
		if (profile == null || profile == "" || profile == undefined) {
			return res.status(400).send({
				massage: "กรุณากรอกข้อมูลให้ครบถ้วน",
				isprofile: false
			});
		}
		return res.status(200).send({
			massage: "User profile",
			profile,
			auth: true
		});
	} catch (error) {
		console.log(error);
		res.status(403).send({
			massage: "Authentication failed",
			error: error.massage
		});
	}
});
app.post("/api/creatprofile", veriflyAuth, async (req, res) => {
	try {
		const { first_name, last_name, email, phone, address, authid } = req.body;
		if ({ first_name, last_name, email, phone, address } == null) {
			return res.status(400).send({
				massage: "กรุณากรอกข้อมูลให้ครบถ้วน",
				isprofile: false
			});
		}
		const profile = new Profiles({
			first_name,
			last_name,
			email,
			phone,
			address,
			blog_count: 0,
			authid
		});
		profile.save();
		return res.status(201).send({
			massage: "profile created successfully",
			profile,
			isprofile: true
		});
	} catch (error) {
		console.log(error);
		return res.status(403).send({
			massage: "Authentication failed",
			error: error.massage
		});
	}
});

//get one profile user
app.get("/api/profile/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const profile = await Profiles.findById(id);
		if (profile == null || profile == undefined) {
			return res.status(404).send({
				massage: "profile not found",
				isProfile: false
			});
		}
		return res.status(200).send({
			massage: "profile found",
			profile
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({
			massage: "profile not found",
			error
		});
	}
});

app.put("/api/updateprofile/:id", upload.single("file"), async (req, res) => {
	try {
		const { id } = req.params;
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).send({
				massage: "Unauthenticated"
			});
		}
		const fileSelacter = req.file;
		let _id = id;
		console.log(fileSelacter);

		// Check if user exists
		const Profile = await Profiles.findById(_id);
		if (!Profile) {
			return res.status(404).send({
				massage: "User not found"
			});
		}
		await Profiles.findByIdAndUpdate(_id, {
			image_path: fileSelacter ? fileSelacter.path : null,
			image_name: fileSelacter ? fileSelacter.originalname : null
		});
		res.status(200).send({
			massage: "User updated successfully"
		});
	} catch (error) {
		console.log(error);
		res.status(403).send({
			massage: "Authentication failed",
			error
		});
	}
});

// blogs api
app.post("/api/creatBlogs", veriflyAuth, async (req, res) => {
	try {
		const { title, description, author } = req.body;
		if (!(title && description && author)) {
			return res.status(400).send({
				massage: "All input is required"
			});
		}
		const blog = new Blogs({
			title,
			description,
			author
		});
		blog.save();
		return res.status(201).send({
			massage: "Blog created successfully",
			blog
		});
	} catch (error) {
		return res.status(401).send({
			massage: "creat blogs unsuccess",
			error
		});
	}
});

app.put("/api/updateblog/:id", veriflyAuth, async (req, res) => {
	try {
		const { title, description, author } = req.body;
		if (!(title && description && author)) {
			return res.status(400).send({
				massage: "All input is required"
			});
		}
		const blog = new Blogs({
			title,
			description,
			author
		});
		blog.save();
		res.status(201).send({
			massage: "Blog created successfully",
			blog
		});
	} catch (error) {
		return res.status(401).send({
			massage: "creat blogs unsuccess",
			error
		});
	}
});

// get all blogs
app.get("/api/blogs", async (req, res) => {
	try {
		const blogs = await Blogs.find();
		return res.status(200).send({
			message: "Blogs found",
			blogs
		});
	} catch (error) {
		return res.status(401).send({
			massage: "get blogs unsuccess",
			error: error.massage
		});
	}
});
// get one blog
app.get("/api/blog/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const blog = await Blogs.findById(id);
		return res.status(200).send({
			message: "Blog found",
			blog
		});
	} catch (error) {
		res.status(400).send({
			message: "Blog not found",
			error
		});
	}
});

//listen server
const port = process.env.POST || 3001;
app.listen(port, () => {
	console.log(`Example app listening ${port}`);
});
