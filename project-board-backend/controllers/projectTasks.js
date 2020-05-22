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
        return next(new ErrorHandling(`Project not found with ID '${projectIdentifier}'`, 404));
    } 
    let { summary, acceptanceCriteria, dueDate, status, priority, taskId} = req.body;
    let projectTask;

    try {
        projectTask = await ProjectTask.findOne({taskId: taskId});
    } catch(err) {
        console.log(err);
        return next(new ErrorHandling('Cannot fetch ProjectTask', 500));
    }

    if(projectTask){
        return next(new ErrorHandling(`Project Task with ID '${taskId}' already exist`, 404));
    }
    const statusCheck = {
        "TO DO": "TO DO",
        "IN PROGRESS": "IN PROGRESS", 
        "DONE" : "DONE"
    }
    const priorityCheck = {
        "LOW": "LOW",
        "MEDIUM": "MEDIUM",
        "HIGH": "HIGH"
    }
    if(!(!!statusCheck[status])){
        status = "TO DO"
    } 
    if(!(!!priorityCheck[priority])){
        priority = "LOW"
    }
    projectTask = new ProjectTask({
        summary, acceptanceCriteria, dueDate, status, priority, taskId, project: projectIdentifier
    })

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await projectTask.save({session});
        await project.projectTask.unshift(projectTask);
        await project.save({session});
        await session.commitTransaction();
    } catch(err) {
        console.log(err);
        
        return next(new ErrorHandling('ProjectTask not added', 500))
    } 
    res.status(201).json({projectTask});

}

exports.GET_ALL_PROJECT_TASKS = async (req,res,next)=> {

    let {projectIdentifier} = req.params;
    projectIdentifier = projectIdentifier.toUpperCase();
    let project;
    try{
        project = await Project.findOne({projectIdentifier: projectIdentifier});
    } catch(err) {
        return next(new ErrorHandling('Project not fetched!', 500));
    }
    if(!project) {
        return next(new ErrorHandling(`Project does not exist with ID '${projectIdentifier}'`, 404));
    }
    let projectTasks;
    try {
        projectTasks = await ProjectTask.find({project: projectIdentifier});
    }catch(err) {
        return next(new ErrorHandling('Cannot fetch ProjectTask', 500));
    }
    if(!projectTasks || projectTasks.length === 0){
        return next(new ErrorHandling(`No Project Tasks found for Project ID '${projectIdentifier}'`, 404));
    }
    res.status(200).json({projectTasks});

}

exports.GET_SINGLE_PROJECT_TASK = async (req,res,next)=> {
    let {projectIdentifier, taskId} = req.params;
    projectIdentifier = projectIdentifier.toUpperCase();
    let project;
    try {
        project = await Project.findOne({projectIdentifier});
    } catch(err) {
        return next(new ErrorHandling('Project not fetched!', 500));
    } 

    if(!project) {
        return next(new ErrorHandling(`Project not found with ID '${projectIdentifier}'`, 404));
    }
    let projectTask;

    try {
        projectTask = await ProjectTask.findOne({taskId: taskId}) ;
        
    } catch(err) {
        console.log(err);
        return next(new ErrorHandling('Cannot fetch ProjectTask', 500));
    }

    if(!projectTask){
        return next(new ErrorHandling(`Project Task '${taskId}' does not exist`, 404));
    }
    if(projectTask.project !== projectIdentifier){
        return next(new ErrorHandling(`Project Task '${taskId}' does not exist in Project with ID '${projectIdentifier}'`, 404));
    }    

    res.status(200).json({projectTask});

}

exports.UPDATE_PROJECT_TASK = async (req,res,next)=> {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let err = {};
        err.message = errors.array();
        err.status = 422;
        return next(err);
    }

    let {projectIdentifier, taskId} = req.params;
    projectIdentifier = projectIdentifier.toUpperCase();
    let project;
    try {
        project = await Project.findOne({projectIdentifier});
    } catch(err) {
        return next(new ErrorHandling('Project not fetched!', 500));
    } 

    if(!project) {
        return next(new ErrorHandling(`Project not found with ID '${projectIdentifier}'`, 404));
    }
    let projectTask;

    try {
        projectTask = await ProjectTask.findOne({taskId: taskId}) ;
        
    } catch(err) {
        console.log(err);
        return next(new ErrorHandling('Cannot fetch ProjectTask', 500));
    }

    if(!projectTask){
        return next(new ErrorHandling(`Project Task '${taskId}' does not exist`, 404));
    }
    if(projectTask.project !== projectIdentifier){
        return next(new ErrorHandling(`Project Task '${taskId}' does not exist in Project with ID '${projectIdentifier}'`, 404));
    }
    let {summary, acceptanceCriteria, dueDate, status, priority} = req.body;
    const statusCheck = {
        "TO DO": "TO DO",
        "IN PROGRESS": "IN PROGRESS",
        "DONE": "DONE"
    }
    const priorityCheck = {
        "LOW": "LOW",
        "MEDIUM": "MEDIUM",
        "HIGH": "HIGH"
    }
    if (!(!!statusCheck[status])) {
        status = "TO DO"
    }
    if (!(!!priorityCheck[priority])) {
        priority = "LOW"
    }
    projectTask.summary = summary;
    projectTask.acceptanceCriteria = acceptanceCriteria;
    projectTask.dueDate = dueDate;
    projectTask.status = status;
    projectTask.priority = priority;

    try {
        await projectTask.save();
    } catch(err) {
        return next(new ErrorHandling('Project Task not updated', 500));
    } 

    res.status(200).json({message: 'Project Task updated'});
}

exports.DELETE_PROJECT_TASK = async (req,res,next)=> {
    let {projectIdentifier, taskId} = req.params;
    projectIdentifier = projectIdentifier.toUpperCase();
    let project;
    try {
        project = await Project.findOne({projectIdentifier});
    } catch(err) {
        return next(new ErrorHandling('Project not fetched!', 500));
    } 

    if(!project) {
        return next(new ErrorHandling(`Project not found with ID '${projectIdentifier}'`, 404));
    }
    let projectTask;

    try {
        projectTask = await ProjectTask.findOne({taskId: taskId}) ;
        
    } catch(err) {
        console.log(err);
        return next(new ErrorHandling('Cannot fetch ProjectTask', 500));
    }

    if(!projectTask){
        return next(new ErrorHandling(`Project Task '${taskId}' does not exist`, 404));
    }
    if(projectTask.project !== projectIdentifier){
        return next(new ErrorHandling(`Project Task '${taskId}' does not exist in Project with ID '${projectIdentifier}'`, 404));
    }
    
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await projectTask.remove({session});
        await project.projectTask.pull(projectTask);
        await project.save({session});
        await session.commitTransaction();
    }catch(err){
        return next(new ErrorHandling('Project Task not deleted', 500));
    }
    res.status(200).json({message: 'Project Task deleted successfully.'})
}