const express = require('express');
const route = express.Router();
const projectController = require('../controllers/projects');
const {body} = require('express-validator');

route.post('/', [
    body('projectName').trim().isLength({min: 6}).withMessage('Project name must be 6 characters long.'),
    body('projectDescription').trim().isLength({min: 10}).withMessage('Project Description must be 10 characters long.'),
    body('projectIdentifier').trim().isLength({min:4, max: 5}).withMessage('Project ID must be between 4 to 5 characters.')
] ,projectController.CREATE_PROJECT);

route.get('/', projectController.GET_ALL_PROJECTS);

module.exports = route;