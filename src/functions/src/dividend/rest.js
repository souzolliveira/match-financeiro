const router = require("express-promise-router")();
const dividendController = require("./controller");

router.get("/dividends", dividendController.listDividendsController);

router.post("/dividend", dividendController.createDividendController);

router.put("/dividend", dividendController.editDividendController);

router.delete("/dividend", dividendController.deleteDividendController);

module.exports = router;
