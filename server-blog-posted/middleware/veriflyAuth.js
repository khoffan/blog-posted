//verflyauth
const jwt = require("jsonwebtoken");

const veriflyAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.send({
                massage: "Unauthenticated",
                auth: false,
            });
            return;
        }
        jwt.verify(token, process.env.TOKEN_KEY, (err, decode) => {
            if (!err) {
                req.user = decode;
                next();
            } else {
                return res.send({
                    massage: "token is not verify",
                    auth: false,
                });
            }
        });
    } catch (error) {
        if (error === "TokenExpiredError") {
            console.log("token หมดอายุ");
            next();
            return res.status(401).send({
                massage: "Unauthenticated",
                auth: false,
                error,
            });
        }
        console.log(error);
    }
};

module.exports = veriflyAuth;
