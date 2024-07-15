const express = require("express");
const router = express.Router();
const { SignUp, Login, logout } = require("../controllers/userAuthController");

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", logout);

module.exports = router;
