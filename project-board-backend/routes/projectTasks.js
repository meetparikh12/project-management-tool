const express = require('express');
const route = express.Router();
const projectTaskController = require('../controllers/projectTasks');
const {body} = require('express-validator');

route.post('/:projectIdentifier',  [
    body('summary').trim().isLength({min: 5}).withMessage('Task summary must be 5 characters long.'),
    body('acceptanceCriteria').trim().isLength({min: 10}).withMessage('Acceptance Criteria must be 10 characters long.'),
    body('taskId').trim().isLength({min:4, max: 5}).withMessage('Task ID must be between 4 to 5 characters.')
] ,projectTaskController.CREATE_PROJECT_TASK);

route.get('/:projectIdentifier', projectTaskController.GET_ALL_PROJECT_TASKS);

module.exports = route;