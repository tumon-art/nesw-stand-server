const mongoose = require('mongoose')

// Post  Schema
const postSchema = new mongoose.Schema({
    img:{type: String, required:true},
    header:{type: String, required:true},
    post:{type: String, required:true},
    cont:{type: String, 
        enum : ['Middle East','North America','Asia','South Asia','Europe','Africa','South America'],
        required: true},
})

module.exports = mongoose.model("Post",postSchema)
