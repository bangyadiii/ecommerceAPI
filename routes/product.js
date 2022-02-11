const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middleware/verifyToken");

// GET ->
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);

// create -> post
router.post("/", verifyToken, productController.create);

//update
router.put("/:id", verifyToken, productController.update);

router.delete("/:id", verifyToken, productController.destroy);

module.exports = router;
