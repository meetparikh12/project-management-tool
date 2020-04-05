import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import PropTypes from "prop-types";
import { addProjectTask } from '../../actions/actions';

class UpdateProjectTask extends Component {

    constructor(props){
        super(props);
        this.state = {
            errors: {},
            summary: '',
            acceptanceCriteria: '',
            status:'',
            id: 0
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        
        if(nextProps.currentTask){
        this.setState({
            id: nextProps.currentTask.id,
            summary: nextProps.currentTask.summary,
            acceptanceCriteria: nextProps.currentTask.acceptanceCriteria,
            status: nextProps.currentTask.status
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
            <div>
                <div className="updateProjectTask">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                
                                <Link 
                                to="/" className="btn btn-light">
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
        currentTask: state.getProjectTaskReducer.currentTask,
        errors: state.getErrorReducer
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        updateProjectTask : (projectTask, history) => {
            axios.post("http://localhost:8081/api/projectboard", projectTask)
                .then((res) => {
                    history.push("/");
                    dispatchEvent(addProjectTask({}));
                })
                .catch((error) => dispatchEvent(addProjectTask(error.response.data)))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UpdateProjectTask);