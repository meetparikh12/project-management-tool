const Project = require('../models/Project');
const ProjectTask = require('../models/ProjectTask');
const ErrorHandling = require('../models/ErrorHandling');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

exports.CREATE_PROJECT_TASK = async (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let err = {};
        err.message = errors.array();
        err.status = 422;
        return next(err);
    }
    let {projectIdentifier} = req.params;
    projectIdentifier = projectIdentifier.toUpperCase();
    let project;
    try {
        project = await Project.findOne({projectIdentifier: projectIdentifier}).populate('projectTask');
    } catch(err){
        console.log(err);
        return next(new ErrorHandling('Cannot fetch Project', 500));
    } 
    if(!project){
        return next(new ErrorHandling(`Project not found with ID ${projectIdentifier}`, 404));
    } 
    const { summary, acceptanceCriteria, dueDate, status, priority, taskId} = req.body;
    // let projectTask;
    // try {
    //     projectTask = await ProjectTask.findOne({taskId: taskId})
    // } catch(err) {
    //     return next(new ErrorHandling('Cannot fetch ProjectTask', 500));
    // }
    // if(projectTask ){
    //     return next(new ErrorHandling(`Project Task already exist with ID: ${taskId}`, 404));
    // }
    try {
        await project.projectTask.forEach(projectTask => {
            if (projectTask.taskId === taskId) {
                throw new ErrorHandling(`Project Task ${taskId} already exist in Project ID: ${projectIdentifier}`, 404);
            }
        });
    } catch (err) {
        return next(err);
    }
    const newPT = new ProjectTask({
        summary, acceptanceCriteria, dueDate, status, priority, taskId, project: projectIdentifier
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newPT.save({session});
        await project.projectTask.unshift(newPT);
        await project.save({session});
        await session.commitTransaction();
    } catch(err) {
        console.log(err);
        
        return next(new ErrorHandling('ProjectTask not added', 500))
    } 
    res.status(201).json({projectTask: newPT});
}

exports.GET_ALL_PROJECT_TASKS = async (req,res,next)=> {

}