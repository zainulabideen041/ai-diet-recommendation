const express = require("express");
const router = express.Router();
const { RecommendFood, chat } = require("../controllers/AiRecommend");
const { AuthMiddleware } = require("../controllers/Authentication");

router.post("/recommend", AuthMiddleware, RecommendFood);
router.post("/chat", chat);

module.exports = router;
