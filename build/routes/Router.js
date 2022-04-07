"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const Posts = require('../schema/postSchema');
const Login = require('../schema/loginSchema');
const jwt = require('jsonwebtoken');
const Opinion = require("../schema/postOpinion");
const router = express.Router();
// cache postdata
var data;
if (data === undefined) {
    fecth();
    function fecth() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("[Caching Started]");
                const posts = yield Posts.find();
                data = (posts);
                console.log("[Caching Done]");
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
;
// SINGLE POST
router.get('/singlepost/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    try {
        const onePost = data.filter((e) => e.id === id);
        // console.log(onePost)
        res.status(200).send(onePost);
    }
    catch (err) {
        console.log(err);
        res.end();
    }
}));
// GET POST
router.get('/getpost', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (data !== undefined) {
        try {
            console.log("Getting From Cache", '\n', "===============");
            res.status(200).send(data);
        }
        catch (err) {
            console.log(err);
            res.end();
        }
    }
    else {
        try {
            const posts = yield Posts.find();
            // console.log(posts)
            data = (posts);
            console.log("Server Req");
            res.status(200).send(posts);
        }
        catch (err) {
            console.log(err);
            res.end();
        }
    }
}));
// CREATE POST
router.post('/createpost', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const create = req.body;
    try {
        const posts = new Posts(create);
        yield posts.save();
        console.log(posts);
        res.end('Posting Success!');
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: "Posting Failed!" });
    }
}));
// LOGIN ROUTE 
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const info = req.body;
    console.log(req.cookies);
    try { // QUERY
        const login = yield Login.findOne({ username: info.username }).exec();
        if (login) {
            // COMPARE PASSWORD
            if (info.password === login.password) {
                // GENARATE TOKEN
                const token = jwt.sign({
                    username: login.id,
                }, 'key');
                res.cookie('token', token, {
                    maxAge: 25200000,
                    secure: true,
                    httpOnly: true,
                    sameSite: 'none'
                });
                res.end();
            }
            else
                res.status(400).send("Worng Password");
        }
        else
            res.status(400).send('Wrong Info');
    }
    catch (err) {
        console.log(err);
        res.end();
    }
}));
// AUTO LOGIN
router.post('/autologin', (req, res) => {
    const token = req.cookies.token;
    console.log("Autologin", token);
    if (token) {
        const decode = jwt.verify(token, 'key');
        if (decode)
            res.send(true);
    }
});
// ASIA 
router.get('/asia', (req, res) => {
    try {
        const onePost = data.filter((e) => e.cont == 'Asia');
        console.log(onePost);
        res.status(200).send(onePost);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed" });
    }
});
// ADD OPINION || POST 
router.post('/addopinion', (req, res) => {
    const post = req.body;
    try {
        const opinion = new Opinion(post);
        res.end('Posting Success!');
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "Posting Failed!" });
    }
});
module.exports = router;
