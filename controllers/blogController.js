// controllers/blogController.js
const BlogModel = require("../models/blogModel");
const multer = require("multer");
const path = require("path");

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Set the file name
  }
});

const upload = multer({ storage: storage });

// Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create Blog
const createBlogs = async (req, res) => {
  const { title, content, author } = req.body;
  const thumbnail = req.file ? req.file.path : '';

  if (!title || !content || !author || !thumbnail) {
    return res
      .status(400)
      .json({ message: "Please provide title, content, author, and thumbnail" });
  }

  try {
    const newBlog = new BlogModel({
      title,
      content,
      author,
      thumbnail,
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog Published", blog: newBlog });
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
  createBlogs: [upload.single('thumbnail'), createBlogs],
  updateBlogs,
  deleteBlogs,
};
