const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// danh sách order
router.get("/list-order", orderController.listOrder);

// get 1 order theo id
router.get("/get-order/:id", orderController.getOrder);

//
router.post("/switch-order", orderController.updateTableBook);

// tạo order
router.post("/create-order/create", orderController.createOrder);

// cập nhật order
router.post("/update-order/update/:id", orderController.updateStatusOrder);

// xoá order
router.delete("/delete-order/delete/:id", orderController.deleteOrder);

module.exports = router;
