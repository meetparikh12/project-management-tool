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
    }
}, {timestamps: true})

module.exports = mongoose.model('Project', projectSchema);