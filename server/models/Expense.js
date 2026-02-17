const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be a positive number"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: 64,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 280,
      default: "",
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
