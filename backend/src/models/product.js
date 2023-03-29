const mongoose = require("mongoose");
const schema = mongoose.Schema;
const productsSchema = new schema({
  thumbnail_prod: {
    type: String,
    default: null,
  },
  name_prod: {
    type: String,
    required: true,
  },
  code_prod: {
    type: String,
    unique: true,
  },
  cate_prod: {
    type: schema.Types.ObjectId,
    ref: "category",
  },
  quantity_prod: {
    type: Number,
    default: 0,
  },
  price_prod: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("product", productsSchema);
