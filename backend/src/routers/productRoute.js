const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productController");

// danh sách product
router.get("/list-product", productsController.getProducts);

// get 1 product theo id
router.get("/get-product/:id", productsController.getProduct);

// tạo product
router.post("/product-create/create", productsController.createProduct);

// cập nhật product
router.post("/product-update/update/:id", productsController.updateProduct);

// xoá product
router.delete("/product-delete/delete/:id", productsController.deleteProduct);

// cập nhật quantity product
router.post("/product-update/quantity/:id", productsController.updateQuantity);

// list export
router.get("/list-export", productsController.listExport);
module.exports = router;
