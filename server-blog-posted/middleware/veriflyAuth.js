//verflyauth
const jwt = require("jsonwebtoken");

const veriflyAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({
      massage: "Unauthenticated",
      auth: false,
    });
    return;
  }
  const verifyToken = jwt.verify(token, process.env.TOKEN_KEY);
  if (verifyToken) {
    next();
  } else {
    return res.status(401).send({
      massage: "Unauthenticated",
      auth: false,
    });
  }
};

module.exports = veriflyAuth;
