const jwt = require('jsonwebtoken')

// Testing acess token and returning email if valid
module.exports = (req,res, next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader){
        req.isAuth = false;
        return next()
    }
    // if the user is not already Authenticated then we need nothing to do
    let token = authHeader.split(' ')[1]
    if(!token || token === ''){
        req.isAuth = false
        return next()
    }

    let decodeToken;

    try{
        decodeToken = jwt.verify(token, 'accessToken')
    }
    catch(err){
        req.isAuth = false;
        return next()
    }

    req.isAuth = true
    req.email = decodeToken.email
    next();
}