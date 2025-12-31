const express = require("express");
const router = express.Router();
const {
  Users,
  PendingUsers,
  DeletePendings,
  myDetails,
  updateMyDetails,
  updateUserStatus,
  userDetails,
} = require("../controllers/Users");
const { AuthMiddleware } = require("../controllers/Authentication");

router.get("/all", Users);
router.get("/pendings", PendingUsers);
router.delete("/del-pendings", DeletePendings);
router.get("/my/details", AuthMiddleware, myDetails);
router.get("/details/:id", AuthMiddleware, userDetails);
router.put("/update", AuthMiddleware, updateMyDetails);
router.put("/ban/:id", AuthMiddleware, updateUserStatus);

module.exports = router;
