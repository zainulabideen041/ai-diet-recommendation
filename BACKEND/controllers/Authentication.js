const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const TempUser = require("../models/TempUser");
const SendEmail = require("../utils/sendEmail");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// CREATE ADMIN CONTROLLER
const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists with this data",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      message: "Admin account created successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the admin",
    });
  }
};

// GOOGLE LOGIN
const GoogleAuth = async (req, res) => {
  const { id_token } = req.body;

  try {
    // 1. Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload; // using only fields you need

    // 2. Check if user exists by email
    let user = await User.findOne({ email });

    if (!user) {
      // 3. Create new user
      user = await User.create({
        name, // directly use Google's name
        email,
        password: null, // no password since Google auth
        phone: "",
        role: "user",
        isGoogleAuth: true,
        googleId: sub, // helpful if you want to track Google ID
      });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // set true in production (HTTPS)
      sameSite: "none", // allows cross-site cookies (frontend/backend on different ports)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    // 6. Respond
    res.status(200).json({
      success: true,
      message: "Google login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid Google token or user data",
    });
  }
};

// REGISTER TEMP USER CONTROLLER
const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!email && !name && !password) {
      return res.status(400).json({
        success: false,
        message: "Email, Phone or name is required for registration",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    await TempUser.deleteOne({ email });

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new temp user
    const tempUser = new TempUser({
      name,
      email,
      password: hashedPassword,
      code: verificationCode,
      codeExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    await tempUser.save();

    await SendEmail(
      email,
      "Verify Your Email",
      "verify",
      verificationCode,
      (recipientName = name)
    );

    res.status(200).json({
      success: true,
      message:
        "Verification code sent to your email. Please verify to complete registration.",
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "A verification attempt already exists. Please check your email or try again shortly.",
      });
    }

    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
    });
  }
};

// REGISTER USER CONTROLLER
const verifyEmail = async (req, res) => {
  const { code, email } = req.body;

  try {
    const tempUser = await TempUser.findOne({ email });

    if (
      !tempUser ||
      tempUser.code !== code ||
      tempUser.codeExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    const user = User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
    });

    await TempUser.deleteOne({ email });

    res.status(200).json({
      success: true,
      message: "Email verified, Please login to continue.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during verification",
    });
  }
};

// LOGIN USER CONTROLLER
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: "Provide password and email",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare password
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // optional expiry
    );

    // Set cookie (httpOnly + secure for production)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// LOGOUT USER CONTROLLER
const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};

// AUTH CHECK MIDDLEWARE
const AuthMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded_user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded_user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ success: false, message: "Unauthorized User" });
  }
};

module.exports = {
  Register,
  verifyEmail,
  Logout,
  Login,
  AuthMiddleware,
  createAdmin,
  GoogleAuth,
};
