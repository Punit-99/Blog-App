const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, secretKey, { expiresIn: "1000" });
  return token;
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log(`login first`);
    return res.redirect("/");
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.redirect("/");
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken, generateToken };
