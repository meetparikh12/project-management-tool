import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProjectTask } from '../../../actions/actions';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {getProjectTask} from '../../../actions/actions';
import  PropTypes  from "prop-types";

class ProjectTaskItem extends Component {
    
    constructor(props) {
        super(props);
        this.deleteProjectTask = this.deleteProjectTask.bind(this);
        this.getProjectTask = this.getProjectTask.bind(this);
    }

    getProjectTask(id){

        axios.get(`/api/projectboard/${id}`)
        .then((res) => this.props.getProjectTask(res.data))
        .catch((error) => console.log(error))

    }
    deleteProjectTask(id){

        if(window.confirm(`You are deleting Project Task ${id} , this action cannot be undone.`))
        {
            axios.delete(`/api/projectboard/${id}`)
            .then((res) => {
                this.props.deleteProjectTask(id);
            })
            .catch((error) => console.log(error));
        }
    
    }


    render() {
        const { project_task } = this.props;
        let priorityLevel;
        let priorityClass;

        if(project_task.priority === 1) {
            priorityLevel = "HIGH";
            priorityClass = "bg-danger text-light";
        } 
        else if (project_task.priority === 2) {
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
                            ID: {project_task.projectSequence} -- Priority: {priorityLevel}
                    </div>
                    
                    <div className="card-body bg-light">
                        <h5 className="card-title">{project_task.summary}</h5>
                        <p className="card-text text-truncate ">
                            {project_task.acceptanceCriteria}
                        </p>
                        <Link to={`/projectboard/updateProjectTask/${project_task.id}`} className="btn btn-primary" onClick = {() => this.getProjectTask(project_task.id)}>
                            View / Update
                        </Link>

                        <button onClick = {() => this.deleteProjectTask(project_task.id)} className="btn btn-danger ml-4">
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
    getProjectTask : PropTypes.func.isRequired
}

const mapDispatchToProps = dispatchEvent => {
    return {
        deleteProjectTask : (id) => dispatchEvent(deleteProjectTask(id)),
        getProjectTask : (projectTask) => dispatchEvent(getProjectTask(projectTask))
        }
    }

export default connect(null,mapDispatchToProps)(ProjectTaskItem);
