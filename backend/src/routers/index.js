const express = require("express");
const router = express.Router();
//
const userRoute = require("./userRoute");
const cateRoute = require("./categoryRoute");
const bookRoute = require("./bookingRoute");
const prodRoute = require("./productRoute");
const importRoute = require("./importRoute");
const orderRoute = require("./orderRoute");
//
router.use("/user", userRoute);
//
router.use("/cate", cateRoute);
//
router.use("/book", bookRoute);
//
router.use("/prod", prodRoute);
//
router.use("/import", importRoute);
//
router.use("/order", orderRoute);

module.exports = router;
