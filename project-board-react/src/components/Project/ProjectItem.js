import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/actions';

class ProjectItem extends Component {
    
    constructor(props){
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
    }

    deleteProject(projectID){

        if(window.confirm(`You are deleting Project with ID '${projectID}' , this action cannot be undone.`)) {
            Axios
            .delete(`http://localhost:8081/api/project/${projectID}`)
            .then((res) => {
                console.log(res.data)
                this.props.deleteProject(projectID)
            })
            .catch((error) => console.log(error))
            console.log("GELO");
        }
    }

    render() {
        const { project } = this.props;
        return (
            <div className="ProjectItem">
                <div className="container">
                    <div className="card card-body bg-light mb-3">
                        <div className="row">
                            <div className="col-2">
                                <span className="mx-auto">{project.projectIdentifier}</span>
                            </div>
                            <div className="col-lg-6 col-md-4 col-8">
                                <h3>{project.projectName}</h3>
                                <p>{project.projectDescription}</p>
                            </div>
                            <div className="col-md-4 d-none d-lg-block">
                                <ul className="list-group">
                                    <Link to="/projectboard">
                                        <li className="list-group-item board">
                                            <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                                        </li>
                                    </Link>
                                    <Link to="/updateProject">
                                        <li className="list-group-item update">
                                            <i className="fa fa-edit pr-1"> Update Project Info</i>
                                        </li>
                                    </Link>
                                    <Link to="/" onClick={this.deleteProject.bind(this,project.projectIdentifier)}>
                                        <li className="list-group-item delete">
                                            <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>              
            </div>
        )
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        deleteProject : (projectID) => dispatchEvent(deleteProject(projectID))
    }
}
export default connect(null,mapDispatchToProps)(ProjectItem);
