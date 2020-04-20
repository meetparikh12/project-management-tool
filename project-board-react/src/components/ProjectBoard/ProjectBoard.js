import React from 'react';
import {Link} from 'react-router-dom';
import Backlog from './Backlog';

const ProjectBoard = (props) => {   
    const { projectId } = props.match.params;     
    return (
        <div className="ProjectBoard">
                <div className="container">
                <Link to={`/addProjectTask/${projectId}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br/>
                <hr/>
                <Backlog backlog_id = {projectId} />                
                </div>
        </div>
    )}

export default ProjectBoard;