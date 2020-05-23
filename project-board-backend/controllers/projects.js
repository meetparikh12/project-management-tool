const Project = require('../models/Project');
const ErrorHandling = require("../models/ErrorHandling");
const {validationResult} = require('express-validator');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.CREATE_PROJECT = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        let err = {}
        err.message = error.array();
        err.status = 422;
        return next(err);
    }
    let {
        projectName,
        projectIdentifier,
        projectDescription,
        startDate,
        endDate
    } = req.body;
    let project;
    try {
        project = await Project.findOne({
            projectIdentifier: projectIdentifier.toUpperCase()
        }).populate('projectLeader');
    } catch(err) {
        return next(new ErrorHandling('Try again', 500));
    }
    if(project) {
        return next(new ErrorHandling('ProjectID already exist.', 422));
    }
    let user;
    try {
        user = await User.findOne({_id: req.userId});
    } catch(err){
        return next(new ErrorHandling('Cannot fetch user!', 500));
    }
    if(!user) {
        return next(new ErrorHandling('User not found', 404));
    }   
    if(startDate == "" || endDate == ""){
        startDate = Date.now();
        endDate = Date.now();
    } 
    if( Date.parse(startDate) < Date.parse(new Date()) || Date.parse(endDate) < Date.parse(new Date()) ){
        return next(new ErrorHandling('Do not use past dates.', 422));
    } 
    if(Date.parse(startDate) > Date.parse(endDate)) {  
        return next(new ErrorHandling('Please enter valid dates.', 422));
    } 
    project = new Project({
        projectName,
        projectIdentifier: projectIdentifier.toUpperCase(),
        projectDescription,
        startDate,
        endDate, 
        projectLeader: req.userId
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await project.save({session});
        await user.projects.unshift(project);
        await user.save({session});
        await session.commitTransaction();

    } catch(err) {
        console.log(err);
        
        return next(new ErrorHandling('Project not created', 500));
    }
    res.status(200).json({message: 'Project Created successfully.'})
}

exports.GET_ALL_PROJECTS = async (req,res,next)=> {
    let projects;
    try {
        projects = await Project.find({projectLeader: req.userId});
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
            projectIdentifier: projectIdentifier.toUpperCase()
        });
    }catch(err){
        return next(new ErrorHandling('Project not fetched', 500))
    } 
    if(!project){
        return next(new ErrorHandling('No Project found', 404))
    }
    if(project.projectLeader.toString() !== req.userId){
        return next(new ErrorHandling('Not Authorized', 401))
    }

    const { _id, projectName, projectDescription, projectLeader, startDate, endDate} = project;

    res.status(200).json({project: {
        _id,
        projectName,
        projectDescription, 
        projectIdentifier,
        projectLeader, 
        startDate: new Date(startDate).toISOString().substr(0,10),
        endDate: new Date(endDate).toISOString().substr(0,10)
    }});
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
        project = await Project.findOne({projectIdentifier: projectIdentifier.toUpperCase()})
    } catch(err) {
        return next(new ErrorHandling('Project not fetched'));
    } 
    if(!project) {
        return next(new ErrorHandling(`Project not found with ID: ${projectIdentifier}`, 404))
    }
    if(project.projectLeader.toString() !== req.userId){
        return next(new ErrorHandling('Not Authorized', 401));
    }
    let {projectName, projectDescription, startDate, endDate} = req.body;
    if (startDate == "" || endDate == "") {
        startDate = Date.now();
        endDate = Date.now();
    }
    if (Date.parse(startDate) < Date.parse(new Date()) || Date.parse(endDate) < Date.parse(new Date())) {
        return next(new ErrorHandling('Do not use past dates.', 422));
    }
    if (Date.parse(startDate) > Date.parse(endDate)) {
        return next(new ErrorHandling('Please enter valid dates.', 422));
    }
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

exports.DELETE_PROJECT = async(req,res,next)=> {
    let user; 
    try {
        user = await User.findOne({_id: req.userId})
    }catch(err){
        return next(new ErrorHandling('User not fetched', 500))
    }
    if(!user){
        return next(new ErrorHandling('User not found', 404));
    }
    const {projectIdentifier} = req.params;
    let project;
    try {
        project = await Project.findOne({projectIdentifier: projectIdentifier.toUpperCase()}).populate('projectTask');
    } catch(err){
        return next(new ErrorHandling('Project not fetched', 500))
    } 
    if(!project){
        return next(new ErrorHandling(`Project not found with ID: ${projectIdentifier}`, 404))
    }
    if(project.projectLeader._id.toString() !== req.userId) {
        return next(new ErrorHandling('Not Authorized', 401));
    }
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await project.projectTask.map((projectTask)=> projectTask.remove());
        await project.remove({session});
        await user.projects.pull(project);
        await user.save({session});
        await session.commitTransaction();
    }catch(err){
        console.log(err);
        return next(new ErrorHandling('Project not deleted', 500))
    }
    res.status(200).json({message: 'Project deleted Successfully!'})
}