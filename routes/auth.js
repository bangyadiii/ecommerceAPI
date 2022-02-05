const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const authController = require("../controllers/authController");

router.post(
    "/signup",
    [
        body("username")
            .isLength({ min: 8 })
            .withMessage("username tidak valid"),
        body("email").isEmail().withMessage("Email tidak valid."),
        body("password")
            .isLength({ min: 8, max: 250 })
            .withMessage("Minimal 7 karakter dan 1 angka"),
    ],
    authController.signUp
);
router.post("/signin", authController.signIn);
router.get("/:id", authController.getNama);

module.exports = router;
