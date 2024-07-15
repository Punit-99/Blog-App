const BlogModel = require("../models/blogModel");
const multer = require("multer");
const path = require("path");

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Set the file name
  },
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

// Get User Blog
const getUserBlog = async (req, res) => {
  try {
    const userId = req.user.id; // Access user ID from decoded token
    if (!userId) {
      return res.status(500).json({ message: "User Id not found" });
    }
    const myBlogs = await BlogModel.find({ createdBy: userId });
    res.status(200).json(myBlogs);
  } catch (error) {
    console.error("Error fetching user blog:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Server Error" });
    }
  }
};

const createBlogs = async (req, res) => {
  const { title, content, author } = req.body;
  const thumbnail = req.file ? req.file.path : "";

  // Ensure req.user is set correctly
  if (!req.user || !req.user.id) {
    console.log("User not authenticated or payload missing");
    return res.status(401).json({ message: "User not authenticated" });
  }

  const createdBy = req.user.id; // Access the user ID directly

  if (!title || !content || !author || !thumbnail) {
    return res.status(400).json({
      message: "Please provide title, content, author, and thumbnail",
    });
  }

  try {
    const newBlog = new BlogModel({
      title,
      content,
      author,
      thumbnail,
      createdBy,
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog Published", blog: newBlog });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Blog
const updateBlogs = async (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;
  const thumbnail = req.file ? req.file.path : null;

  try {
    const updateData = { title, content };
    if (thumbnail) {
      updateData.thumbnail = thumbnail;
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, updateData, {
      new: true,
    });

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
  getUserBlog,
  createBlogs: [upload.single("thumbnail"), createBlogs],
  updateBlogs: [upload.single("thumbnail"), updateBlogs],
  deleteBlogs,
};
