const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.index);
router.post("/", categoryController.create);
router.get("/:id", categoryController.getOne);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.destroy);

module.exports = router;
