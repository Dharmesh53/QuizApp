const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
  creator: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  difficult: {
    type: String,
    required: true,
  },
  topics: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
