const router = require("express-promise-router")();
const categoryController = require("./controller");

router.get("/category", categoryController.listCategoryController);

router.get(
  "/category/:transaction_type",
  categoryController.listCategoryController
);

router.post("/category", categoryController.createCategoryController);

router.put("/category", categoryController.editCategoryController);

router.delete("/category", categoryController.deleteCategoryController);

module.exports = router;
