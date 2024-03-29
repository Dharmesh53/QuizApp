const Quiz = require("../models/quiz");
const User = require("../models/user");
const mongoose = require("mongoose");

const createQuiz = async (req, res, next) => {
  try {
    const quiz = req.body;
    var _id = new mongoose.Types.ObjectId(quiz.id);

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("No user found");
    }
    const created = new Quiz({
      creator: _id,
      data: quiz.data,
      difficult: quiz.difficult,
      topics: quiz.topics,
    });
    await created.save();
    await User.updateOne({ _id: _id }, { $push: { quizzes: created._id } });

    return res.status(201).json({ msg: "Quiz Created Succesfully!!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Unexpected error occured !!", error: error.message });
  }
};

exports.createQuiz = createQuiz;