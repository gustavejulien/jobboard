const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
        
    name: { type: String },
    
    logo: { type: String },
    
    description: { type: String },
    
}, {
    versionKey: false
})

const Company = mongoose.model('Company', CompanySchema)
module.exports =  Company