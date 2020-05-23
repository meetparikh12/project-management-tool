import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import PropTypes from "prop-types";
import { getProjectTask } from '../../../actions/actions';
import { toast } from 'react-toastify';
import { trackPromise } from "react-promise-tracker";

class UpdateProjectTask extends Component {

    constructor(props){
        super(props);
        this.state = {
            projectIdentifier: "",
            taskId:"",
            summary: "",
            acceptanceCriteria: "",
            dueDate: "",
            priority: "",
            status: "",
            isBtnDisabled: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        const { backlog_id, projectSequence } = this.props.match.params;
        this.props.getProjectTask(backlog_id,projectSequence, this.props.history);
        
    }
    componentWillReceiveProps(nextProps){
        
        if(nextProps.currentTask){
        this.setState({
            projectIdentifier: nextProps.currentTask.projectIdentifier,
            summary: nextProps.currentTask.summary,
            acceptanceCriteria: nextProps.currentTask.acceptanceCriteria,
            dueDate: nextProps.currentTask.dueDate,
            priority: nextProps.currentTask.priority,
            status: nextProps.currentTask.status,
            taskId: nextProps.currentTask.taskId
            })
        }
       
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({isBtnDisabled: !this.state.isBtnDisabled});
        const updateProjectTask = {
            "summary": this.state.summary,
            "acceptanceCriteria": this.state.acceptanceCriteria,
            "dueDate": this.state.dueDate,
            "priority": this.state.priority,
            "status": this.state.status
        }
        trackPromise(
            axios
            .patch(`http://localhost:4200/api/projects/projectTask/${this.state.projectIdentifier}/${this.state.taskId}`, updateProjectTask)
            .then((res) => {
                this.props.history.push(`/projectboard/${this.state.projectIdentifier}`);
            })
            .catch((error) => {
                this.setState({isBtnDisabled: !this.state.isBtnDisabled})
                console.log(error);
                toast.error(error.response.data.message[0].msg || error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
                })
            }))
    }

    onChange(e){

        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
            <div className="UpdateProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link 
                            to={`/projectboard/${this.state.projectIdentifier}`} className="btn btn-light">
                                Back to Board
                            </Link>
                            
                            <h4 className="display-4 text-center">Add / Update Project Task</h4>
                            <p className="lead text-center"><b>Project ID: </b>{this.state.projectIdentifier} | <b>Project Task ID: </b>
                            {this.state.taskId} </p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                        name="summary" 
                                    value = {this.state.summary} placeholder="Project Task summary" 
                                    onChange={this.onChange}/>
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
                                        <option value="">Select Priority</option>
                                        <option value="HIGH">High</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="LOW">Low</option>
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <select className="form-control form-control-lg" onChange={this.onChange} name="status" 
                                    value = {this.state.status}>
                                        <option value="">Select Status</option>
                                        <option value="TO DO">TO DO</option>
                                        <option value="IN PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" disabled={this.state.isBtnDisabled} value="Update Project Task" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProjectTask.propTypes = {

    currentTask : PropTypes.object.isRequired,
    getProjectTask: PropTypes.func.isRequired

}

const mapStateToProps = state => {
    
    return {
        currentTask: state.getBacklogReducer.currentTask,
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        getProjectTask: (backlog_id, taskId, history) => {
            trackPromise(
              axios.get(`http://localhost:4200/api/projects/projectTask/${backlog_id}/${taskId}`)
                  .then((res) => dispatchEvent(getProjectTask(res.data.projectTask)))
                  .catch((error) => {
                      toast.error(error.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT});
                      history.push("/dashboard");
                    }))
          }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UpdateProjectTask);