const BlogModel = require("../models/blogModel");

// Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.json(blogs);
  } catch (err) {
    console.log(err);
  }
};

// Create Blogs
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

// Update Blog
const updateBlogs = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

// Delete Blog
const deleteBlogs = async (req, res) => {
  const blogId = req.params.id;
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(`Error deleting blog: ${err}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllBlogs,
  createBlogs,
  updateBlogs,
  deleteBlogs,
};
