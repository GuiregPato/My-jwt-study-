const jwt = require('jsonwebtoken')
const secret = '123321'

const tokenVerify= (req, res, next)=>{
    const token = req.cookies.token;
 try{
    const user = jwt.verify(token, secret)
    req.user = user;
    next()
 } catch(err){
    res.clearCookie("token");
    return res.redirect('/login')
 }
}

module.exports = {   tokenVerify
}