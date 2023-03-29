const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bookSchema = new schema({
  name_book: {
    type: String,
    required: true,
  },
  note_book: {
    type: String,
  },
  status_book: {
    type: Number,
    default: 0,
  },
  id_order: {
    type: schema.Types.ObjectId,
    ref: "order",
    default: null,
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("book", bookSchema);
