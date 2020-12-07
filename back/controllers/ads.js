const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ObjectId = require('mongodb').ObjectID

dotenv.config();
app.use(express.json());

exports.createAd = async (req, res, next) => {
    dbo.collection("ads").insertOne(req.body, function(err, result){
        if (err) throw err
        res.status(200).json({ message: "Ad registration complete." });
    })
}

exports.getAd = (req, res) => {
    const id = new ObjectId(req.body._id)
    dbo.collection("ads").findOne({_id: id}, async function(err, ad) {
        if (err) {
            console.log(err)
            throw err
        } else {
            res.json({ad: ad})
        }
    })
}

exports.getAdsByCompanyId = (req, res) => {
    dbo.collection("ads").find({id_company: req.body._id}).toArray(function(err, ads) {
        if (err) throw err
        else res.json({ads: ads})
    });
    
}

exports.getAllAds = (req, res) => {
    let limit = 0
    if(req.body.limit){
        limit = req.body.limit
    }
    dbo.collection("ads").find().limit(limit).toArray(function(err, ads) {
        if (err) throw err
        res.json({ads: ads})
    });
}

exports.updateAd = (req, res) => {
    const id = new ObjectId(req.body._id)
    dbo.collection("ads").findOne({_id: id}, function(err, ad) {
        if (err || !ad){
            return res.status(400).json({
                error: "id not found"
            })
        }
        else {
            delete req.body._id
            dbo.collection("ads").findOneAndUpdate({_id: id}, {$set: req.body}, function(err, result){
                if(err) res.send(err)
                else res.json("Ad updated.")
            })
        }
    });
};

exports.deleteAd = (req, res) => {
    const id = new ObjectId(req.body._id)
    dbo.collection("ads").remove({_id: id}, function(err, ad) {
        if (err || !ad){
            console.log(err)
            return res.status(400).json({
                error: "id doesn't exist."
            })
        } else {
            res.json("Ad deleted")
        }
    });
}