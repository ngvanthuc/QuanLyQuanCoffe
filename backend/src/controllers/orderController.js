const ORDER = require("../models/order");
const BOOK = require("../models/book");
const orderController = {
  // danh sách danh mục
  listOrder: async (req, res) => {
    try {
      const order = await ORDER.find()
        .populate("book_id")
        .populate("prod_id_list.id_prod")
        .sort({ status_order: 1 });
      if (!order) {
        return res.json({
          success: false,
          message: "Không có data của đơn hàng",
        });
      } else {
        return res.json({
          success: true,
          data: order,
        });
      }
    } catch (error) {
      console.log("err list order: ", error);
    }
  },

  // get 1 danh mục theo id
  getOrder: async (req, res) => {
    try {
      const order_id = req.params.id;

      const get_order = await ORDER.findOne({ _id: order_id }).populate(
        "prod_id_list.id_prod"
      );

      return res.json({
        success: true,
        data: get_order,
      });
    } catch (error) {
      console.log("err get order: ", error);
    }
  },
  updateStatusOrder: async (req, res) => {
    try {
      const status = req.body.status_order;
      const idOrder = req.params.id;
      const get_order = await ORDER.findOne({ _id: idOrder });
      const update = await ORDER.findOneAndUpdate(
        { _id: idOrder },
        { status_order: status }
      );
      if (status == 4) {
        await BOOK.findByIdAndUpdate(get_order.book_id, {
          $set: { status_book: 0 },
        });
      }

      if (!update) {
        return res.json({
          success: false,
          message: "Không cập nhật được trạng thái của đơn hàng !",
        });
      }

      return res.json({
        success: true,
        data: update,
      });
    } catch (error) {
      console.log("err update status order: ", error);
    }
  },

  updateTableBook: async (req, res) => {
    try {
      const { old_id, new_id, order_id } = req.body;
      const get_order = await ORDER.findOne({ _id: order_id });
      const get_book = await BOOK.findOne({ _id: new_id });
      get_order.book_id = new_id;
      get_order.name_order = get_book.name_book;
      get_order.save();

      const get_old_table = await BOOK.findOne({ _id: old_id });
      get_old_table.status_book = 0;
      get_old_table.id_order = null;
      get_old_table.save();

      const get_new_table = await BOOK.findOne({ _id: new_id });
      get_new_table.status_book = 1;
      get_new_table.id_order = order_id;
      get_new_table.save();

      return res.json({
        success: true,
        data: get_order,
      });
    } catch (error) {
      console.log("err get order: ", error);
      return res.status(500).send({ success: false, message: error.message });
    }
  },

  // thêm mới đơn hàng
  createOrder: async (req, res) => {
    try {
      const { name_order, quantity_order, price_order, prod_id_list, book_id } =
        req.body;

      const new_order = await ORDER.create({
        name_order: name_order,
        quantity_order: quantity_order,
        price_order: price_order,
        prod_id_list: prod_id_list,
        book_id: book_id,
        created_at: Date.now(),
      });

      const get_table = await BOOK.findOne({ _id: book_id });
      get_table.id_order = new_order._id;
      get_table.save();

      return res.json({
        success: true,
        message: "Tạo đơn hàng thành công !",
      });
    } catch (error) {
      console.log("err create order: ", error);
    }
  },

  // update danh mục
  updateOrder: async (req, res) => {
    try {
      const { name_cate, note_cate } = req.body;

      const order_id = req.params.id;

      const update_order = await ORDER.findByIdAndUpdate(order_id, {
        $set: { name_cate, note_cate},
      });

      return res.json({
        success: true,
        message: "Cập nhật danh mục thành công !",
        data: update_order,
      });
    } catch (error) {
      console.log("err update order: ", error);
    }
  },

  // xoá danh mục
  deleteOrder: async (req, res) => {
    try {
      const order_id = req.params.id;

      const get_order = await ORDER.findOne({ _id: order_id });

      const get_table = await BOOK.findByIdAndUpdate(get_order.book_id, {
        $set: { status_book: 0 },
      });

      await ORDER.findByIdAndDelete(order_id);

      return res.json({
        success: true,
        message: "Xoá danh mục thành công !",
      });
    } catch (error) {
      console.log("err deleta order: ", error);
    }
  },
};

module.exports = orderController;
