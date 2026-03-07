const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthenticated: No token provided",
            });
        }

        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({
                        success: false,
                        message: "Token has expired",
                    });
                }
                return res.status(401).json({
                    success: false,
                    message: "Invalid token",
                });
            }
            
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("verifyAuth Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authentication",
        });
    }
};

module.exports = verifyAuth;
