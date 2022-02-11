const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");
const { refreshToken } = require("../controllers/refreshToken");

router.post(
    "/signup",
    authController.validate("signup"),
    authController.signUp
);
router.post("/signin", authController.signIn);
router.get("/token", refreshToken);
router.get("/", authController.getUserByUsername);

module.exports = router;
