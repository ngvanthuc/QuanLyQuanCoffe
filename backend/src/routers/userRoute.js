const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// đăng nhập
router.post("/sign-in", userController.signIn);

// danh sách user
router.get("/list-user", userController.listUser);

// get 1 user theo id
router.get("/get-user/:id", userController.getUser);

// tạo user
router.post("/create-user/create", userController.createUser);

// cập nhật user
router.post("/update-user/update/:id", userController.updateUser);

// xoá user
router.delete("/delete-user/delete/:id", userController.deleteUser);

module.exports = router;
