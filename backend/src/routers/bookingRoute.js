const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// danh sách booking
router.get("/list-booking", bookingController.listBooking);

// 
router.get("/list-booking-active", bookingController.listBookingNoActive);

// get 1 booking theo id
router.get("/get-booking/:id", bookingController.getBooking);

// tạo booking
router.post("/create-booking/create", bookingController.createBooking);

// cập nhật booking
router.post("/update-booking/update/:id", bookingController.updateBooking);

// xoá booking
router.delete("/delete-booking/delete/:id", bookingController.deleteBooking);

module.exports = router;
