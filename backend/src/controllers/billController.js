const BILL = require("../models/order");
const PRODUCT = require("../models/product");
const billsController = {
  // danh sách phiếu xuất
  getbills: async (req, res) => {
    try {
      const data = await BILL.find()
        .populate({ path: "product_id" })
        .sort({ created_at: -1 });

      if (!data) {
        return res.json({
          success: false,
          message: "Không có data của phiếu xuất",
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

  // get 1 phiếu xuất theo id
  getBill: async (req, res) => {
    try {
      const idBill = req.params.id;

      const data = await BILL.findById(idBill);

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

  // thêm mới phiếu xuất
  createBill: async (req, res) => {
    try {
      const { amount, status, created_at, quantily, product_id } = req.body;

      const newBill = await BILL.create({
        product_id,
        amount,
        status,
        created_at,
        quantily,
      });

      return res.json({
        success: true,
        message: "Thêm phiếu xuất thành công !",
        data: newBill,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Thêm phiếu xuất thất bại !",
      });
    }
  },

  // update phiếu xuất
  updateBill: async (req, res) => {
    try {
      const { product_id, amount, status, created_at, quantily } = req.body;

      const idBill = req.params.id;

      const data = await BILL.findByIdAndUpdate(idBill, {
        $set: { product_id, amount, status, created_at, quantily },
      });

      return res.json({
        success: true,
        message: "Cập nhật phiếu xuất thành công !",
        data: data,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Cập nhật thất bại !",
      });
    }
  },

  // xoá phiếu xuất
  deleteBill: async (req, res) => {
    try {
      const idBill = req.params.id;

      await BILL.findByIdAndDelete(idBill);

      return res.json({
        success: true,
        message: "Xoá phiếu xuất thành công !",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Xoá phiếu xuất thất bại !",
      });
    }
  },
};

module.exports = billsController;
