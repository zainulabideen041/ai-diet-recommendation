const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  isGoogleAuth: {
    type: Boolean,
    default: false,
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
    // required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  banned: {
    type: Boolean,
    default: false,
  },

  health: {
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
    height: { type: Number }, // cm
    weight: { type: Number }, // kg
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very active"],
    },
    dietaryPreferences: [
      {
        type: String,
        enum: [
          "vegetarian",
          "vegan",
          "pescatarian",
          "halal",
          "kosher",
          "gluten-free",
          "dairy-free",
          "none",
        ],
      },
    ],
    allergies: [{ type: String }],
    medicalConditions: [{ type: String }],
    goal: {
      type: String,
      enum: ["weight_loss", "muscle_gain", "maintenance", "balanced"],
      default: "balanced",
    },
  },

  isGoogleAuth: { Boolean },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
