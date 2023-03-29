const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ImportSchema = new schema({
  list_prod: [
    {
      type: schema.Types.ObjectId,
      ref: "product",
    },
  ],
  quantity_prod: {
    type: Number,
    default: 0,
  },
  amount_prod: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("import", ImportSchema);
