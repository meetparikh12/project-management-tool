import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProjectTaskItem from './ProjectTaskItem';
import { connect } from 'react-redux';
import axios from 'axios';
import {getProjectTasks} from '../actions/actions';

class ProjectBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            project_tasks: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8081/api/projectboard")
        .then((res) => {
            this.props.getProjectTasks(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.projectTasks){
            this.setState({
                project_tasks: nextProps.projectTasks
            })
        }
    }

    render() {    
        return (
            <div className="ProjectBoard">
                <div className="container">
                    
                    <Link to="/projectTaskForm" className="btn btn-primary mb-3">
                        <i className="fas fa-plus-circle"> Create Project Task</i>
                    
                    </Link>

                    <br />
                    <hr />
                   {/* {<!-- Backlog STARTS HERE --> } */}
                    
                    <div className="container">
                        
                        <div className="row">
                           
                            <div className="col-md-4">
                                
                                {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */ }
                                
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-secondary text-white">
                                        <h3>TO DO</h3>
                                    </div>
                                </div>

                                <ProjectTaskItem />

                                {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
                            </div>

                            <div className="col-md-4">

                                <div className="card text-center mb-2">
                                    <div className="card-header bg-primary text-white">
                                        <h3>In Progress</h3>
                                    </div>
                                </div>

                                <ProjectTaskItem/>

                            </div>
                           
                            <div className="col-md-4">

                                <div className="card text-center mb-2">
                                    <div className="card-header bg-success text-white">
                                        <h3>Done</h3>
                                    </div>
                                </div>

                                <ProjectTaskItem/>
                                
                           
                            </div>

                        </div>
                    </div>

        {/* <!-- Backlog ENDS HERE --> */}
    </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projectTasks :  state.getProjectTaskReducer.projectTasks
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        getProjectTasks : (projectTasks) => dispatchEvent(getProjectTasks(projectTasks))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectBoard);