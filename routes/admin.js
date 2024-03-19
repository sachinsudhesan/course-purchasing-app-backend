const express = require("express")
const adminMiddleware = require("../middlewares/admin")
const router = express.Router()
const { Admin } = require("../db/index")
const { Course } = require("../db/index")
const app = express()


router.post("/signup" , async function(req,res){
    const username = req.body.username
    const password = req.body.password

    await Course.create({
        username : username,
        password : password
    })
    res.json({
        msg : 'admin created'
    })
    
})
router.post("/courses" , adminMiddleware, async function(req,res){
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageLink = req.body.imageLink

    const course = await Course.create({
        title,
        description,
        price,
        imageLink
    })
    res.json({
        msg : "course created successfully", courseid : course._id
    })
    
})
router.get("/courses" , adminMiddleware, async function(req,res){
    

    const response = await Course.find({})
    res.json({
        courses : response
    })
    
})

module.exports = router