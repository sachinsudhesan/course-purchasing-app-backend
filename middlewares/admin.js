const { Admin } = require("../db/index")
const jwt = require("jsonwebtoken")
const secret = require("../config.js")
const { JWT_SECRET } = require("../config")
function adminMiddleware(req,res,next){

    const token = req.headers.authorization
    const words = token.split(" ")
    const jwtToken = words[1]
    const decodedValue = jwt.verify(jwtToken , JWT_SECRET)
    if(decodedValue.username){
        next()
    }else{
        res.json({
            msg : "wrong token"
        })
    }
    
}
module.exports = adminMiddleware