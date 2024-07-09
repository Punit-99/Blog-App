const mongoose = require("mongoose");
const BlogModel = require("./models/blogModel");
const dotenv = require("dotenv").config();
const path = require("path");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

const seedBlogs = async () => {
  await connectDB();

  const sampleBlogs = [
    {
      title: "First Blog Post",
      content: "This is the content of the first blog post.",
      author: "Author One",
      thumbnail: path.join("uploads", "sample1.jpg"), // Path to the sample image
    },
    {
      title: "Second Blog Post",
      content: "This is the content of the second blog post.",
      author: "Author Two",
      thumbnail: path.join("uploads", "sample2.jpg"), // Path to the sample image
    },
    {
      title: "Third Blog Post",
      content: "This is the content of the third blog post.",
      author: "Author Three",
      thumbnail: path.join("uploads", "sample3.jpg"), // Path to the sample image
    },
  ];

  try {
    await BlogModel.deleteMany(); // Clear existing data
    await BlogModel.insertMany(sampleBlogs); // Insert sample data
    console.log("Sample blogs inserted");
    process.exit();
  } catch (error) {
    console.error("Error inserting sample blogs", error);
    process.exit(1);
  }
};

seedBlogs();
