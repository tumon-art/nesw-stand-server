const express = require('express')
const Posts = require('../schema/postSchema')

const router = express.Router()

// cachepost data
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

// router.get('/:id',async (req,res)=>{
//     const postId = req.params['id'];
//     try{
//         const posts = await Posts.findById(postId)
//         console.log(posts)
//         res.status(200).send(posts)
//     } catch(err){
//         console.log(err)
//         res.end()
//     }
// })


module.exports = router
