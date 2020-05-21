const mongoose = require('mongoose')

const projectTaskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    }, 
    acceptanceCriteria: {
        type: String,
        required: true
    }, 
    dueDate: {
        type: Date,
        default: Date.now()
    },  
    priority: {
        type: String,
        default: "LOW"
    },
    status: {
        type: String,
        default: "TO DO"
    },
    project: {
        type: String,
        ref: 'Project',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('ProjectTask',projectTaskSchema);