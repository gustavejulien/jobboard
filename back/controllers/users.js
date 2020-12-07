const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("../config/connectToDatabase")
const getId = require("../misc/getId")
dotenv.config();
const ObjectId = require('mongodb').ObjectID

exports.createUser = async (req, res, next) => {
    const email = req.body.email;
    dbo.collection("users").findOne({email: email}, async function(err, user) {
        if (user) {
            return res.status(403).json({
                error: "This email is already used."
            });
        }
        console.log(err)
        if (err) res.status(400).json(err)
        bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
            req.body.password = encrypted
            delete req.body.confirmPassword
            dbo.collection("users").insertOne(req.body, function(err, result){
                if (err) throw err
                res.status(200).json({ message: "Registration complete." });
            })
        })
    })
}

exports.verifyUser = (req, res) => {
    const { email, password } = req.body
    dbo.collection("users").findOne({email: email}, function(err, user) {
        if (err || !user){
            return res.status(400).json({
                error: "Email doesn't exist."
            })
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result == false){
                return res.status(400).json({
                    error: "Wrong password."
                })
            }
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: "24h" });            
            const {_id, name, email} = user
            res.cookie('token', token, { httpOnly: true })
            res.cookie('status', user.status, {httpOnly: false})
            res.cookie('firstName', user.firstName, {httpOnly: false})
            res.cookie('lastName', user.lastName, {httpOnly: false})
            res.cookie('email', user.email, {httpOnly: false})
            
            return res.json({user: {_id, email, name}, token: token});
        });
    });  
};

exports.logout = (req, res) => {
    res.clearCookie('token')
    res.clearCookie('status')
    res.clearCookie('firstName')
    res.clearCookie('lastName')
    res.clearCookie('email')
    res.json("Logged out, cookies deleted.")
}

exports.getUser = (req, res) => {
    const email = req.body.email;
    dbo.collection("users").findOne({email: email}, function(err, user) {
        if (err) {
            console.log(err)
            throw err
        } else {
            res.json({user: user})
        }
    })
}

exports.getSelfUser = async (req, res) => {
    let id = getId.getId(req, res);
    id = new ObjectId(id)
    dbo.collection("users").find({_id: id}).toArray().then((user) => {
        user[0].password = undefined
        res.json(user[0])
    });
    
}

exports.verifyUserId = function (req, res, id) {
    id = new ObjectId(id)
    return new Promise((resolve, reject)=>{ dbo.collection("users").find({_id: id}, function (err, user) {
        if(err) throw err;
        resolve(user)
    })
})
}

exports.getAllUsers = (req, res) => {
    let limit = 0
    if(req.body.limit){
        limit = req.body.limit
    }
    dbo.collection("users").find(limit).limit(limit).toArray(function(err, users) {
        if (err) throw err
        res.json({users: users})
    });
}

exports.updateSelfUser = (req, res) => {
    console.log("update user")
    id = new ObjectId(req.body._id)
    dbo.collection("users").findOne({_id: id}, function(err, user) {
        if (err || !user){
            console.log("id not found")
            return res.status(400).json({
                error: "id not found"
            })
        }
        console.log("id verified")
        bcrypt.compare(req.body.oldPassword, user.password, function(err, result) {
            if(result === false || result === undefined){
                console.log("wrong password")
                return res.status(400).json({
                    error: "Wrong password."
                })
            }
            console.log("password verified")
            
            if(!req.body.newPassword){
                console.log("if nos password")
                req.body.password = req.body.oldPassword
            }
            else {
                req.body.password = req.body.newPassword
            }
            
            bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
                req.body.password = encrypted
                delete req.body.confirmPassword
                delete req.body.confirmNewPassword
                delete req.body.oldPassword
                delete req.body.newPassword
                delete req.body._id
                
                dbo.collection("users").findOneAndUpdate({_id: id}, {$set: req.body}, function(err, result){
                    if(err){
                        console.log("update failed")
                        res.send(err)
                    }
                    else {
                        res.json("User updated.")
                    }
                })
            })
        })
    });
};

exports.updateUser = (req, res) => {
    id = new ObjectId(req.body._id)
    delete req.body._id
    dbo.collection("users").findOne({_id: id}, function(err, user) {
        if (err || !user){
            console.log("id not found")
            return res.status(400).json({
                error: "id not found"
            })
        }
        console.log("id verified")
        if(req.body.password){
            bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
                req.body.password = encrypted
                dbo.collection("users").findOneAndUpdate({_id: id}, {$set: req.body}, function(err, result){
                    if(err){
                        console.log("update failed")
                        res.send(err)
                    }
                    else {
                        console.log("result")
                        res.json("User updated.")
                    }
                })
            })
        } else {
            dbo.collection("users").findOneAndUpdate({_id: id}, {$set: req.body}, function(err, result){
                if(err){
                    console.log("update failed")
                    res.send(err)
                }
                else {
                    console.log("result")
                    res.json("User updated.")
                }
            })
        }
    })
};


exports.deleteUser = (req, res) => {
    id = new ObjectId(req.body._id)
    dbo.collection("users").remove({_id: id}, function(err, user) {
        if (err || !user){
            console.log(err)
            return res.status(400).json({
                error: "id doesn't exist."
            })
        } else {
            res.json("User deleted")
        }
    });
}

exports.deleteSelfUser = (req, res) => {
    console.log("delete user")
    id = new ObjectId(req.body._id)
    
    dbo.collection("users").findOne({_id: id}, function(err, user) {
        if (err || !user){
            console.log("id not found")
            return res.status(400).json({
                error: "id not found"
            })
        }
        console.log("id verified")
        bcrypt.compare(req.body.oldPassword, user.password, function(err, result) {
            if(result === false || result === undefined){
                console.log("wrong password")
                return res.status(400).json({
                    error: "Wrong password."
                })
            }
            console.log("password verified")
            
            dbo.collection("users").deleteOne({_id: id}, function(err, user) {
                if (err || !user){
                    console.log(err)
                    return res.status(400).json({
                        error: "id doesn't exist."
                    })
                } else {
                    res.json("User deleted")
                }
            });
        })
    })
}

exports.verifyAdminStatus = (req, res, id) => {
    id = new ObjectId(id)
    return new Promise((resolve, reject)=>{ dbo.collection("users").findOne({_id: id, status:"admin"}, function (err, user) {
        if(err) throw err;
        resolve(user)
    })
})
}