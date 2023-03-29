const express = require("express");
const router = express.Router();
const billsController = require("../controllers/billController");

// danh sách bill
router.get("/bill", billsController.getbills);

// get 1 bill theo id
router.get("/get-bill/:id", billsController.getBill);

// tạo bill
router.post("/bill/create", billsController.createBill);

// cập nhật bill
router.post("/bill/update/:id", billsController.updateBill);

// xoá bill
router.delete("/bill/delete/:id", billsController.deleteBill);

module.exports = router;
