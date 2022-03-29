const mongoose = require('mongoose')

// Post  Schema
const loginSchema = new mongoose.Schema({
    username:{type: String, required:true},
    password:{type: String, required:true},
})

module.exports = mongoose.model("Login",loginSchema)