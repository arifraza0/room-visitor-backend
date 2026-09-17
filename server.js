const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const visitorRoutes = require("./routes/visitorRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/visitors", visitorRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

app.get("/", (req, res) => {
  res.send("Room Visitor Backend is Working!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});