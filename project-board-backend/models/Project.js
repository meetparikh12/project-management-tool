const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    }, 
    projectIdentifier: {
        type: String,
        required: true,
        unique: true
    }, 
    projectDescription: {
        type: String,
        required: true
    }, 
    startDate: {
        type: Date
    }, 
    endDate: {
        type: Date
    },
    projectTask: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectTask',
        required: true
    }], 

    projectLeader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Project', projectSchema);