const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ObjectId = require('mongodb').ObjectID

dotenv.config();
app.use(express.json());

exports.createCompany = async (req, res, next) => {
    dbo.collection("companies").findOne({name: req.body.name}, async function(err, company) {
        if (company) {
            return res.status(403).json({
                error: "This company name is already used."
            });
        }
        if (err) res.status(400).json(err)
        dbo.collection("companies").insertOne(req.body, function(err, result){
            if (err) throw err
            res.status(200).json({ message: "Company registration complete." });
        })
    })
}

exports.getCompany = (req, res) => {
    let id = new ObjectId(req.body._id)
    console.log(req.body);
    dbo.collection("companies").findOne({_id: id}, async function(err, company) {
        if (err) {
            console.log(err)
            throw err
        } else {
            res.json({company: company})
        }
    })
}

exports.getAllCompanies = (req, res) => {
    let limit = 0
    if(req.body.limit){
        limit = req.body.limit
    }
    dbo.collection("companies").find().limit(limit).toArray(function(err, companies) {
        if (err) throw err
        res.json({companies: companies})
    });
}

exports.updateCompany = (req, res) => {
    const id = new ObjectId(req.body._id)
    dbo.collection("companies").findOne({_id: id}, function(err, company) {
        if (err || !company){
            return res.status(400).json({
                error: "id not found"
            })
        } else {
            delete req.body._id
            console.log(req.body)
            dbo.collection("companies").findOneAndUpdate({_id: id}, {$set: req.body}, function(err, result){
                if(err) res.send(err)
                else res.json("Company updated.")
            })
        }
    });
};

exports.deleteCompany = (req, res) => {
    const id = new ObjectId(req.body._id)
    dbo.collection("companies").remove({_id: id}, function(err, company) {
        if (err || !company){
            console.log(err)
            return res.status(400).json({
                error: "id doesn't exist."
            })
        } else {
            res.json("Company deleted")
        }
    });
}
