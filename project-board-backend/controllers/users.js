const User = require('../models/User');
const ErrorHandling = require('../models/ErrorHandling');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../config/dev');

exports.SIGNUP_USER = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        let err = {};
        err.message = error.array();
        err.status = 422;
        return next(err);
    }
    const {
        name,
        email,
        password,
        confirmPassword
    } = req.body;
    let user;
    try {
        user = await User.findOne({
            email: email
        })
    } catch (error) {
        return next(new ErrorHandling('Try again!', 500));
    }
    if (user) {
        return next(new ErrorHandling('Email already exists', 422));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandling('Password does not match', 422));
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        return next(new ErrorHandling('Password not hashed!', 500));
    }

    user = new User({
        name,
        email,
        password: hashedPassword
    })

    try {
        await user.save();
    } catch (error) {
        return next(new ErrorHandling('User not registered!', 500));
    }

    res.status(201).json({
        user
    })
}

exports.LOGIN_USER = async (req,res,next)=> {
    const { email, password } = req.body;
    let user;
    try {
        user = await User.findOne({email: email})
    } catch(err) {
        return next(new ErrorHandling('Try again', 500))
    }
    if(!user) {
        return next(new ErrorHandling('Invalid credentials', 500))
    } 
    let isPasswordEqual;
    try {
        isPasswordEqual = await bcrypt.compare(password, user.password);
    } catch(err) {
        return next(new ErrorHandling('Password not compared', 500));
    } 
    if(!isPasswordEqual) {
        return next(new ErrorHandling('Invalid credentials', 500))        
    }

    let token;
    try {
        token = jwt.sign({
            name: user.name,
            email: user.email,
            userId: user._id
        }, secretKey, { expiresIn: '1h'})
    } catch (err) {
        return next(new ErrorHandling('Not Authenticated', 401));
    }
    res.status(200).json({
        token
    })
}
