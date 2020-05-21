import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
toast.configure();
class AddProjectTask extends Component {
    constructor(props){
        super(props);
        const { projectId } = this.props.match.params;
        this.state = {
            projectIdentifier: projectId,
            taskId: "",
            summary: "",
            acceptanceCriteria: "",
            dueDate: "",
            priority: "",
            status: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }
        
    onChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitForm(e){
       
        e.preventDefault();
        const projectTask = {
            "taskId": this.state.taskId,
            "summary": this.state.summary,
            "acceptanceCriteria": this.state.acceptanceCriteria,
            "dueDate": this.state.dueDate,
            "priority": this.state.priority,
            "status": this.state.status
        }
        this.props.addProjectTask(projectTask,this.props.history,this.state.projectIdentifier);

    }
    render() {
        const { projectId } = this.props.match.params;
        return (
            
            <div className="AddProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            
                            <Link to={`/projectboard/${projectId}`} className="btn btn-light">Back to Board</Link>
                            <h4 className="display-4 text-center">Add / Update Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={this.onSubmitForm}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" name="taskId" 
                                    value={this.state.taskId} placeholder="Unique Task ID" onChange={this.onChange}/>
                                </div>
                                
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                    name="summary" 
                                    value={this.state.summary} placeholder="Project Task summary" onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" 
                                    value={this.state.acceptanceCriteria} name="acceptanceCriteria" onChange={this.onChange}></textarea>
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="dueDate" onChange={this.onChange} value={this.state.dueDate} />
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" onChange={this.onChange} value={this.state.priority} name="priority">
                                        <option value="">Select Priority</option>
                                        <option value="HIGH">High</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="LOW">Low</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" value={this.state.status} onChange={this.onChange} 
                                    name="status">
                                        <option value="">Select Status</option>
                                        <option value="TO DO">TO DO</option>
                                        <option value="IN PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" value="ADD PROJECT TASK" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

AddProjectTask.propTypes = {
    addProjectTask : PropTypes.func.isRequired
}

const mapDispatchToProps = dispatchEvent => {
    return {

        addProjectTask: (projectTask,history,backlog_id) => {
            axios.post(`http://localhost:4200/api/projects/projectTask/${backlog_id}`, projectTask)
            .then((res) => {
                console.log(res.data.message);
                history.push(`/projectboard/${backlog_id}`);
            }).catch((error) => {
                console.log(error);
                toast.error(error.response.data.message[0].msg || error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
        }
    };
}


export default connect(null,mapDispatchToProps)(AddProjectTask);
