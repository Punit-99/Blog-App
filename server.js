const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./DB/connection");
const bodyParser = require("body-parser");
const path = require("path");
const userAuthRoute = require("./routes/userAuthRoute");
const blogRoute = require("./routes/blogRoute");
const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/HTML", "homepage.html"));
});
app.use("/api/v1/auth", userAuthRoute);
app.use("/api/v1/blog", blogRoute);
app.get('/dashboard',(req,res)=>{
  res.sendFile(path.join(__dirname,"public/HTML","dashboard.html"))
})

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
