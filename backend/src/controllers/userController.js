const USER = require("../models/user");
const pwHash = require("password-hash");
const jwt = require("jsonwebtoken");
const userController = {
  // danh sách người dùng
  listUser: async (req, res) => {
    try {
      const users = await USER.find().sort({ created_at: -1 });

      if (!users) {
        return res.json({
          success: false,
          message: "Không có data của người dùng",
        });
      } else {
        return res.json({
          success: true,
          data: users,
        });
      }
    } catch (error) {
      console.log("err list user: ", error);
    }
  },

  // get 1 người dùng theo id
  getUser: async (req, res) => {
    try {
      const user_id = req.params.id;

      const get_user = await USER.findById(user_id);

      return res.json({
        success: true,
        data: get_user,
      });
    } catch (error) {
      console.log("err get user: ", error);
    }
  },

  // thêm mới người dùng
  createUser: async (req, res) => {
    try {
      const {
        avata_user,
        name_user,
        name_account,
        password_account,
        role_user,
      } = req.body;

      const check_email = await USER.findOne({ name_account: name_account });

      if (check_email) {
        return res.json({
          success: false,
          message: "Tên tài khoản này đã tồn tại !",
        });
      }

      const new_user = await USER.create({
        avata_user: avata_user,
        name_user: name_user,
        name_account: name_account.toLowerCase(),
        password_account: pwHash.generate(password_account),
        role_user: role_user,
        created_at: Date.now(),
      });
      const token = jwt.sign({ user_id: new_user._id }, process.env.TOKEN_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return res.json({
        success: true,
        message: "Tạo người dùng thành công !",
        token: token,
        role: role_user,
      });
    } catch (error) {
      console.log("err create user: ", error);
    }
  },

  // update người dùng
  updateUser: async (req, res) => {
    try {
      const {
        avata_user,
        name_user,
        name_account,
        password_account,
        role_user,
      } = req.body;

      const user_id = req.params.id;

      const data = await USER.findByIdAndUpdate(user_id, {
        $set: {
          avata_user,
          name_user,
          name_account: name_account.toLowerCase(),
          password_account: pwHash.generate(password_account),
          role_user,
          created_at: Date.now(),
        },
      });

      return res.json({
        success: true,
        message: "Cập nhật người dùng thành công !",
        data: data,
      });
    } catch (error) {
      console.log("err update user: ", error);
    }
  },

  // xoá người dùng
  deleteUser: async (req, res) => {
    try {
      const user_id = req.params.id;

      await USER.findByIdAndDelete(user_id);

      return res.json({
        success: true,
        message: "Xoá người dùng thành công !",
      });
    } catch (error) {
      console.log("err deleta user: ", error);
    }
  },

  // đăng nhập
  signIn: async (req, res) => {
    try {
      const { name_account, password_account } = req.body;

      const user = await USER.findOne({ name_account: name_account });

      if (!user) {
        return res.json({
          success: false,
          message: "Đăng nhập thất bại !",
        });
      }

      const hashedPW = user.password_account;

      if (user && pwHash.verify(password_account, hashedPW)) {
        const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const auth = {
          checkAuth: true,
          nameUser: user.name_user,
          checkRole: user.role_user,
          userID: user._id,
        };

        return res.json({
          success: true,
          message: "Đăng nhập thành công !",
          data: auth,
          token: token,
        });
      }
    } catch (error) {
      console.log("err sign-in user: ", error);
    }
  },
};

module.exports = userController;
