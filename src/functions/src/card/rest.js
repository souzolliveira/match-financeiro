const router = require("express-promise-router")();
const cardController = require("./controller");

router.get("/cards", cardController.listCardsController);

router.post("/card", cardController.createCardController);

router.put("/card", cardController.editCardController);

router.delete("/card", cardController.deleteCardController);

module.exports = router;
