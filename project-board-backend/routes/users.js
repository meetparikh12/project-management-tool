const express = require('express');
const route = express.Router();
const userController = require('../controllers/users');
const {body} = require('express-validator');

route.post('/register', [
    body('name').trim().isLength({min: 5}).withMessage('Name must be atleast 5 characters long.'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Please provide a valid Email.'),
    body('password').trim().isLength({min: 6}).withMessage('Password must be 6 characters long.')
],userController.SIGNUP_USER);

route.post('/login', userController.LOGIN_USER);

module.exports = route;