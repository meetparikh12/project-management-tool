import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProjectTask } from '../actions/actions';
import axios from 'axios';

class ProjectTaskItem extends Component {
    
    constructor(props) {
        super(props);
        this.deleteProjectTask = this.deleteProjectTask.bind(this);
    }

    deleteProjectTask(id){

        if(window.confirm(`You are deleting project task ${id}, this action cannot be undone.`))
        {
            axios.delete(`http://localhost:8081/api/projectboard/${id}`)
            .then((res) => {
                this.props.deleteProjectTask(id);
            })
            .catch((error) => console.log(error));
        }
    
    }


    render() {
        const { project_task } = this.props;
        return (
            <div>
                <div className="card mb-1 bg-light">

                    <div className="card-header text-primary">
                        ID: {project_task.id}
                    </div>
                    
                    <div className="card-body bg-light">
                        <h5 className="card-title">{project_task.summary}</h5>
                        <p className="card-text text-truncate ">
                            {project_task.acceptanceCriteria}
                        </p>
                        <a href="" className="btn btn-primary">
                            View / Update
                        </a>

                        <button onClick = {() => this.deleteProjectTask(project_task.id)} className="btn btn-danger ml-4">
                            Delete
                        </button>
                    </div>

                </div>

            </div>
        )
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        deleteProjectTask : (id) => dispatchEvent(deleteProjectTask(id))
        }
    }

export default connect(null,mapDispatchToProps)(ProjectTaskItem);
