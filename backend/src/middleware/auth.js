const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const header = req.header("auth");

  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(403).send("Xác nhận tài khoản thất bại !");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Token không hợp lệ !");
  }
  return next();
};
module.exports = auth;
