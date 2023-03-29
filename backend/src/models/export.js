const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ExportSchema = new schema({
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
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("export", ExportSchema);
