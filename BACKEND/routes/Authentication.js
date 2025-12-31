const express = require("express");
const {
  Register,
  verifyEmail,
  Login,
  Logout,
  AuthMiddleware,
  createAdmin,
  GoogleAuth,
  // verifyAdminSecret,
} = require("../controllers/Authentication");

const router = express.Router();

router.post("/register/admin", createAdmin);
// router.post("/verify/secret", AuthMiddleware, verifyAdminSecret);
router.post("/register", Register);
router.post("/verify-email", verifyEmail);
router.post("/login", Login);
router.post("/logout", AuthMiddleware, Logout);
router.post("/google", GoogleAuth);

router.get("/check-auth", AuthMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
