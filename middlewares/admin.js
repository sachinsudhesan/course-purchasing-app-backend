const { Admin } = require("../db/index")

function adminMiddleware(req,res,next){
//authenticate the username and password of admin
    const username = req.headers.username
    const password = req.headers.password
    //check whether a user exists with this username and password

    Admin.findOne({
        username : username,
        password : password
    })
    .then(function(value){
        if(value){
            next()
        }else{
            res.status(403).json({
                message : 'admin doesnot exist',
            })
        }
    })
}
module.exports = adminMiddleware