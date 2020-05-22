const express = require('express');
const route = express.Router();
const projectTaskController = require('../controllers/projectTasks');
const {body} = require('express-validator');
const auth = require('../middleware/auth');

route.post('/:projectIdentifier', auth,  [
    body('summary').trim().isLength({min: 5}).withMessage('Task summary must be 5 characters long.'),
    body('acceptanceCriteria').trim().isLength({min: 10}).withMessage('Acceptance Criteria must be 10 characters long.'),
    body('taskId').trim().isLength({min:4, max: 5}).withMessage('Task ID must be between 4 to 5 characters.')
] ,projectTaskController.CREATE_PROJECT_TASK);

route.get('/:projectIdentifier', auth, projectTaskController.GET_ALL_PROJECT_TASKS);

route.get('/:projectIdentifier/:taskId', auth, projectTaskController.GET_SINGLE_PROJECT_TASK);

route.patch('/:projectIdentifier/:taskId',auth, [
    body('summary').trim().isLength({min: 5}).withMessage('Task summary must be 5 characters long.'),
    body('acceptanceCriteria').trim().isLength({min: 10}).withMessage('Acceptance Criteria must be 10 characters long.')
] ,projectTaskController.UPDATE_PROJECT_TASK);

route.delete('/:projectIdentifier/:taskId',auth, projectTaskController.DELETE_PROJECT_TASK);

module.exports = route;