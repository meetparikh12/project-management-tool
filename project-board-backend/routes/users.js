const express = require('express');
const route = express.Router();
const User = require('../models/User');
const ErrorHandling = require('../models/ErrorHandling');
const bcrypt = require('bcryptjs');

route.post('/register', async (req,res,next)=> {
    const {name, email, password, confirmPassword }  =  req.body;
    let user; 
    try {
        user = await User.findOne({email: email})
    } catch(error) {
        return next(new ErrorHandling('Try again!', 500));
    } 
    if(user) {
        return next(new ErrorHandling('Email already exists', 422));        
    }
    if(password !== confirmPassword) {
        return next(new ErrorHandling('Password does not match', 422));
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch(error) {
        return next(new ErrorHandling('Password not hashed!', 500));
    }

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save();
    } catch(error) {
        return next(new ErrorHandling('User not registered!', 500));
    }

    res.status(201).json({user: newUser})
})

module.exports = route;