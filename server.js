const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./DB/connection");
const bodyParser = require("body-parser");
const path = require("path");
const userAuthRoute = require("./routes/userAuthRoute");
const blogRoute = require("./routes/blogRoute");
const cookieParser = require("cookie-parser");
const { authenticateToken } = require("./middleware/auth");

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML", "homepage.html"));
});
app.use("/api/v1/auth", userAuthRoute);
app.use("/api/v1/blog", blogRoute);

app.get("/dashboard", authenticateToken, (req, res) => {
  // here
  res.sendFile(path.join(__dirname, "public/HTML", "dashboard.html"));
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log("DB Connected!");
      console.log(`Server listing on http://127.0.0.1:${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Database connetion failed", err);
  }
};
start();
