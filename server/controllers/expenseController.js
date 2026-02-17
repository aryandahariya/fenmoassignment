const Expense = require("../models/Expense");

const parseDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const createExpense = async (req, res, next) => {
  try {
    const { amount, category, description = "", date } = req.body;

    const normalizedAmount = Number(amount);
    if (Number.isNaN(normalizedAmount) || normalizedAmount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const parsedDate = parseDate(date);
    if (!parsedDate) {
      return res.status(400).json({ message: "Date is invalid" });
    }

    if (!category || !String(category).trim()) {
      return res.status(400).json({ message: "Category is required" });
    }

    const expense = await Expense.create({
      amount: normalizedAmount,
      category: String(category).trim(),
      description: String(description || "").trim(),
      date: parsedDate,
    });

    return res.status(201).json(expense);
  } catch (error) {
    return next(error);
  }
};

const getExpenses = async (req, res, next) => {
  try {
    const category = typeof req.query.category === "string" ? req.query.category.trim() : "";
    const sort = req.query.sort === "date_asc" ? "date_asc" : "date_desc";
    const query = {};

    if (category) {
      query.category = category;
    }

    const sortQuery = sort === "date_asc" ? { date: 1, createdAt: 1 } : { date: -1, createdAt: -1 };

    const expenses = await Expense.find(query).sort(sortQuery);
    return res.status(200).json(expenses);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createExpense,
  getExpenses,
};
