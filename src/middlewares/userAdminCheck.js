const USER_ROL = "USER";

function userAdminCheck(req, res, next) {
    if(USER_ROL === "USER_ADMIN"){
        next()
    }else{
        res.status().redirect('/users/login')
    }
} 

module.exports = userAdminCheck