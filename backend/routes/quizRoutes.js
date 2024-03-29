const express = require("express");
const { createQuiz, showQuiz } = require("../controllers/quizController.js");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("/createQuiz", verifyToken, createQuiz);
router.get("/quizzes", showQuiz);

module.exports = router;
