const express = require("express");
const router = express.Router();

const Profiles = require("../Model/Profile");
const Users = require("../Model/Users");
const veriflyAuth = require("../middleware/veriflyAuth");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/profile");
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName);
    },
});

const upload = multer({ storage });

router.get("/user", veriflyAuth, async (req, res) => {
    try {
        const userToken = req.user;
        const userid = userToken.user_id;
        if (userid == null || userid == "") {
            return res.status(400).send({
                massage: "ไม่มี email นี้ในระบบ",
                isUser: false,
            });
        }
        const user = await Profiles.findOne({ authid: userid });
        if (user == null || user == "" || user == undefined) {
            return res.status(400).send({
                massage: "ไม่มีผู้ใช้รายนี้",
                isUser: false,
            });
        }
        return res.status(200).send({
            massage: "User profile",
            user,
            auth: true,
        });
    } catch (error) {
        console.log(error);
        return res.send({
            massage: "Authentication failed",
            error: error.massage,
        });
    }
});

router.get("/profile", veriflyAuth, async (req, res) => {
    try {
        const email = req.body;
        if (email == null || email == "") {
            return res.status(400).send({
                massage: "กรุณากรอกข้อมูลให้ครบถ้วน",
                isprofile: false,
            });
        }
        const profile = await Profiles.findOne(email);
        if (profile == null || profile == "" || profile == undefined) {
            return res.status(400).send({
                massage: "กรุณากรอกข้อมูลให้ครบถ้วน",
                isprofile: false,
            });
        }
        return res.status(200).send({
            massage: "User profile",
            profile,
            auth: true,
        });
    } catch (error) {
        console.log(error);
        res.status(403).send({
            massage: "Authentication failed",
            error: error.massage,
        });
    }
});
router.post("/creatprofile", veriflyAuth, async (req, res) => {
    try {
        const { first_name, last_name, email, phone, address, authid } =
            req.body;
        if ({ first_name, last_name, email, phone, address } == null) {
            return res.status(400).send({
                massage: "กรุณากรอกข้อมูลให้ครบถ้วน",
                isprofile: false,
            });
        }
        const profile = new Profiles({
            first_name,
            last_name,
            email,
            phone,
            address,
            blog_count: 0,
            authid,
        });
        profile.save();
        return res.status(201).send({
            massage: "profile created successfully",
            profile,
            isprofile: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(403).send({
            massage: "Authentication failed",
            error: error.massage,
        });
    }
});

//get one profile user
router.get("/profile/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profiles.findOne({ authid: id });
        if (profile == null || profile == undefined) {
            return res.status(404).send({
                massage: "profile not found",
                isProfile: false,
            });
        }
        return res.status(200).send({
            massage: "profile found",
            profile,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            massage: "profile not found",
            error,
        });
    }
});

router.put("/updateprofile/:id", veriflyAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, phone_nuumber, address, email } =
            req.body;
        if (
            (first_name, last_name, phone_nuumber, address, email) == null ||
            (first_name, last_name, phone_nuumber, address, email) == ""
        ) {
            return res.status(400).send({
                massage: "กรุณากรอกข้อมูลให้ครบถ้วน",
                isprofile: false,
            });
        }
        let _id = id;

        const profile = await Profiles.findById(_id);
        if (!profile) {
            return res.status(404).send({
                massage: "User not found",
            });
        }

        await Profiles.findOneAndUpdate(
            { _id },
            {
                first_name,
                last_name,
                email,
                phone_nuumber,
                address,
            }
        );

        return res.status(200).send({
            massage: "User updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(403).send({
            massage: "Authentication failed",
            error,
        });
    }
});

router.put("/uploadimage/:id", upload.single("file"), async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({
                massage: "Unauthenticated",
            });
        }
        const fileSelacter = req.file;
        let _id = id;

        // Check if user exists
        const Profile = await Profiles.findOne({ _id });
        if (!Profile) {
            return res.status(404).send({
                massage: "User not found",
            });
        }
        await Profiles.findOneAndUpdate(
            { _id },
            {
                image_path: fileSelacter ? fileSelacter.path : null,
                image_name: fileSelacter ? fileSelacter.originalname : null,
            }
        );
        return res.status(200).send({
            massage: "อัพเดตรูปภาพเรียบร้อยแล้ว",
            image_path: fileSelacter.path,
        });
    } catch (error) {
        console.log(error);
        res.status(403).send({
            massage: "Authentication failed",
            error,
        });
    }
});

module.exports = router;
