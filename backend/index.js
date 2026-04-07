require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const itemRoutes = require("./routes/itemRoutes");
const authRoutes = require("./routes/authRoutes");
const mockItems = require("./data/mockItems");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("My Archive backend is running");
});

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

app.get("/newcollections", (req, res) => {
  const newcollection = mockItems.slice(-3);
  res.json(newcollection);
});

app.get("/popularinships", (req, res) => {
  const ships = mockItems.filter(item => item.category === "ships");
  const popularInShips = ships.slice(0, 4);
  res.json(popularInShips);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});