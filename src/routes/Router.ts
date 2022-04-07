import { Request, Response } from "express"

const express = require('express')
const Posts = require('../schema/postSchema')
const Login = require('../schema/loginSchema')
const jwt = require('jsonwebtoken')
const Opinion = require("../schema/postOpinion")

const router = express.Router()

// cache postdata
var data:any;

if (data === undefined) {
    fecth()
async function fecth(){
    try{ console.log("[Caching Started]")
        const posts = await Posts.find()
        data=(posts)
        console.log("[Caching Done]")
    } catch(err){
        console.log(err)
    }
}
};

// SINGLE POST
router.get('/singlepost/:id', async (req:Request,res:Response)=>{
    var id = req.params.id
    
    try{
        const onePost = data.filter((e:any)=> e.id === id)
        // console.log(onePost)
        res.status(200).send(onePost)
    } catch(err){
        console.log(err)
        res.end()
    }
})

// GET POST
router.get('/getpost',async (req:Request,res:Response)=>{
    
    if (data !== undefined ) {
        try{
            console.log("Getting From Cache",'\n',
            "===============")
            res.status(200).send(data)
        } catch(err){
            console.log(err)
            res.end()
        }
    } else {
        try{
            const posts = await Posts.find()
            // console.log(posts)
            data=(posts)
            console.log("Server Req")
            res.status(200).send(posts)
        } catch(err){
            console.log(err)
            res.end()
        }
    }
})

// CREATE POST
router.post('/createpost',async (req:Request,res:Response)=>{
    const create = req.body

    try{
        const posts = new Posts(create)
        await posts.save()
        console.log(posts)
        res.end('Posting Success!')
    } catch(err){
        console.log(err)
        res.status(401).json({message:"Posting Failed!"})
    }
})



// LOGIN ROUTE 
router.post('/login',async (req:Request,res:Response)=>{
    const info = req.body

    try{ // QUERY
        const login = await Login.findOne({username:info.username}).exec()
        if(login) {
            // COMPARE PASSWORD
            if(info.password === login.password) {
            // GENARATE TOKEN
            const token = jwt.sign({
                username:login.id,
            },'key')

            res.cookie('token',token,{
                maxAge:25200000 ,
                secure: true,
                httpOnly: true,
                sameSite: 'none' 
            })
            res.end()
            } 
            
            else res.status(400).send("Worng Password")

        } else res.status(400).send('Wrong Info')

    } catch(err){
        console.log(err)
        res.end()
    }
})


// AUTO LOGIN
router.post('/autologin',(req:Request,res:Response)=>{
    const token = req.cookies.token
    console.log("Autologin",token)
    if(token) {
        const decode = jwt.verify(token,'key')
        if (decode) res.send(true)
    }
})

// ASIA 
router.get('/asia',(req:Request,res:Response)=>{
   
    try{
        const onePost = data.filter((e:any)=> e.cont == 'Asia')
        console.log(onePost)
        res.status(200).send(onePost)
    } catch(err){
        console.log(err)
        res.status(400).json({message:"Failed"})
    }
})

// ADD OPINION || POST 
router.post('/addopinion',(req:Request,res:Response)=>{
    const post = req.body;

    try{
        const opinion = new Opinion(post)

        res.end('Posting Success!')
    } catch(err:any){
        console.log(err.message)
        res.status(400).json({message:"Posting Failed!"})
    }
})


module.exports = router
