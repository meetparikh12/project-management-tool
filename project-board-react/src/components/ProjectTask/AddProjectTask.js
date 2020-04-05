import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { addProjectTask } from "../../actions/actions";
import classnames from 'classnames';
class AddProjectTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            summary: "",
            acceptanceCriteria: "",
            status: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
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
            "summary": this.state.summary,
            "acceptanceCriteria": this.state.acceptanceCriteria,
            "status": this.state.status
        }
        this.props.addProjectTask(projectTask,this.props.history);
    }
    render() {
        const {errors} = this.state;
        return (
            <div>
                <div className="addProjectTask">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                
                                <Link to="/" className="btn btn-light">Back to Board</Link>
                                <h4 className="display-4 text-center">Add / Update Project Task</h4>
                                <form onSubmit={this.onSubmitForm}>
                                    <div className="form-group">
                                        <input type="text" className={classnames("form-control form-control-lg",{
                                            "is-invalid": errors.summary
                                        })} name="summary" 
                                        value={this.state.summary} placeholder="Project Task summary" onChange={this.onChange}/>
                                        {errors.summary && (<div className="invalid-feedback">{errors.summary}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" 
                                        value={this.state.acceptanceCriteria} name="acceptanceCriteria" onChange={this.onChange}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control form-control-lg" value={this.state.status} onChange={this.onChange} 
                                        name="status">
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

AddProjectTask.propTypes = {
    addProjectTask : PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        errors: state.getErrorReducer
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {

        addProjectTask: (projectTask,history) => {
            axios.post("http://localhost:8081/api/projectboard",projectTask)
            .then((res) => {
                history.push("/");
                dispatchEvent(
                    addProjectTask({})
                )
            }).catch((error) => dispatchEvent(addProjectTask(error.response.data)))
        }
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(AddProjectTask);
