const mongoose = require("mongoose");
const schema = mongoose.Schema;
const CategorySchema = new schema({
  name_cate: {
    type: String,
    required: true,
  },
  note_cate: {
    type: String,
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("category", CategorySchema);
