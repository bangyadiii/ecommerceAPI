const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");

router.post(
    "/signup",
    authController.validate("signup"),
    authController.signUp
);
router.post("/signin", authController.signIn);
router.get("/", authController.getUserById);

module.exports = router;
