import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import  {addProject} from '../../actions/actions';
import classnames from 'classnames';

class UpdateProject extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            startDate:"",
            endDate:"",
            projectName:"",
            projectDescription:"",
            projectLeader:"",
            projectIdentifier: "",
            error: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.current_project){
        this.setState({
            id: nextProps.current_project.id,
            projectName: nextProps.current_project.projectName,
            projectIdentifier: nextProps.current_project.projectIdentifier,
            projectDescription: nextProps.current_project.projectDescription,
            startDate: nextProps.current_project.startDate,
            endDate: nextProps.current_project.endDate,
            projectLeader: nextProps.current_project.projectLeader
        })
    }
        if(nextProps.error){
            this.setState({
                error: nextProps.error
            })
        }
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const updatedProject = {
            "id": this.state.id,
            "projectName": this.state.projectName,
            "projectIdentifier" : this.state.projectIdentifier,
            "projectDescription": this.state.projectDescription,
            "startDate": this.state.startDate,
            "endDate": this.state.endDate,
            "projectLeader": this.state.projectLeader
        }
      this.props.updateProject(updatedProject,this.props.history);
    }

    render() {
        const { error } = this.state;
        return (
            <div className="UpdateProject">
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create / Edit Project form</h5>
                                <hr />
                                <form onSubmit = {this.onSubmit} >
                                    <div className="form-group">
                                        <input type="text" className={classnames("form-control form-control-lg",{
                                            "is-invalid" : error.projectName
                                        })} 
                                        name="projectName" onChange = {this.onChange} value = {this.state.projectName} placeholder="Project Name" />
                                        {error.projectName && (<div className="invalid-feedback">{error.projectName}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg"
                                        name="projectIdentifier" value={this.state.projectIdentifier} 
                                        placeholder="Unique Project ID" disabled />
                                    </div>
                                    <div className="form-group">
                                        <textarea className={classnames("form-control form-control-lg",{
                                            "is-invalid": error.projectDescription
                                        })} 
                                        name="projectDescription"  onChange = {this.onChange}  value = {this.state.projectDescription} placeholder="Project Description"></textarea>
                                        {error.projectDescription && (<div className="invalid-feedback">{error.projectDescription}</div>)}
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" 
                                        name="startDate"  onChange = {this.onChange}  value = {this.state.startDate} />
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" 
                                        name="endDate"  onChange = {this.onChange} value = {this.state.endDate} />
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
UpdateProject.propTypes = {
    current_project : PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    updateProject : PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        current_project : state.getProjectReducer.currentProject,
        error: state.getErrorReducer.project_error
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        updateProject : (project,history) => {
            axios
                .post("/api/project", project)
                .then((res) => {
                    history.push("/dashboard");
                    dispatchEvent(addProject({}));
                })
                .catch((error) => {
                    dispatchEvent(addProject(error.response.data))
                })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateProject);