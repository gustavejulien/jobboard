const jwt = require('jsonwebtoken');
const users = require('../controllers/users');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;
    
    if (!await users.verifyUserId(req, res, userId)) {
      console.log('auth failed')
      throw 'Invalid user ID';
    } else {
      console.log('Id verified: '+userId)
      next();
    }
  } catch {
    console.log("Unauthorized request")
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
