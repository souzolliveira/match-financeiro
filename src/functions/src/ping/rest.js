const express = require("express");

const router = express.Router();
const pingController = require("./controller");

router.get("/api", pingController.ping);
router.get("/api/ping", pingController.ping);

module.exports = router;
