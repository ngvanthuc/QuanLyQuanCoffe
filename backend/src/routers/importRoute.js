const express = require("express");
const router = express.Router();
const importController = require("../controllers/importController");

// danh sách import
router.get("/list-import", importController.listImportProd);

// get 1 import theo id
router.get("/get-import/:id", importController.getImportProd);

// tạo import
router.post("/create-import/create", importController.createImportProd);

// cập nhật import
router.post("/update-import/update/:id", importController.updateImportProd);

// xoá import
router.delete("/delete-import/delete/:id", importController.deleteImportProd);

module.exports = router;
