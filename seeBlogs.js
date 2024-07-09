// seedBlogs.js
const mongoose = require("mongoose");
const BlogModel = require("./models/blogModel");
const dotenv = require("dotenv").config();

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
    },
    {
      title: "Second Blog Post",
      content: "This is the content of the second blog post.",
      author: "Author Two",
    },
    {
      title: "Third Blog Post",
      content: "This is the content of the third blog post.",
      author: "Author Three",
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
