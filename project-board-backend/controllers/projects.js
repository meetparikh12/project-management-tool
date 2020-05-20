const Project = require('../models/Project');
const ErrorHandling = require("../models/ErrorHandling");
const {validationResult} = require('express-validator');

exports.CREATE_PROJECT = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        let err = {}
        err.message = error.array();
        err.status = 422;
        return next(err);
    }
    const {
        projectName,
        projectIdentifier,
        projectDescription,
        startDate,
        endDate
    } = req.body;
    let project;
    try {
        project = await Project.findOne({
            projectIdentifier: projectIdentifier
        });
    } catch(err) {
        return next(new ErrorHandling('Try again', 500));
    }
    if(project) {
        return next(new ErrorHandling('ProjectID already exist.', 422));
    }
    project = new Project({
        projectName,
        projectIdentifier,
        projectDescription,
        startDate,
        endDate
    });

    try {
        await project.save();
    } catch(err) {
        console.log(err);
        
        return next(new ErrorHandling('Project not created', 500));
    }
    res.status(200).json({message: 'Project Created successfully.'})
}

exports.GET_ALL_PROJECTS = async (req,res,next)=> {
    let projects;
    try {
        projects = await Project.find();
    } catch(err) {
        return next(new ErrorHandling('Projects not fetched', 500))
    }
    if(projects.length===0){
        return next(new ErrorHandling('No Projects found', 404))
    }
    res.status(200).json({projects});
}

exports.GET_SINGLE_PROJECT = async (req,res,next) => {
    const { projectIdentifier } = req.params;
    let project;
    try {
        project = await Project.findOne({
            projectIdentifier: projectIdentifier
        });
    }catch(err){
        return next(new ErrorHandling('Project not fetched', 500))
    } 
    if(!project){
        return next(new ErrorHandling('No Project found', 404))
    }

    res.status(200).json({project});
}

exports.UPDATE_PROJECT_INFO = async (req,res,next)=> {
    const error = validationResult(req);
    if(!error.isEmpty()){
        let err = {}
        err.message = error.array();
        err.status = 422;
        return next(err);
    }
    const {projectIdentifier} = req.params;
    let project;
    try {
        project = await Project.findOne({projectIdentifier: projectIdentifier})
    } catch(err) {
        return next(new ErrorHandling('Project not fetched'));
    } 
    if(!project) {
        return next(new ErrorHandling(`Project not found with ID: ${projectIdentifier}`, 404))
    }
    const {projectName, projectDescription, startDate, endDate} = req.body;
    project.projectName = projectName;
    project.projectDescription = projectDescription;
    project.startDate = startDate;
    project.endDate = endDate;
    try {
        await project.save();
    } catch(err) {
        return next(new ErrorHandling('Project not updated', 500))
    }
     res.status(200).json({message: 'Project updated successfully!'})
}