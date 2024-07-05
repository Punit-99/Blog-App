const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const UserModal = mongoose.model("UserModal", userSchema, "BlogApp-userAuth");

module.exports = UserModal;
