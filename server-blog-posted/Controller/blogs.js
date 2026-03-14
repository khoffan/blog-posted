const express = require("express");
const router = express.Router();

const Blogs = require("../Model/Blogs");
const Profiles = require("../Model/Profile");
const verifyAuth = require("../middleware/verifyAuth");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/blogs");
	},
	filename: function (req, file, cb) {
		const fileName = Date.now() + "-" + file.originalname;
		cb(null, fileName);
	}
});

const upload = multer({ storage });

// blogs api
router.post("/creatBlogs", verifyAuth, async (req, res) => {
	try {
		const { title, description, author, blogImage, paragraphs } = req.body;
		if (!(title && description && author)) {
			return res.status(400).send({
				message: "All input is required"
			});
		}
		const blog = new Blogs({
			title,
			description,
			author,
			content: paragraphs,
			images: blogImage.map((img) => ({
				imageId: img.id,
				imageName: img.image_name,
				imagePath: img.image_path,
				createdAt: Date.now(),
				updatedAt: Date.now()
			}))
		});
		await blog.save();
		const blog_author = await Blogs.findOne({
			"author": author
		});
		if (!blog_author) {
			return res.status(400).send({
				message: "Blog not found"
			});
		}
		console.log(blog_author);
		await Profiles.findOneAndUpdate(
			{ authid: blog_author.author },
			{
				$inc: { blogs_count: 1 }
			}
		);
		//return false;
		return res.status(201).send({
			message: "Blog created successfully",
			blog
		});
	} catch (error) {
		return res.status(401).send({
			message: "creat blogs unsuccess",
			error
		});
	}
});

router.put("/updateblog/:id", verifyAuth, async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, author, paragraphs, blogImage } = req.body;
		if (!(title && description && author)) {
			return res.status(400).send({
				message: "All input is required"
			});
		}
		
		const updateData = { title, description, author, content: paragraphs };
		if (blogImage) {
			updateData.images = blogImage.map((img) => ({
				imageId: img.id,
				imageName: img.image_name,
				imagePath: img.image_path,
				updatedAt: Date.now()
			}));
		}

		const blog = await Blogs.findByIdAndUpdate(
			id,
			updateData,
			{ new: true }
		);

		if (!blog) {
			return res.status(404).send({
				message: "Blog not found"
			});
		}

		return res.status(200).send({
			message: "Blog updated successfully",
			blog
		});
	} catch (error) {
		return res.status(500).send({
			message: "Update blog unsuccessful",
			error: error.message || error
		});
	}
});

// get all blogs
router.get("/blogs", async (req, res) => {
	const tags = req.query.tags || null;
	const sort = req.query.sort || 1;
	const { search } = req.query;
	let filter = {};
	if (search) {
		filter = { title: { $regex: search, $options: "i" } };
	}
	try {
		if (tags) {
			const blogs = await Blogs.find({
				"tag.tagname": { $regex: tags, $options: "i" }
			}).sort({ createdAt: Number(sort) });
			if (blogs == null) {
				return res.status(400).send({
					message: "Blogs not found"
				});
			}
			return res.status(200).send({
				message: "Blogs found",
				blogs
			});
		}
		const blogs = await Blogs.find(filter).sort({ createdAt: Number(sort) });
		if (blogs == null) {
			return res.status(400).send({
				message: "Blogs not found"
			});
		}
		return res.status(200).send({
			message: "Blogs found",
			blogs
		});
	} catch (error) {
		return res.status(401).send({
			message: "get blogs unsuccess",
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

// get all blog pass id profile
router.get("/blogs/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const blogs = await Blogs.find({
			author: id
		});

		return res.status(200).send({
			message: blogs
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			message: "ไม่มี blog ของ id นี้",
			error
		});
	}
});

// delete blog
router.delete("/deleteblog/:id", verifyAuth, async (req, res) => {
	try {
		const { id } = req.params;
		const blog = await Blogs.findByIdAndDelete(id);
		
		if (!blog) {
			return res.status(404).send({
				message: "Blog not found"
			});
		}

		await Profiles.findOneAndUpdate(
			{ authid: blog.author },
			{
				$inc: { blogs_count: -1 }
			}
		);

		return res.status(200).send({
			message: "Blog deleted successfully",
			blog
		});
	} catch (error) {
		return res.status(500).send({
			message: "Failed to delete blog",
			error: error.message || error
		});
	}
});

router.put("/blog/like/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const blog = await Blogs.findById(id);
		if (blog == null) {
			return res.status(400).send({
				message: "Blog not found"
			});
		}
		blog.like = blog.like + 1;
		await blog.save();
		return res.status(200).send({
			message: "like blog success",
			blog
		});
	} catch (error) {
		console.log(error);
		return res.status(401).send({
			message: "like blog unsuccess",
			error
		});
	}
});
router.put("/blog/dislike/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const blog = await Blogs.findById(id);
		if (blog == null) {
			return res.status(400).send({
				message: "Blog not found"
			});
		}
		blog.dislike = (blog.dislike || 0) + 1;
		await blog.save();
		return res.status(200).send({
			message: "like blog success",
			blog
		});
	} catch (error) {
		console.log(error);
		return res.status(401).send({
			message: "like blog unsuccess",
			error
		});
	}
});

router.post("/blog/images", upload.single("blog"), verifyAuth, async (req, res) => {
	try {
		const file = req.file;

		if (!file) {
			return res.status(400).send({
				message: "files not found"
			});
		}
		// store file in array

		return res.status(200).send({
			message: "upload images success",
			file
		});
	} catch (error) {
		console.log(error);
		return res.status(401).send({
			message: "upload images unsuccess",
			error
		});
	}
});

module.exports = router;
