const IMPORT = require("../models/import");
const postController = {
  // danh sách danh mục
  listImportProd: async (req, res) => {
    try {
      const importProd = await IMPORT.find()
        .populate({ path: "list_prod" })
        .sort({ created_at: -1 });

      if (!importProd) {
        return res.json({
          success: false,
          message: "Không có data của danh mục",
        });
      } else {
        return res.json({
          success: true,
          data: importProd,
        });
      }
    } catch (error) {
      console.log("err list importProd: ", error);
    }
  },

  // get 1 danh mục theo id
  getImportProd: async (req, res) => {
    try {
      const importProd_id = req.params.id;

      const get_importProd = await IMPORT.findById(importProd_id);

      return res.json({
        success: true,
        data: get_importProd,
      });
    } catch (error) {
      console.log("err get importProd: ", error);
    }
  },

  // thêm mới danh mục
  createImportProd: async (req, res) => {
    try {
      const { list_prod, quantity_prod, amount_prod } = req.body;

      const new_import = await IMPORT.create({
        list_prod: list_prod,
        quantity_prod: quantity_prod,
        amount_prod: amount_prod,
        created_at: Date.now(),
      });

      return res.json({
        success: true,
        message: "Tạo nhập hàng thành công !",
      });
    } catch (error) {
      console.log("err create Category: ", error);
    }
  },

  // update danh mục
  updateImportProd: async (req, res) => {
    try {
      const { name_cate, note_cate } = req.body;

      const importProd_id = req.params.id;

      const update_importProd = await IMPORT.findByIdAndUpdate(importProd_id, {
        $set: { name_cate, note_cate },
      });

      return res.json({
        success: true,
        message: "Cập nhật danh mục thành công !",
        data: update_importProd,
      });
    } catch (error) {
      console.log("err update importProd: ", error);
    }
  },

  // xoá danh mục
  deleteImportProd: async (req, res) => {
    try {
      const importProd_id = req.params.id;

      await IMPORT.findByIdAndDelete(importProd_id);

      return res.json({
        success: true,
        message: "Xoá danh mục thành công !",
      });
    } catch (error) {
      console.log("err deleta importProd: ", error);
    }
  },
};

module.exports = postController;
