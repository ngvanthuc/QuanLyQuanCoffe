const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// danh sách category
router.get("/list-category", categoryController.listCategory);

// get 1 category theo id
router.get("/get-category/:id", categoryController.getCategory);

// tạo category
router.post("/create-category/create", categoryController.createCategory);

// cập nhật category
router.post("/update-category/update/:id", categoryController.updateCategory);

// xoá category
router.delete("/delete-category/delete/:id", categoryController.deleteCategory);

module.exports = router;
