const express = require("express");
const router = express.Router();
const Tags = require("../Model/Tags");
const Blogs = require("../Model/Blogs");
const veriflyAuth = require("../middleware/veriflyAuth");

router.get("/tags", async (req, res) => {
    try {
        const tags = await Tags.find();
        return res.status(200).send({
            message: tags,
        });
    } catch (error) {
        return res.status(401).send({
            message: "ไม่มีข้อมูล",
            error,
        });
    }
});

router.post("/tags", veriflyAuth, async (req, res) => {
    try {
        const { blogid, tagname } = req.body;
        if (!(blogid && tagname)) {
            return res.status(400).send({
                massage: "All input is required",
            });
        }
        const tag = new Tags({
            blogid,
            tagname,
        });
        const saveTag = await tag.save();

        const blog = await Blogs.findOne({ _id: blogid });
        if (!blog) {
            const newBlog = new Blogs({ _id: blogid, tag: [saveTag] });
            await newBlog.save();
        } else {
            await Blogs.findOneAndUpdate(
                { _id: blogid },
                {
                    $push: {
                        tag: {
                            tagid: saveTag._id.toString(),
                            blogid: saveTag.blogid,
                            tagname: saveTag.tagname,
                            createdAt: saveTag.createdAt,
                            updatedAt: saveTag.updatedAt,
                        },
                    },
                }
            );
        }

        return res.status(201).send({
            massage: "Tag created and updated successfully",
            tag: saveTag,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            massage: "creat tag unsuccess",
            error,
        });
    }
});

router.put("/tags/:id", veriflyAuth, async (req, res) => {
    try {
        const idObj = req.params;
        const tagid = idObj.id;
        if (!tagid) {
            return res.status(400).send({
                massage: "กรุณาใส่ params ให้ถูกต้อง",
            });
        }
        const { blogid, tagname } = req.body;
        if (!(blogid && tagname)) {
            return res.status(400).send({
                massage: "All input is required",
            });
        }
        const tag = await Tags.findOneAndUpdate(
            { _id: tagid },
            {
                blogid,
                tagname,
                updatedAt: Date.now(),
            }
        );
        await Blogs.findOneAndUpdate(
            {
                _id: blogid,
                "tag.tagid": tag._id, // Find the specific tag in the array
            },
            {
                $set: {
                    "tag.$.tagname": tag.tagname,
                    "tag.$.updatedAt": tag.updatedAt,
                },
            }
        );
        return res.status(201).send({
            massage: "Tag created and updated successfully",
            tag,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            massage: "creat tag unsuccess",
            error,
        });
    }
});

router.delete("/tags/:id", veriflyAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tags.findByIdAndDelete(id);
        if (!tag) {
            return res.status(404).send({
                massage: "Tag not found",
            });
        }
        await Blogs.findOneAndUpdate(
            { _id: tag.blogid, "tag.tagid": id },
            { $pull: { tag: { tagid: id } } }
        );
        return res.status(200).send({
            massage: "Tag deleted successfully",
            tag,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            massage: "delete tag unsuccess",
            error,
        });
    }
});

module.exports = router;
