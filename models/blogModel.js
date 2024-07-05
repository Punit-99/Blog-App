const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // thumbnail: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // tags: [String],
});
const BlogModal = mongoose.model("BlogModal", blogSchema, "BlogApp-Blogs");

module.exports = BlogModal;
