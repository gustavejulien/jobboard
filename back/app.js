const express = require ("express");
require("dotenv").config();
const app = express();
const connectTodatabase = require("./config/connectToDatabase")
const bodyParser = require("body-parser");
const cors = require("cors")
const port = process.env.PORT;
const users = require("./controllers/users")
const ads = require("./controllers/ads")
const comp = require("./controllers/companies")
const appl = require("./controllers/applications")
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const auth = require('./middlewares/auth');
const admin = require('./middlewares/adminAuth')

// connectTodatabase()

app.use(bodyParser.json());

app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true")
    next();
});  

app.listen(port, () => console.log ("Server started on port "+port));

// Users routes
app.post("/createUser", users.createUser);
app.post("/login", users.verifyUser);
app.get("/logout", users.logout)
app.get("/getUser", auth, admin, users.getUser)
app.get("/getSelfUser", auth, users.getSelfUser)
app.get("/getAllUsers", auth, admin, users.getAllUsers)
app.post("/updateUser", auth, admin, users.updateUser)
app.post("/updateSelfUser", auth, users.updateSelfUser)
app.post("/deleteUser", auth, admin, users.deleteUser)
app.post("/deleteSelfUser", auth, users.deleteSelfUser)

// Job ads routes
app.post("/createAd", ads.createAd)
app.post("/getAd", ads.getAd)
app.post("/getAdsByCompanyId", ads.getAdsByCompanyId)
app.post("/getAllAds", ads.getAllAds)
app.post("/updateAd", auth, ads.updateAd)
app.post("/deleteAd", auth, ads.deleteAd)

// Companies CRUD
app.post("/createCompany", comp.createCompany)
app.post("/getCompany", comp.getCompany)
app.get("/getAllCompanies", comp.getAllCompanies)
app.post("/updateCompany", auth, comp.updateCompany)
app.post("/deleteCompany", auth, comp.deleteCompany)

// Applications CRUD
app.post("/createApplication", appl.createApplication)
app.get("/getApplication", auth, appl.getApplication)
app.get("/getAllApplications", auth, appl.getAllApplications)
app.get("/getUserApplications", auth, appl.getUserApplications)
app.get("/getRecruiterApplications", auth, appl.getRecruiterApplications)
app.post("/updateApplication", auth, appl.updateApplication)
app.post("/deleteApplication", auth, appl.deleteApplication)