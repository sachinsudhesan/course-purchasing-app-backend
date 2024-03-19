const express = require("express")
const adminMiddleware = require("../middlewares/admin")
const router = express.Router()
const { Admin } = require("../db/index")
const { Course } = require("../db/index")
const app = express()
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")


router.post("/signup" , async function(req,res){
    const username = req.body.username
    const password = req.body.password

    await Admin.create({
        username : username,
        password : password
    })
    res.json({
        msg : 'admin created'
    })
    
})
router.post("/signin" ,  async function(req,res){
    const username = req.headers.username
    const password = req.headers.password

    const admin = await Admin.find({
        username,
        password
    }) 
    if(admin){ 
        const token = jwt.sign({
        username
    },JWT_SECRET)
    res.json({
        token  
    })
    }else
    {
        res.json({
            msg : "wrong username and password"
        })
    }
    
   

    
    
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