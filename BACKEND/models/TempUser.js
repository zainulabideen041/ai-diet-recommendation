const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email_status: {
    type: String,
    enum: ["verified", "notverified"],
    default: "notverified",
  },
  code: {
    type: String,
    required: true,
  },
  codeExpires: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TempUser", tempUserSchema);
