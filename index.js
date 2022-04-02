const { urlencoded } = require('express')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
var device = require('express-device');
const cookie = require("cookie-parser")

const router = require('./routes/Router')
const app = express()

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', yourExactHostname);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
  
app.use(cookie())
app.use(urlencoded({limit: '50mb',extended:false}))
app.use(express.json({limit: '50mb'}))
app.use(cors({
    credentials:true,
    origin: true,

    origin: ["http://news-stand-next.vercel.app", /\.example2\.com$/]
}))

app.use(device.capture());

// Routes 
app.use(router)

// DB Connection
try {
    mongoose.connect('mongodb+srv://tumon:u1YXcdALerZIZCRI@cluster0.6dlgo.mongodb.net/post')
    console.log("DB Connected!")
} catch(err){
    console.log(err)
}


app.listen(process.env.PORT || 3001,()=> console.log("listening 3001"))
