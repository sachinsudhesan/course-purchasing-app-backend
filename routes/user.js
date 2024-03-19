const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/user");
const { User } = require("../db/index");
const { Course } = require("../db/index");



router.post("/signup" , async function(req,res){
    const username = req.body.username
    const password = req.body.password

    await User.create({
        username : username,
        password : password
    })
    res.json({
        msg : "user created successfully"
    })
})
router.post("/courses/:courseId" ,userMiddleware, async function(req,res){
    const username = req.headers.username
    const courseId = req.params.courseId

    await User.updateOne({
        username : username
    },{
        "$push" : {
            purchasedCourses : courseId
        }
    })
    res.json({
        msg : "purchase completed successfully"
    })
})
router.get("/courses" , async function(req,res){
    

    const response =await Course.find({})
    res.json({
        courses : response
    })
})
router.get("/purchasedcourses" , userMiddleware , async function(req,res){
    const username = req.headers.username
    const password = req.headers.password
   
    
    const user = await User.findOne({
        username : username,
        password : password
    })
    const course = await Course.find({
        _id : {
            "$in" : user.purchasedCourses
        }
    })
    res.json({
        courses : course
    })
})

module.exports = router