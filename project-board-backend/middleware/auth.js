const {secretKey} = require('../config/keys');
const jwt = require('jsonwebtoken');
const ErrorHandling = require('../models/ErrorHandling');

module.exports = (req,res,next)=> {

    const header = req.get('Authorization');
    if(!header){
        return next(new ErrorHandling('Not Authorized', 401));
    }
    const token = header.split(" ")[1];
    let decoded_token;
    try{
        decoded_token = jwt.verify(token, secretKey);
    }catch(err){
        return next(new ErrorHandling('Not Authorized', 401));
    }
    if(!decoded_token){
        return next(new ErrorHandling('Not Authorized', 401));
    };
    req.userId = decoded_token.userId;
    next();
}