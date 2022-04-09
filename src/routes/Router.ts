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
            res.end({message:'Not Found'})
        }
    }
})

// CREATE POST
router.post('/createpost',async (req:Request,res:Response)=>{

    const create = req.body
    console.log('hi')
    try{
        const posts = new Posts(create)
        await posts.save()
        console.log(posts)
        res.end('Posting Success!')
    } catch(err){
        console.log(err)
        res.status(400).send({message:"Posting Failed!"})
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
    
    try{
        if(token) {
            const decode = jwt.verify(token,'key')
            if (decode) res.send(true)
        }
    } catch(err){
        res.status(400).send({message:"failed!"})
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

// EUROPE
router.get('/europe',(req:Request,res:Response)=>{
   
    try{
        const onePost = data.filter((e:any)=> e.cont == 'Europe')
        console.log(onePost)
        res.status(200).send(onePost)
    } catch(err){
        console.log(err)
        res.status(400).json({message:"Failed"})
    }
})



// ADD OPINION || POST 
router.post('/create-opinion',async (req:Request,res:Response)=>{
    const post = req.body;
    try{
        const opinion = new Opinion(post)
        await opinion.save()
        res.end('Posting Success!')
    } catch(err){
        console.log(err)
        res.status(400).send({message:"Posting Failed!"})
    }
})

// GET OPINION || GET
router.get('/getopinion',async (req:Request,res:Response)=>{
    try{
        const opinions = await Opinion.find()
        res.send(opinions)
    } catch(err){
        res.status(400).send({message:'Not Found'})
    }
})

// GET SINGLE OPINION 
router.get('/opinion/:id', async (req:Request,res:Response)=>{
    var id = req.params.id
    
    try{
        const opinions = await Opinion.find()
        const oneOpinion = opinions.filter((e:any)=> e.id === id)
        console.log(oneOpinion)
        // console.log(onePost)
        res.status(200).send(oneOpinion)
    } catch(err){
        console.log(err)
        res.send({message: "Failed"})
    }
})

module.exports = router
