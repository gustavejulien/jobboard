const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { application } = require("express");
const ObjectId = require('mongodb').ObjectID
const mailing = require("../misc/mailing")
const getId = require("../misc/getId")

dotenv.config();
app.use(express.json());

exports.createApplication = async (req, res, next) => {
    const email = req.cookies.email || req.body.email
    const ad_id = req.body.ad_id
    const message = req.body.message
    dbo.collection("applications").insertOne(req.body, function(err, result){
        if (err) throw err
        res.status(200).json({ message: "Application registration complete." });
        mailing.mailing(email, ad_id, message)
    })
}

exports.getApplication = (req, res) => {
    const criteria = req.body.criteria
    dbo.collection("applications").findOne(criteria, async function(err, application) {
        if (err) {
            console.log(err)
            throw err
        } else {
            res.json({application: application})
        }
    })
}

exports.getApplicationById = (req, res) => {
    const id = new ObjectId(req.body._id)
    dbo.collection("applications").findOne({_id: id}, async function(err, application) {
        if (err) {
            console.log(err)
            throw err
        } else {
            res.json({application: application})
        }
    })
}

exports.getAllApplications = (req, res) => {
    let limit = 0
    if(req.body.limit){
        limit = req.body.limit
    }
    dbo.collection("applications").find().limit(limit).toArray(function(err, applications) {
        if (err) throw err
        res.json({applications: applications})
    });
}

exports.getUserApplications = (req, res) => {
    let limit = 0
    if(req.body.limit){
        limit = req.body.limit
    }
    dbo.collection("applications").find({email: req.cookies.email}).limit(limit).toArray(function(err, applications) {
        if (err) throw err
        res.json({applications: applications})
    });
}

exports.updateApplication = (req, res) => {
    const id = new ObjectId(req.body._id)
    dbo.collection("applications").findOne({_id: id}, function(err, application) {
        if (err || !application){
            return res.status(400).json({
                error: "id not found"
            })
        } else {
            delete req.body._id
            dbo.collection("applications").findOneAndUpdate({_id: application._id}, {$set: req.body}, function(err, result){
                if(err) res.send(err)
                res.json("Ad updated.")
            })
        }
    });
};

exports.deleteApplication = (req, res) => {
    const id = new ObjectId(req.body._id)
    dbo.collection("applications").remove({_id: id}, function(err, application) {
        if (err || !application){
            console.log(err)
            return res.status(400).json({
                error: "id doesn't exist."
            })
        } else {
            res.json("Application deleted")
        }
    });
}

exports.getRecruiterApplications = async (req, res) => {
    
    const companyId = await new Promise((resolve) => {
        let id = getId.getId(req, res);
        id = new ObjectId(id)
        dbo.collection("users").findOne({_id: id}, async function(err, user) {
            if (err) {
                console.log(err)
                throw err
            } else {
                resolve(user.company)
            }
        })
    })
    console.log(companyId)
    dbo.collection("ads").find({id_company: companyId}).toArray(async function(err, ads) {
        if (err) throw err
        else {
            let appArray = [];
            for(i = 0; i < ads.length; i++){
                appArray[i] = await new Promise((resolve) => {
                    const id = String(ads[i]._id)
                    dbo.collection("applications").findOne({ad_id: id}, function(err, application) {
                        if (err) {
                            console.log(err)
                            throw err
                        } else {
                            resolve(application)
                        }
                    })
                })
            }
            appArray = appArray.filter(function (element) {
                return element !== null
            })
            res.status(200).json(appArray)
        }
    });
}