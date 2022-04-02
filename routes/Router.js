const express = require('express')
const Posts = require('../schema/postSchema')
const Login = require('../schema/loginSchema')
const jwt = require('jsonwebtoken')

const router = express.Router()

// cache postdata
let data;

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

router.get('/singlepost/:id', async (req,res)=>{
    var id = req.params.id
    
    try{
        const onePost = data.filter((e)=> e.id === id)
        // console.log(onePost)
        res.status(200).send(onePost)
    } catch(err){
        console.log(err)
        res.end()
    }
})

router.get('/getpost',async (req,res)=>{
    console.log(
        ' ===============','\n',
        req.device.type.toUpperCase()
    )
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

router.post('/createpost',async (req,res)=>{
    const create = req.body
    console.log(req.cookies)
    console.log(create)
    try{
        const posts = new Posts(create)
        await posts.save()
        console.log(posts)
        res.end()
    } catch(err){
        console.log(err)
        res.end()
    }
})

router.post('/login',async (req,res)=>{
    const info = req.body
    console.log(req.cookies)
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
                maxAge: 2629746000,
                secure: true,
                // httpOnly:true  
            }).end(token)
            } else res.status(400).send("Worng Password")
        } else res.status(400).send('Wrong Info')

    } catch(err){
        console.log(err)
        res.end()
    }
})

router.post('/autologin',(req,res)=>{
    const token = req.cookies.token
    console.log("token",token)
    if(token) {
        const decode = jwt.verify(token,'key')
        if (decode) res.send(true)
    }
})



module.exports = router
