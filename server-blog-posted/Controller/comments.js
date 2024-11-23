const express = require("express");
const router = express();

const Comments = require("../Model/Comments");
const veriflyAuth = require("../middleware/veriflyAuth");
const VerifyAuth = require("../middleware/veriflyAuth");

router.post("/comment", veriflyAuth, async (req, res) => {
	try {
		const commentData = req.body;
		if (!commentData) {
			res.send({
				message: "ไม่มีข้อมูล"
			});
			return;
		}
		let comment = new Comments({
			userid: commentData.userid,
			blogid: commentData.blogid,
			comment: commentData.comment
		});

		await comment.save();
		return res.send({ message: "เพิ่ม comment สำเร็จ" });
	} catch (error) {
		console.log(error);
		return res.send({
			message: "ไม่มีข้อมูล",
			error
		});
	}
});

router.get("/comments", async (req, res) => {
	try {
		const commentsData = await Comments.find();
		if (!commentsData) {
			res.send({
				message: "ไม่มีข้อมูล"
			});
		}
		console.log(commentsData);
		res.send({
			commentsData
		});
	} catch (error) {
		console.log(error);
		return res.send({
			message: "ไม่มีข้อมูล",
			error
		});
	}
});

module.exports = router;
