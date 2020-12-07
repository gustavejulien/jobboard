const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

exports.getId = (req, res) => {
  const token = req.cookies.token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken._id;
  return userId;
}