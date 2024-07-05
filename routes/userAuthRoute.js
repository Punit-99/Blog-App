const expess = require("express");
const router = expess.Router();

const { SignUp, Login } = require("../controllers/userAuthController");

router.post("/signup", SignUp);
router.post("/login", Login);

module.exports = router;
