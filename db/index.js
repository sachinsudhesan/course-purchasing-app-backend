//connect to mongoose

const { string } = require("zod")
const mongoose  = require("mongoose")

mongoose.connect("mongodb+srv://sachinchandra276:Es03rgjqkvaglKq8@cluster1.v5ev7pa.mongodb.net/sac")

//define the schemas

//define the admin schema
const AdminSchema = new mongoose.Schema({
    username : String,
    password : String
})
//define the user schema
const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
})
//define the course schema
const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageLink : String
})

const Admin = mongoose.model('Admin' , AdminSchema)
const User = mongoose.model('User' , UserSchema)
const Course = mongoose.model('Course' , CourseSchema)


module.exports = {
    Admin,
    User,
    Course
}