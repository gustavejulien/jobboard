const mongoose = require('mongoose')
const Company = require('./CompanySch')
const Schema = mongoose.Schema

const AdSchema = new Schema({
    
    id: {type: Number},
    
    title: { type: String, required: true },
        
    description: { type: String },

    description_summary: { type: String },

    company_id: { type: Number },

    place: { type: String},
    
}, {
    versionKey: false
})

const Ad = mongoose.model('Ad', AdSchema)
module.exports =  Ad