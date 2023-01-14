const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "User full name is required"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  imageUrl: String,
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
