const express = require("express");

const { createExpense, getExpenses } = require("../controllers/expenseController");

const router = express.Router();

router.route("/").post(createExpense).get(getExpenses);

module.exports = router;
