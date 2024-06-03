const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  is_correct: { type: Boolean, required: true, default: false }
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [optionSchema], required: true },
  attempted: { type: Number, default: 0 },
  answered_correctly: { type: Number, default: 0 },
  answered_incorrectly: { type: Number, default: 0 }
});

const quizSchema = new mongoose.Schema({
  user_email: { type: String, required: true },
  quiz_id: { type: String, required: true },
  quiz_name: { type: String, required: true },
  quiz_type: { type: String, required: true },
  created_date: { type: Date, required: true },
  questions: { type: [questionSchema], required: true },
  impression_count: { type: Number, default: 0 }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;