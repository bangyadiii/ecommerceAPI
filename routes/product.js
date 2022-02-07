const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET ->
router.get("/", productController.getAll);

// create -> post
router.post("/create", productController.create);

module.exports = router;
