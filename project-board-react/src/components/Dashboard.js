import React, { Component } from 'react';
import ProjectItem from './Project/ProjectItem';
import CreateProjectButton from './Project/CreateProjectButton';
import axios from 'axios';
import { getProjects } from '../actions/actions';
import { connect } from 'react-redux';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects: []
        }
        
    }
    componentDidMount(){
        
        axios
        .get("http://localhost:8081/api/project")
        .then((res) => this.props.getProjects(res.data))
        .catch((error) => console.log(error))
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.projects){
            this.setState({
                projects: nextProps.projects
            })
        }
    }

    render() {

        let projectItem = [];

        if(this.state.projects.length < 1) {
            
            projectItem = (<div className="alert alert-info text-center" role="alert">
                No projects to be displayed.</div>)
        
        } else {
            
            projectItem = this.state.projects.map((project) => {
            
                return <ProjectItem key={project.projectIdentifier} projectName={project.projectName} 
                projectDescription={project.projectDescription} projectID = {project.projectIdentifier} />
        
            })
        }   

        return (
            
            <div className="DashBoard">
                <div className="projects">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4 text-center">Projects</h1>
                                <br />
                                <CreateProjectButton/>
                                <hr />
                                {projectItem}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        projects : state.getProjectReducer.projects
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        getProjects : (projects) => dispatchEvent(getProjects(projects))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);