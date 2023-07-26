const router = require("express-promise-router")();
const userController = require("./controller");

router.get("/user", userController.getUserController);

router.post("/register", userController.createUserController);

router.put("/user", userController.editUserController);

router.delete("/user", userController.deleteUserController);

module.exports = router;
