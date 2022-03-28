const { urlencoded } = require('express')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
var device = require('express-device');
const path = require('path')

const router = require('./routes/Router')
const app = express()


app.use(urlencoded({limit: '50mb',extended:false}))
app.use(express.json({limit: '50mb'}))
app.use(cors())
app.use(device.capture());
// app.use(express.static(path.join(__dirname, '../client/out/')));

// Routes 
app.use(router)

// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, '../client/out/'));
//   });


// DB Connection
try {
    mongoose.connect('mongodb+srv://tumon:u1YXcdALerZIZCRI@cluster0.6dlgo.mongodb.net/post')
    console.log("DB Connected!")
} catch(err){
    console.log(err)
}


app.listen(process.env.PORT || 3001,()=> console.log("listening 3001"))
