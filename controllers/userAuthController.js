const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/auth");

// SignUp Route
const SignUp = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.redirect("/?modal=open");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login Route
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = generateToken({ id: user._id, email: user.email });
    
    // Send token as a cookie
    res.cookie("token", token, { httpOnly: true, secure: false }); // 'secure: true' in production
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  SignUp,
  Login,
};
