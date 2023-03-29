const PRODUCT = require("../models/product");
const EXPORT = require("../models/export");

const productsController = {
  // danh sách đồ uống
  getProducts: async (req, res) => {
    try {
      const data = await PRODUCT.find().populate({ path: "cate_prod" }).sort({ created_at: -1 });

      if (!data) {
        return res.json({
          success: false,
          message: "Không có data của đồ uống",
        });
      } else {
        return res.json({
          success: true,
          data: data,
        });
      }
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  },

  // get 1 đồ uống theo id
  getProduct: async (req, res) => {
    try {
      const idProduct = req.params.id;

      const data = await PRODUCT.findById(idProduct).populate({
        path: "cate_prod",
      });

      return res.json({
        success: true,
        data: data,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  },

  // thêm mới đồ uống
  createProduct: async (req, res) => {
    try {
      const { thumbnail_prod, name_prod, code_prod, cate_prod, quantity_prod, price_prod } = req.body;

      const newProduct = await PRODUCT.create({
        thumbnail_prod,
        name_prod,
        code_prod,
        cate_prod,
        quantity_prod,
        price_prod,
        created_at: Date.now(),
      });

      return res.json({
        success: true,
        message: "Thêm đồ uống thành công !",
        data: newProduct,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Thêm đồ uống thất bại !",
      });
    }
  },

  // update đồ uống
  updateProduct: async (req, res) => {
    try {
      const { thumbnail_prod, name_prod, code_prod, cate_prod, quantity_prod, price_prod } = req.body;

      const idProduct = req.params.id;

      const data = await PRODUCT.findByIdAndUpdate(idProduct, {
        $set: {
          thumbnail_prod,
          name_prod,
          code_prod,
          cate_prod,
          quantity_prod,
          price_prod,
          created_at: Date.now(),
        },
      });

      return res.json({
        success: true,
        message: "Cập nhật đồ uống thành công !",
        data: data,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Cập nhật thất bại !",
      });
    }
  },

  // xoá đồ uống
  deleteProduct: async (req, res) => {
    try {
      const idProduct = req.params.id;

      await PRODUCT.findByIdAndDelete(idProduct);

      return res.json({
        success: true,
        message: "Xoá đồ uống thành công !",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Xoá đồ uống thất bại !",
      });
    }
  },

  // cập nhật quantity đồ uống
  updateQuantity: async (req, res) => {
    try {
      const _id = req.params.id;
      const { quantity_prod } = req.body;
      if (!_id) return res.status(400).json({ success: false, message: "Đã có lỗi xảy ra !!!" });
      const update = await PRODUCT.findByIdAndUpdate(
        { _id },
        {
          $inc: {
            quantity_prod: -quantity_prod,
          },
        }
      );
      if (update) {
        let exportProduct = productsController.createExport(update, quantity_prod);
        if (exportProduct) {
          return res.json({
            success: true,
            message: "Đã cập nhật số lượng sản phẩm !",
            data: update,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  createExport: async (idProduct, quantityProduct) => {
    try {
      const newExport = await EXPORT.create({
        list_prod: idProduct,
        quantity_prod: quantityProduct,
        created_at: Date.now(),
      });

      return newExport;
    } catch (error) {
      return console.log(error);
    }
  },
  listExport: async (req, res) => {
    try {
      const data = await EXPORT.find().populate({ path: "list_prod" }).sort({ created_at: -1 });

      return res.json({
        success: true,
        data: data,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  },
};

module.exports = productsController;
