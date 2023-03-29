const mongoose = require("mongoose");
const schema = mongoose.Schema;
const UserSchema = new schema({
  avata_user: {
    type: String,
    default: null,
  },
  name_user: {
    type: String,
    required: true,
  },
  name_account: {
    type: String,
    required: true,
    unique: true,
  },
  password_account: {
    type: String,
    required: true,
  },
  role_user: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", UserSchema);
