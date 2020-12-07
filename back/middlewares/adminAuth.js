const jwt = require('jsonwebtoken');
const users = require('../controllers/users');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;

    if (!await users.verifyAdminStatus(req, res, userId)) {
      console.log('user is not an admin')
      throw 'Invalid user ID';
    } else {
      console.log('Admin Id verified: '+userId)
      next();
    }
  } catch {
    console.log("Unauthorized request")
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
