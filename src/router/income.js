const express = require("express");
const router = express.Router();
const incomeModule = require("../modules/incomeCrud");

router.get("/", incomeModule.getIncome);

router.post("/add", incomeModule.createIncome);

router.put("/update/:incomeId", incomeModule.updateIncome);

router.delete("/delete/:incomeId", incomeModule.deleteIncome);

module.exports = router;
