import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { trackPromise } from "react-promise-tracker";
import config from "react-global-configuration";
toast.configure();
class UpdateProject extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            startDate:" ",
            endDate:" ",
            projectName:"",
            projectDescription:"",
            projectIdentifier: "",
            isBtnDisabled: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.current_project){
            this.setState({
                projectName: nextProps.current_project.projectName,
                projectIdentifier: nextProps.current_project.projectIdentifier,
                projectDescription: nextProps.current_project.projectDescription,
                startDate: nextProps.current_project.startDate,
                endDate: nextProps.current_project.endDate
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
        this.setState({isBtnDisabled: !this.state.isBtnDisabled});
        const updatedProject = {
            "projectName": this.state.projectName,
            "projectDescription": this.state.projectDescription,
            "startDate": this.state.startDate,
            "endDate": this.state.endDate,
        }
      trackPromise(
          axios
          .patch(`${config.get('backend_url_projects')}/${this.state.projectIdentifier}`, updatedProject)
          .then((res) => {
              toast.success(res.data.message, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 2000
              });
              this.props.history.push("/dashboard");
          })
          .catch((error) => {
              this.setState({isBtnDisabled: !this.state.isBtnDisabled});
              toast.error(error.response.data.message[0].msg || error.response.data.message, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 2000
              });
          }))
    }

    render() {
        return (
            <div className="UpdateProject">
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create / Edit Project form</h5>
                                <hr />
                                <form onSubmit = {this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" 
                                        name="projectName" onChange = {this.onChange} value = {this.state.projectName} placeholder="Project Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg"
                                        name="projectIdentifier" value={this.state.projectIdentifier} 
                                        placeholder="Unique Project ID" disabled />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg"
                                        name="projectDescription"  onChange = {this.onChange}  value = {this.state.projectDescription} placeholder="Project Description"></textarea>
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

                                    <input type="submit" disabled={this.state.isBtnDisabled} value="Update Project" className="btn btn-primary btn-block mt-4" />
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
    current_project : PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        current_project : state.getProjectReducer.currentProject,
    }
}

export default connect(mapStateToProps,null)(UpdateProject);