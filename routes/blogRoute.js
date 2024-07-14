// routes/blogRoute.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");

const {
  getAllBlogs,
  createBlogs,
  updateBlogs,
  deleteBlogs,
  getUserBlog,
} = require("../controllers/blogController");

router.get("/allblogs", authenticateToken, getAllBlogs);
router.get("/userblog", authenticateToken, getUserBlog);
router.post("/createblog", authenticateToken, createBlogs); // Ensure this route is protected by the middleware
router.patch("/updateblog/:id", authenticateToken, updateBlogs);
router.delete("/deleteblog/:id", authenticateToken, deleteBlogs);

module.exports = router;
