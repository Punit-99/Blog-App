const expresss = require("express");
const router = expresss.Router();

const {
  getAllBlogs,
  createBlogs,
  updateBlogs,
  deleteBlogs,
} = require("../controllers/blogController");

router.get("/allblogs", getAllBlogs);
router.post("/createblog", createBlogs);
router.post("/updateblog/:id", updateBlogs);
router.delete("deleteblog/:id", deleteBlogs);

module.exports = router;