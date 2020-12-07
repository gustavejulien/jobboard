const MongoClient = require('mongodb').MongoClient;
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.MONGO_URI;

MongoClient.connect(url, {

    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    console.log("Connection to database initiated. Let's get ready to requeeeest!")
    global.dbo = db.db('portevitree');
  });   