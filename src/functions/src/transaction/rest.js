const router = require("express-promise-router")();
const transactionController = require("./controller");

router.get("/transactions", transactionController.listTransactionsController);

router.get(
  "/transactions/last-update",
  transactionController.lastUpdateController
);

module.exports = router;
