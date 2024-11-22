//verflyauth
const jwt = require("jsonwebtoken");

const veriflyAuth = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		res.status(401).send({
			massage: "Unauthenticated",
			auth: false
		});
		return;
	}
	jwt.verify(token, process.env.TOKEN_KEY, (err, decode) => {
		if (!err) {
			req.user = decode;
			next();
		} else {
			return res.status(401).send({
				massage: "Unauthenticated",
				auth: false
			});
		}
	});
};

module.exports = veriflyAuth;
