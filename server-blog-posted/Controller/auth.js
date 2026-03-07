const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../Model/Users");
const Profiles = require("../Model/Profile");
const verifyAuth = require("../middleware/verifyAuth.js");

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Check if all input is provided
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send({
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
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
        const profile = new Profiles({
            first_name,
            last_name,
            email,
            phone: "",
            address: "",
            blog_count: 0,
            authid: user._id,
        });
        await profile.save();

        // Send success response
        return res.status(200).send({
            message: "ลงทะเบียนสําเร็จ",
            user,
            profile,
        });
    } catch (err) {
        // Send error response
        res.status(401).send({
            message: "Invalid email or password",
            error: err,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send({
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
            });
        }
        const user = await Users.findOne({ email: email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY
            );
            res.cookie("token", token, {
                maxAge: 2 * 60 * 60 * 1000,
                secure: true,
                sameSite: "none",
            });
            return res.status(200).send({
                message: "Login successfully",
            });
        } else {
            return res.status(404).send({
                message: "Invalid email or password",
            });
        }
    } catch (err) {
        return res.status(401).send({
            message: "Invalid email or password",
            error: err,
        });
    }
});

router.post("/logout", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            res.clearCookie("token");
            return res.status(200).send({
                message: "Logout successfully",
            });
        }
        return res.status(401).send({
            message: "Unauthenticated",
        });
    } catch (error) {
        return res.status(401).send({
            message: "Invalid email or password",
            error: error.massage,
        });
    }
});

router.get("/protected-route", verifyAuth, (req, res) => {
    try {
        return res.status(200).send({
            message: "Welcome to protected route",
            protect: true,
        });
    } catch (error) {
        return res.status(401).send({
            message: "Unauthenticated",
            error: error.massage,
            protect: false,
        });
    }
});

module.exports = router;
