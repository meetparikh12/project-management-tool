const express = require('express');
const route = express.Router();

route.get('/login', (req,res,next)=> {
    res.status(200).json({message: 'Log in successfully!'})
})

module.exports = route;