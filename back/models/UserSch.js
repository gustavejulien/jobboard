const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    
    id: {type: Number},
    
    last_name: { type: String },
    
    first_name: { type: String },
    
    password: { type: String, required: true },
    
    email: { type: String, required: true },
    
    date: { type: Date, default: Date.now },

    role: { type: String}
    
}, {
    versionKey: false
})

const User = mongoose.model('User', UserSchema)
module.exports =  User