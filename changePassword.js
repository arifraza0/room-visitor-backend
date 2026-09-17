const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const changePassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("1234", 10);

    const user = await User.findOneAndUpdate(
      { username: "admin" },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      console.log("Admin user not found!");
    } else {
      console.log("Admin password changed successfully!");
    }

    await mongoose.disconnect();
  } catch (error) {
    console.log("Error:", error);
  }
};

changePassword();