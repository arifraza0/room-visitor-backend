const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("1234", 10);

    await User.create({
      username: "admin",
      password: hashedPassword
    });

    console.log("Admin created successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.log("Error:", error);
  }
};

createAdmin();