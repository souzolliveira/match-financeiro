const router = require("express-promise-router")();
const expenseController = require("./controller");

router.get("/expenses", expenseController.listExpensesController);

router.post("/expense", expenseController.createExpenseController);

router.put("/expense", expenseController.editExpenseController);

router.delete("/expense", expenseController.deleteExpenseController);

module.exports = router;
