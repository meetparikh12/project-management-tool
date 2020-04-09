import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { addProject } from '../../actions/actions';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class AddProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            projectName: '',
            projectIdentifier: '',
            projectDescription: '',
            start_date: '',
            end_date: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.projectError){
            this.setState({
                errors: nextProps.projectError
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
        const newProject = {
            "projectName" : this.state.projectName,
            "projectIdentifier" : this.state.projectIdentifier,
            "projectDescription" : this.state.projectDescription,
            "startDate" : this.state.start_date,
            "endDate" : this.state.end_date
        }

        axios
        .post("/api/project",newProject)
        .then((res) => {
            alert(`Project with ID '${res.data.projectIdentifier}' created successfully.`);
            this.props.history.push("/");
            this.props.getProjectErrors({});
            this.setState({
                projectName: '',
                projectIdentifier: '',
                projectDescription: '',
                start_date: '',
                end_date: '',
                errors: {}
            })
        })
        .catch((error) => {
            this.props.getProjectErrors(error.response.data);
            console.log(error);
        })
    
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="AddProject">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create / Edit Project form</h5>
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" className={classnames("form-control form-control-lg",{
                                            "is-invalid" : errors.projectName })} name="projectName" 
                                            onChange={this.onChange} value={this.state.projectName} placeholder="Project Name" />
                                        { errors.projectName && (<div className="invalid-feedback"> {errors.projectName} </div>)}
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className={classnames("form-control form-control-lg",{
                                            "is-invalid" : errors.projectIdentifier })} name="projectIdentifier" onChange={this.onChange} value={this.state.projectIdentifier} placeholder="Unique Project ID"
                                             />
                                        { errors.projectIdentifier && (<div className="invalid-feedback"> {errors.projectIdentifier} </div>)}
                                    </div>
                                    <div className="form-group">
                                        <textarea className={classnames("form-control form-control-lg",{
                                            "is-invalid" : errors.projectDescription })} name="projectDescription" onChange={this.onChange} value={this.state.projectDescription} placeholder="Project Description"></textarea>
                                        { errors.projectDescription && (<div className="invalid-feedback"> {errors.projectDescription} </div>)}
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" name="start_date" onChange={this.onChange} value={this.state.start_date}/>
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" name="end_date" onChange={this.onChange} value={this.state.end_date}/>
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

AddProject.propTypes = {

    projectError : PropTypes.object.isRequired,
    getProjectErrors : PropTypes.func.isRequired

}

const mapStateToProps = (state) => {
    return {
        projectError: state.getErrorReducer.project_error
    }
}

const mapDispatchToProps = dispatchEvent => {
    
    return {
        
        getProjectErrors: (error) => {
            dispatchEvent(addProject(error));
        } 
    }

}



export default connect(mapStateToProps,mapDispatchToProps)(AddProject);