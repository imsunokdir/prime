const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Fetch user profile
const getProfile = async (req, res) => {
  console.log("asdasd");
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile(name and password)
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, password } = req.body;

    if (name) user.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProfile, updateProfile };
