import React, { Component } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import {trackPromise} from 'react-promise-tracker';
toast.configure();
class AddProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            projectName: '',
            projectIdentifier: '',
            projectDescription: '',
            start_date: '',
            end_date: '',
            isBtnDisabled: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){

        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({isBtnDisabled: !this.state.isBtnDisabled});
        const newProject = {
            "projectName" : this.state.projectName,
            "projectIdentifier" : this.state.projectIdentifier,
            "projectDescription" : this.state.projectDescription,
            "startDate" : this.state.start_date,
            "endDate" : this.state.end_date
        }
        trackPromise(
        axios
        .post("http://localhost:4200/api/projects",newProject)
        .then((res) => {
            alert(`Project with ID '${newProject.projectIdentifier.toUpperCase()}' created successfully.`);
            this.props.history.push("/dashboard");
        
        })
        .catch((error) => {
            this.setState({isBtnDisabled: !this.state.isBtnDisabled});
            toast.error(error.response.data.message[0].msg || error.response.data.message, 
                {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});
        }))
    
    }

    render() {
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
                                        <input type="text" className="form-control form-control-lg" name="projectName" 
                                            onChange={this.onChange} value={this.state.projectName} placeholder="Project Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" name="projectIdentifier" onChange={this.onChange} value={this.state.projectIdentifier} placeholder="Unique Project ID"
                                             />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg" name="projectDescription" onChange={this.onChange} value={this.state.projectDescription} placeholder="Project Description"></textarea>
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" name="start_date" onChange={this.onChange} value={this.state.start_date}/>
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" name="end_date" onChange={this.onChange} value={this.state.end_date}/>
                                    </div>

                                    <input type="submit" disabled={this.state.isBtnDisabled} value="Add Project" className="btn btn-primary btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default AddProject;