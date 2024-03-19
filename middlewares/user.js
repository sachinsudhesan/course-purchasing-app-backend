const { User } = require("../db/index")

function userMiddleware(req,res,next){
    //check whether a user with the credentials exist or not
    const username = req.headers.username
    const password = req.headers.password

    User.findOne({
        username : username,
        password : password
    })
    .then(function(value){
        if(value){
            next()
        }else{
            res.status(403).json({
                message : 'user doesnot exist'
            })
        }
    })
}
module.exports = userMiddleware