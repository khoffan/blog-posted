const express = require("express");
const router = express.Router();

const Blogs = require("../Model/Blogs");
const Profiles = require("../Model/Profile");
const veriflyAuth = require("../middleware/veriflyAuth");

// blogs api
router.post("/creatBlogs", veriflyAuth, async (req, res) => {
    try {
        const { title, description, author, tags } = req.body;
        if (!(title && description && author)) {
            return res.status(400).send({
                massage: "All input is required",
            });
        }
        const blog = new Blogs({
            title,
            description,
            author,
            tag: tags,
        });
        await blog.save();
        const blog_author = await Blogs.findOne({
            "author.email": author.email,
        });
        if (!blog_author) {
            return res.status(400).send({
                massage: "Blog not found",
            });
        }
        await Profiles.findOneAndUpdate(
            { email: blog_author.author.email },
            {
                $inc: { blogs_count: 1 },
            }
        );
        //return false;
        return res.status(201).send({
            massage: "Blog created successfully",
            blog,
        });
    } catch (error) {
        return res.status(401).send({
            massage: "creat blogs unsuccess",
            error,
        });
    }
});

router.put("/updateblog/:id", veriflyAuth, async (req, res) => {
    try {
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
        //return false;
        return res.status(201).send({
            massage: "Blog created successfully",
            blog,
        });
    } catch (error) {
        return res.status(401).send({
            massage: "creat blogs unsuccess",
            error,
        });
    }
});

// get all blogs
router.get("/blogs", async (req, res) => {
    const tags = req.query.tags || null;
    try {
        if (tags) {
            const blogs = await Blogs.find({
                tag: { $elemMatch: { tagname: tags } },
            });
            if (blogs == null) {
                return res.status(400).send({
                    message: "Blogs not found",
                });
            }
            return res.status(200).send({
                message: "Blogs found",
                blogs,
            });
        }
        const blogs = await Blogs.find();
        if (blogs == null) {
            return res.status(400).send({
                message: "Blogs not found",
            });
        }
        return res.status(200).send({
            message: "Blogs found",
            blogs,
        });
    } catch (error) {
        return res.status(401).send({
            massage: "get blogs unsuccess",
            error: error.massage,
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
            blog,
        });
    } catch (error) {
        res.status(400).send({
            message: "Blog not found",
            error,
        });
    }
});

// get all blog pass id profile
router.get("/blogs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profiles.findOne({ authid: id });
        if (!profile) {
            return res.status(200).send({
                message: "ไม่มี Profile นี้ในระบบ",
            });
        }
        const email = profile.email;
        if (!email) {
            return res.status(200).send({
                message: "ไม่มี Email นี้ในระบบ",
            });
        }
        const blogs = await Blogs.find({
            "author.email": email,
        });

        return res.status(200).send({
            message: blogs,
        });
    } catch (error) {
        console.log(error);
        return res.send({
            message: "ไม่มี blog ของ id นี้",
            error,
        });
    }
});

router.put("/blog/like/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blogs.findById(id);
        if (blog == null) {
            return res.status(400).send({
                message: "Blog not found",
            });
        }
        blog.like = blog.like + 1;
        blog.save();
        return res.status(200).send({
            message: "like blog success",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            massage: "like blog unsuccess",
            error,
        });
    }
});
router.put("/blog/dislike/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blogs.findById(id);
        if (blog == null) {
            return res.status(400).send({
                message: "Blog not found",
            });
        }
        blog.dislinke = blog.dislinke + 1;
        blog.save();
        return res.status(200).send({
            message: "like blog success",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            massage: "like blog unsuccess",
            error,
        });
    }
});

module.exports = router;
