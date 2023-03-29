require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./src/routers");
const mongoose = require("mongoose");
const USER = require("./src/models/user");
const pwHash = require("password-hash");
const CATEGORY = require("./src/models/category");
const BOOK = require("./src/models/book");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

async function connectDB() {
  try {
    let connect = await mongoose.connect("mongodb://localhost/quanlycafe?retryWrites=false");
    if (connect) {
      console.log("Kết nối thành công !");
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

connectDB();

async function seeder() {
  try {
    let find = await USER.findOne({ name_account: "admin" });
    if (!find) {
      await USER.create({
        name_user: "Admin",
        name_account: "admin",
        password_account: pwHash.generate("123456"),
        role_user: 2,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function seederCategory() {
  try {
    let find = await CATEGORY.findOne({ $or: [{ name_cate: "Đồ ăn" }, { name_cate: "Đồ uống" }] });
    if (!find) {
      await CATEGORY.create({
        name_cate: "Đồ ăn",
      });
      await CATEGORY.create({
        name_cate: "Đồ uống",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function seederTable() {
  try {
    let find = await BOOK.findOne({ name_book: "Bàn 1" });
    if (!find) {
      await BOOK.create({
        name_book: "Bàn 1",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

seeder();
seederCategory();
seederTable();

app.use(route);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`API server run on port: http://localhost:${process.env.PORT}/`));
