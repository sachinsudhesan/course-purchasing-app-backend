const { User } = require("../db/index")
const { JWT_SECRET } = require("../config")
function userMiddleware(req,res,next){
    const token = req.headers.authorization
    const words = token.split(" ")
    const jwtToken = words[1]
    const decodedValue = jwt.verify(jwtToken , secret)
    if(decodedValue.username){
        next()
    }else{
        res.json({
            msg : "wrong token"
        })
    }
    
}
module.exports = userMiddleware