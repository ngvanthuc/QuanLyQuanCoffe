const CATEGORY = require("../models/category");
const categoryController = {
  // danh sách danh mục
  listCategory: async (req, res) => {
    try {
      const category = await CATEGORY.find().sort({ created_at: -1 });

      if (!category) {
        return res.json({
          success: false,
          message: "Không có data của danh mục",
        });
      } else {
        return res.json({
          success: true,
          data: category,
        });
      }
    } catch (error) {
      console.log("err list Category: ", error);
    }
  },

  // get 1 danh mục theo id
  getCategory: async (req, res) => {
    try {
      const category_id = req.params.id;

      const get_category = await CATEGORY.findById(category_id);

      return res.json({
        success: true,
        data: get_category,
      });
    } catch (error) {
      console.log("err get Category: ", error);
    }
  },

  // thêm mới danh mục
  createCategory: async (req, res) => {
    try {
      const { name_cate, note_cate } = req.body;

      const new_category = await CATEGORY.create({
        name_cate: name_cate,
        note_cate: note_cate,
        created_at: Date.now(),
      });

      return res.json({
        success: true,
        message: "Tạo danh mục thành công !",
      });
    } catch (error) {
      console.log("err create Category: ", error);
    }
  },

  // update danh mục
  updateCategory: async (req, res) => {
    try {
      const { name_cate, note_cate } = req.body;

      const category_id = req.params.id;

      const update_category = await CATEGORY.findByIdAndUpdate(category_id, {
        $set: { name_cate, note_cate },
      });

      return res.json({
        success: true,
        message: "Cập nhật danh mục thành công !",
        data: update_category,
      });
    } catch (error) {
      console.log("err update Category: ", error);
    }
  },

  // xoá danh mục
  deleteCategory: async (req, res) => {
    try {
      const category_id = req.params.id;

      await CATEGORY.findByIdAndDelete(category_id);

      return res.json({
        success: true,
        message: "Xoá danh mục thành công !",
      });
    } catch (error) {
      console.log("err deleta Category: ", error);
    }
  },
};

module.exports = categoryController;
