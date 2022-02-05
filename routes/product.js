const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { body } = require("express-validator");

// GET ->
router.get("/", productController.getAll);

// create -> post
router.post(
    "/create",
    [
        body("nama_produk").isLength({ max: 200 }),
        body("deskripsi_singkat").isLength({ max: 250 }),
    ],
    productController.create
);

module.exports = router;
