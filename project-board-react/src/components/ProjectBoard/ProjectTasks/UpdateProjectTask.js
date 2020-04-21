import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import PropTypes from "prop-types";
import { addProjectTask } from '../../../actions/actions';

class UpdateProjectTask extends Component {

    constructor(props){
        super(props);
        this.state = {
            projectIdentifier: "",
            projectSequence:"",
            summary: "",
            acceptanceCriteria: "",
            dueDate: "",
            priority: 0,
            status: "",
            id: 0,
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.currentTask){
        this.setState({
            id: nextProps.currentTask.id,
            projectIdentifier: nextProps.currentTask.projectIdentifier,
            summary: nextProps.currentTask.summary,
            acceptanceCriteria: nextProps.currentTask.acceptanceCriteria,
            dueDate: nextProps.currentTask.dueDate,
            priority: nextProps.currentTask.priority,
            status: nextProps.currentTask.status,
            projectSequence: nextProps.currentTask.projectSequence
            })
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onSubmit(e){
        e.preventDefault();
        const updateProjectTask = {
            "id": this.state.id,
            "summary": this.state.summary,
            "acceptanceCriteria": this.state.acceptanceCriteria,
            "projectIdentifier":this.state.projectIdentifier,
            "projectSequence": this.state.projectSequence,
            "dueDate": this.state.dueDate,
            "priority": this.state.priority,
            "status": this.state.status
        }

        this.props.updateProjectTask(updateProjectTask,this.props.history);
        
    }

    onChange(e){

        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        const {errors} = this.state;
        return (

            <div className="UpdateProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            
                            <Link 
                            to="/projectboard" className="btn btn-light">
                                Back to Board
                            </Link>
                            
                            <h4 className="display-4 text-center">Add / Update Project Task</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg",{
                                        "is-invalid": errors.summary})}
                                        name="summary" 
                                    value = {this.state.summary} placeholder="Project Task summary" 
                                    onChange={this.onChange}/>
                                    {errors.summary && (<div className="invalid-feedback">{errors.summary}</div>)}
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" 
                                    name="acceptanceCriteria" onChange={this.onChange} value = {this.state.acceptanceCriteria}></textarea>
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="dueDate" onChange={this.onChange} value={this.state.dueDate} />
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" onChange={this.onChange} value={this.state.priority} name="priority">
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <select className="form-control form-control-lg" onChange={this.onChange} name="status" 
                                    value = {this.state.status}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProjectTask.propTypes = {

    updateProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    currentTask : PropTypes.func.isRequired
}

const mapStateToProps = state => {
    
    return {
        currentTask: state.getBacklogReducer.currentTask,
        errors: state.getErrorReducer.project_task_error
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        updateProjectTask : (projectTask, history) => {
            axios.patch(`/api/backlog/${projectTask.projectIdentifier}/${projectTask.projectSequence}`, projectTask)
                .then((res) => {
                    history.push(`/projectboard/${projectTask.projectIdentifier}`);
                    dispatchEvent(addProjectTask({}));
                })
                .catch((error) => {
                    console.log(error);
                    dispatchEvent(addProjectTask(error.response.data));
                })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UpdateProjectTask);