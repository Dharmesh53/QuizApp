const express = require("express");
const {
  createQuiz,
  showQuiz,
  updateQuiz,
} = require("../controllers/quizController.js");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.post("/createQuiz", verifyToken, createQuiz);
router.get("/quizzes", showQuiz);
router.post("/updateQuiz", updateQuiz);

module.exports = router;
