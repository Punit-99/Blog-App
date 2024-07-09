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

const updateBlogs = async (req, res) => {
  const blogId = req.params.id;
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        title: req.body.title,
        content: req.body.content,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
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
