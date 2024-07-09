const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  createBlogs,
  updateBlogs,
  deleteBlogs,
} = require("../controllers/blogController");

router.get("/allblogs", getAllBlogs);
router.post("/createblog", createBlogs);
router.patch("/updateblog/:id", updateBlogs);
router.delete("/deleteblog/:id", deleteBlogs);

module.exports = router;
