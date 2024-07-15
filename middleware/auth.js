const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "10000d" });
  return token;
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found, redirecting to login");
    return res.redirect("/").json({ message: "provide authentication" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: "Token verification failed" });
    }
    req.user = decoded; // decoded
    next();
  });
};

module.exports = { generateToken, authenticateToken };
