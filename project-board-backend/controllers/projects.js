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
    const { projectName, projectID, projectDescription, startDate, endDate} = req.body;
    let project;
    try {
        project = await Project.findOne({projectID: projectID});
    } catch(err) {
        return next(new ErrorHandling('Try again', 500));
    }
    if(project) {
        return next(new ErrorHandling('ProjectID already exist.', 422));
    }
    project = new Project({
        projectName,
        projectID,
        projectDescription,
        startDate,
        endDate
    });

    try {
        await project.save();
    } catch(err) {
        return next(new ErrorHandling('Project not created', 500));
    }
    res.status(200).json({project})
}