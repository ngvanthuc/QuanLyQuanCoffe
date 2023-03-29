const BOOKING = require("../models/book");
const bookingController = {
  // danh sách bàn
  listBooking: async (req, res) => {
    try {
      const booking = await BOOKING.find().sort({ created_at: 0 });

      if (!booking) {
        return res.json({
          success: false,
          message: "Không có data của bàn trống",
        });
      } else {
        return res.json({
          success: true,
          data: booking,
        });
      }
    } catch (error) {
      console.log("err list booking: ", error);
    }
  },

  //
  listBookingNoActive: async (req, res) => {
    try {
      const listBook = await BOOKING.find({ status_book: 0 });
      return res.json({
        success: true,
        data: listBook,
      });
    } catch (error) {
      console.log("err list booking: ", error);
    }
  },

  // get 1 bàn theo id
  getBooking: async (req, res) => {
    try {
      const booking_id = req.params.id;

      const get_booking = await BOOKING.findById(booking_id);

      return res.json({
        success: true,
        data: get_booking,
      });
    } catch (error) {
      console.log("err get booking: ", error);
    }
  },

  // thêm mới danh mục
  createBooking: async (req, res) => {
    try {
      const { name_book, note_book } = req.body;

      const new_booking = await BOOKING.create({
        name_book: name_book,
        note_book: note_book,
        created_at: Date.now(),
      });

      return res.json({
        success: true,
        message: "Thêm bàn trống thành công !",
      });
    } catch (error) {
      console.log("err create booking: ", error);
    }
  },

  // update danh mục
  updateBooking: async (req, res) => {
    try {
      const { name_book, note_book, status_book } = req.body;

      const booking_id = req.params.id;

      const update_booking = await BOOKING.findByIdAndUpdate(booking_id, {
        $set: { name_book, note_book, status_book },
      });

      return res.json({
        success: true,
        message: "Cập nhật bàn thành công !",
        data: update_booking,
      });
    } catch (error) {
      console.log("err update booking: ", error);
    }
  },

  // xoá danh mục
  deleteBooking: async (req, res) => {
    try {
      const booking_id = req.params.id;

      await BOOKING.findByIdAndDelete(booking_id);

      return res.json({
        success: true,
        message: "Xoá bàn thành công !",
      });
    } catch (error) {
      console.log("err deleta booking: ", error);
    }
  },
};

module.exports = bookingController;
