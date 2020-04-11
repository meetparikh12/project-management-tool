import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UpdateProject extends Component {
    
    render() {
        const { currentProject } = this.props;
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
                                        <input type="text" className="form-control form-control-lg " value = {currentProject.projectName} placeholder="Project Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" value={currentProject.projectIdentifier} 
                                        placeholder="Unique Project ID" disabled />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg" value = {currentProject.projectDescription} placeholder="Project Description"></textarea>
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" value = {currentProject.startDate} name="start_date" />
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" value = {currentProject.endDate} name="end_date" />
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
    currentProject : PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        currentProject : state.getProjectReducer.currentProject
    }
}


export default connect(mapStateToProps,null)(UpdateProject);