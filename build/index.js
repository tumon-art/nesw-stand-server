"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { urlencoded } = require('express');
const cors = require('cors');
const express_1 = __importDefault(require("express"));
const mongoose = require('mongoose');
const cookie = require("cookie-parser");
const router = require('./routes/Router');
const app = (0, express_1.default)();
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', yourExactHostname);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
// CORS CONFIG
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cookie());
app.use(urlencoded({ extended: false }));
app.use(express_1.default.json());
// CORS
app.use(cors(corsConfig));
// Routes 
app.use(router);
// DB Connection
try {
    mongoose.connect('mongodb+srv://tumon:u1YXcdALerZIZCRI@cluster0.6dlgo.mongodb.net/post');
    console.log("DB Connected!");
}
catch (err) {
    console.log(err);
}
app.listen(process.env.PORT || 3001, () => console.log("listening 3001"));
