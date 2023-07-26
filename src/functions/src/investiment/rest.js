const router = require("express-promise-router")();
const investimentController = require("./controller");

router.get("/investiments", investimentController.listInvestimentsController);

router.post("/investiment", investimentController.createInvestimentController);

router.put("/investiment", investimentController.editInvestimentController);

router.delete(
  "/investiment",
  investimentController.deleteInvestimentController
);

module.exports = router;
