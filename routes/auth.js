const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");
const { refreshToken } = require("../controllers/refreshToken");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/token", refreshToken);
router.get("/", authController.getUserByUsername);
router.get("/transaksi", verifyToken, authController.getTransactions);
router.delete("/logout", authController.logout);

module.exports = router;
