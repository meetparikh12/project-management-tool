import React, { Component } from 'react'
import axios from 'axios';

class AddProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            projectName: '',
            projectIdentifier: '',
            projectDescription: '',
            start_date: '',
            end_date: ''
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
        const newProject = {
            "projectName" : this.state.projectName,
            "projectIdentifier" : this.state.projectIdentifier,
            "projectDescription" : this.state.projectDescription,
            "startDate" : this.state.start_date,
            "endDate" : this.state.end_date
        }
        console.log(newProject);
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
                                        <input type="text" className="form-control form-control-lg " name="projectName" onChange={this.onChange} value={this.state.projectName} placeholder="Project Name" />
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

export default AddProject;