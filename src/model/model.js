const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  dateTime: {
    type: Date,
    default: Date.now,
    minLength: 5,
    maxLength: 15,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  workSpace: {
    type: String,
    required: true,
    enum: ["personal", "office"],
  },
  description: {
    type: String,
    maxLength: 250,
    required: true,
  },
});

const expenseSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  dateTime: {
    type: Date,
    default: Date.now,
    minLength: 5,
    maxLength: 15,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  workSpace: {
    type: String,
    required: true,
    enum: ["personal", "office"],
  },
  description: {
    type: String,
    maxLength: 250,
    required: true,
  },
});

const Income = mongoose.model("income", incomeSchema);
const Expense = mongoose.model("expense", expenseSchema);
module.exports = { Income, Expense };
