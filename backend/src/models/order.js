const mongoose = require("mongoose");
const schema = mongoose.Schema;

const prodList = new schema({
  id_prod: {
    type: schema.Types.ObjectId,
    ref: "product",
  },
  quantity_prod: {
    type: Number,
    default: 0,
  },
});

const orderSchema = new schema({
  name_order: {
    type: String,
  },
  quantity_order: {
    type: Number,
    default: 0,
  },
  price_order: {
    type: Number,
    default: 0,
  },
  prod_id_list: [prodList],
  book_id: {
    type: schema.Types.ObjectId,
    ref: "book",
  },
  status_order: {
    type: Number,
    default: 1, //1: mới, 2: đang xử lý, 3: hoàn thành, 4: đã thanh toán, 5: đã hủy
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("order", orderSchema);
