const express = require("express");
const { createQuiz } = require("../controllers/quizController.js");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("/createQuiz", verifyToken, createQuiz);

module.exports = router;
