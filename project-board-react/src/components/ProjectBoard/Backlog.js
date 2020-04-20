import React, { Component } from 'react';
import ProjectTaskItem from './ProjectTasks/ProjectTaskItem';
import { connect } from 'react-redux';
import axios from 'axios';
import {getProjectTasks} from '../../actions/actions';
import PropTypes from 'prop-types';
import { GET_ERRORS } from '../../actions/actionTypes';

class Backlog extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            project_tasks: [],
            errors: {}
        }
    }

    componentDidMount(){

        this.props.getProjectTasks(this.props.backlog_id)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.projectTasks){
            this.setState({
                project_tasks: nextProps.projectTasks
            })
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })

        }
    }

    render() {    
        const { errors } = this.state;
        let ProjectBoardContent;
        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];
        
        const projectBoardAlgo = (projectTasks) => {
            
            if(projectTasks.length < 1) {
                if(errors.projectNotFound) {
                    return (
                        <div className="alert alert-danger text-center" role="alert">{errors.projectNotFound}</div>
                    );
                } else {
                    return (
                        <div className="alert alert-info text-center" role="alert"> No project tasks to be displayed.</div>
                    );
                }
            } else {
                const tasks = projectTasks.map((projectTask) => 
                    
                    <ProjectTaskItem key={projectTask.id} project_task = {projectTask} />
                );

                for(let i=0; i<tasks.length; i++){
                    
                    if(tasks[i].props.project_task.status === "TO_DO"){
                        todoItems.push(tasks[i]);
                    }
                    if (tasks[i].props.project_task.status === "IN_PROGRESS") {
                        inProgressItems.push(tasks[i]);
                    }
                    if (tasks[i].props.project_task.status === "DONE") {
                        doneItems.push(tasks[i]);
                    }
                }
                
                return (
                    <React.Fragment>

                        <div className="container">       
                            <div className="row">
                                <div className="col-md-4">
                                    {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */ }                                    
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-secondary text-white">
                                            <h3>TO DO</h3>
                                        </div>
                                    </div>
                                    {todoItems}
                                    {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
                                </div>

                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-primary text-white">
                                            <h3>In Progress</h3>
                                        </div>
                                    </div>
                                    {inProgressItems}
                                </div>
                            
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-success text-white">
                                            <h3>Done</h3>
                                        </div>
                                    </div>
                                    {doneItems}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            }
        };

        ProjectBoardContent = projectBoardAlgo(this.state.project_tasks);
        
        return (
            <div className="Backlog">
                {ProjectBoardContent}                
            </div>
        )
    }
}

Backlog.propTypes = {
    getProjectTasks : PropTypes.func.isRequired,
    projecTasks: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        projectTasks :  state.getBacklogReducer.projectTasks,
        errors: state.getErrorReducer.project_task_error
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        getProjectTasks : (backlog_id) => {
            axios.get(`/api/backlog/${backlog_id}`)
                .then((res) => {
                    dispatchEvent(getProjectTasks((res.data)));
                })
                .catch((error) => {
                    console.log(error)
                    dispatchEvent({
                        type: GET_ERRORS,
                        payload: error.response.data
                    })
                })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Backlog);