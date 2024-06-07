const express = require("express");
const router = express.Router();

const Blogs = require("../Model/Blogs");
const veriflyAuth = require("../middleware/veriflyAuth");

// blogs api
router.post("/creatBlogs", veriflyAuth, async (req, res) => {
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

router.put("/updateblog/:id", veriflyAuth, async (req, res) => {
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
router.get("/blogs", async (req, res) => {
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
router.get("/blog/:id", async (req, res) => {
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

module.exports = router;
