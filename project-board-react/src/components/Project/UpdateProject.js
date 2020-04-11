import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UpdateProject extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            start_date:"",
            end_date:"",
            project_name:"",
            project_description:""
        }
        this.onChange = this.onChange.bind(this);
   //     this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.current_project)
        this.setState({
            project_name: nextProps.current_project.projectName,
            project_description: nextProps.current_project.projectDescription,
            start_date: nextProps.current_project.startDate,
            end_date: nextProps.current_project.endDate
        })
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() {
        const { current_project } = this.props;
        return (
            <div className="UpdateProject">
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create / Edit Project form</h5>
                                <hr />
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg " 
                                        name="project_name" onChange = {this.onChange} value = {this.state.project_name} placeholder="Project Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" 
                                        name="projectIdentifier" value={current_project.projectIdentifier} 
                                        placeholder="Unique Project ID" disabled />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg" 
                                        name="project_description"  onChange = {this.onChange}  value = {this.state.project_description} placeholder="Project Description"></textarea>
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" 
                                        name="start_date"  onChange = {this.onChange}  value = {this.state.start_date} />
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" 
                                        name="end_date"  onChange = {this.onChange} value = {this.state.end_date} />
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
    current_project : PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        current_project : state.getProjectReducer.currentProject
    }
}


export default connect(mapStateToProps,null)(UpdateProject);