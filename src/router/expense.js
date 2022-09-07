const express = require("express");
const router = express.Router();
const expenseModule = require("../modules/expenseCrud");

router.get("/", expenseModule.getExpense);

router.post("/add", expenseModule.createExpense);

router.put("/update/:expenseId", expenseModule.updateExpense);

router.delete("/delete/:expenseId", expenseModule.deleteExpense);

module.exports = router;
