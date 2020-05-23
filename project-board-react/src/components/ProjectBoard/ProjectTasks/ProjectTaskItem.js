import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProjectTask } from '../../../actions/actions';
import axios from 'axios';
import {Link} from 'react-router-dom';
import  PropTypes  from "prop-types";
import { toast } from 'react-toastify';
import { trackPromise } from "react-promise-tracker";
import config from 'react-global-configuration';

class ProjectTaskItem extends Component {
    
    constructor(props) {
        super(props);
        this.deleteProjectTask = this.deleteProjectTask.bind(this);
    }

    deleteProjectTask(backlog_id, projectSequence) {

        if(window.confirm(`You are deleting Project Task ${projectSequence} , this action cannot be undone.`))
        {
            trackPromise(
            axios.delete(`${config.get('backend_url_projectTasks')}/${backlog_id}/${projectSequence}`)
            .then((res) => {
                toast.success( res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                });
                this.props.deleteProjectTask(projectSequence);
            })
            .catch((error) => {
                toast.error(error.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});
            }));
        }
    
    }


    render() {
        const { project_task } = this.props;
        let priorityLevel;
        let priorityClass;

        if(project_task.priority === "HIGH") {
            priorityLevel = "HIGH";
            priorityClass = "bg-danger text-light";
        } 
        else if (project_task.priority === "MEDIUM") {
            priorityLevel = "MEDIUM";
            priorityClass = "bg-warning text-light";
        } 
        else {
            priorityLevel = "LOW";
            priorityClass = "bg-info text-light";
        }

        return (
            <div className="ProjectTaskItem">
                <div className="card mb-1 bg-light">

                    <div className={`card-header text-primary ${priorityClass}`}>
                            ID: {project_task.taskId} -- Priority: {priorityLevel}
                    </div>
                    
                    <div className="card-body bg-light">
                        <h5 className="card-title">{project_task.summary}</h5>
                        <p className="card-text text-truncate ">
                            {project_task.acceptanceCriteria}
                        </p>
                        <Link to={`/updateProjectTask/${project_task.project}/${project_task.taskId}`} 
                        className="btn btn-primary">
                            View / Update
                        </Link>

                        <button onClick = {() => this.deleteProjectTask(project_task.project,project_task.taskId)} className="btn btn-danger ml-4">
                            Delete
                        </button>
                    </div>

                </div>

            </div>
        )
    }
}
ProjectTaskItem.propTypes = {

    deleteProjectTask : PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatchEvent => {
    return {
        deleteProjectTask : (projectSequence) => dispatchEvent(deleteProjectTask(projectSequence))
    }
}
export default connect(null,mapDispatchToProps)(ProjectTaskItem);
