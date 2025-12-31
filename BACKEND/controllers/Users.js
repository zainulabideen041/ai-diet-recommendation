const User = require("../models/User");
const TempUser = require("../models/TempUser");
const bcrypt = require("bcryptjs");

const PendingUsers = async (req, res) => {
  try {
    const pendingUsers = await TempUser.find({ email_status: "notverified" });

    if (pendingUsers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Pending Requests Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pending users fetched successfully.",
      pendingUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching pending users.",
    });
  }
};

const DeletePendings = async (req, res) => {
  try {
    await TempUser.deleteMany({ email_status: "notverified" });

    res.status(200).json({
      success: true,
      message: "All pending users with 'notverified' account status deleted.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting pending users.",
    });
  }
};

const Users = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    if (users.length === 0) {
      return res.status(204).json({
        success: true,
        message: "No Users Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching approved users.",
    });
  }
};

const myDetails = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Details Retrieved",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during approval process.",
    });
  }
};

const userDetails = async (req, res) => {
  const id = req.params.id;
  const myid = req.user.id;

  try {
    const admin = await User.findById(myid);
    if (admin.role === "user") {
      return res.status(400).json({
        success: false,
        message: "Only Admin can view user details",
      });
    }

    const user = await User.findById(id).select("-password").lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Details Retrieved",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving user details.",
    });
  }
};

const updateMyDetails = async (req, res) => {
  const id = req.user.id;
  const { name, currentPassword, newPassword, health } = req.body;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔑 Handle password change
    if (currentPassword && newPassword) {
      const matchPass = await bcrypt.compare(
        currentPassword,
        existingUser.password
      );
      if (!matchPass) {
        return res.status(401).json({
          success: false,
          message: "Current password doesn't match",
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      existingUser.password = hashedPassword;
    }

    // ✏️ Update basic info
    if (name) existingUser.name = name;

    // 🩺 Update health data if provided
    if (health) {
      existingUser.health = {
        ...existingUser.health.toObject(), // keep existing values
        ...health, // overwrite with new ones
      };
    }

    await existingUser.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        health: existingUser.health,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
    });
  }
};

const updateUserStatus = async (req, res) => {
  const userId = req.user.id;

  const id = req.params.id;
  const { banned } = req.body;

  try {
    const isadmin = await User.findById(userId);
    if (isadmin.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "only admin can ban or unban",
      });
    }
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (typeof banned === "boolean") {
      existingUser.banned = banned;
    }

    await existingUser.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        banned: existingUser.banned,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
    });
  }
};

module.exports = {
  PendingUsers,
  DeletePendings,
  myDetails,
  updateUserStatus,
  updateMyDetails,
  userDetails,
  Users,
};
