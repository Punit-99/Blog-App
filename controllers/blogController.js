const BlogModel = require("../models/blogModel");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.json(blogs);
  } catch (err) {
    console.log(err);
  }
};
const createBlogs = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: "Please provide title, content, and author" });
  }

  try {
    const newBlog = new BlogModel({
      title,
      content,
      author,
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog Published" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateBlogs = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};
const deleteBlogs = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllBlogs,
  createBlogs,
  updateBlogs,
  deleteBlogs,
};
