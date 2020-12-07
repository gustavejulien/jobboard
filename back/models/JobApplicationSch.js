const mongoose = require('mongoose')
const Ad = require('./AdSch')
const User = require('./UserSch')
const Schema = mongoose.Schema

const JobAppSchema = new Schema({
    
    id: {type: Number},

    user_id: { type: Number },

    ad_id: { type: Number },

    status: { type: String },

    message: { type: String }

}, {
    versionKey: false
})

const JobApp = mongoose.model('JobApp', JobAppSchema)
module.exports =  JobApp