const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/", verifyToken, transactionController.create);

module.exports = router;
