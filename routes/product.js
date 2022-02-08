const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET ->
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);

// create -> post
router.post(
    "/",
    productController.validate("create-product"),
    productController.create
);

//update
router.put("/", productController.update);

router.delete("/:id", productController.destroy);

module.exports = router;
