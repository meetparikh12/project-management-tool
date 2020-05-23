import React, { Component } from 'react';
import ProjectItem from './Project/ProjectItem';
import CreateProjectButton from './Project/CreateProjectButton';
import axios from 'axios';
import { getProjects } from '../actions/actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {trackPromise} from 'react-promise-tracker';
import { toast } from 'react-toastify';
import config from 'react-global-configuration';

class Dashboard extends Component {
  
    componentDidMount(){
        trackPromise(
        axios
        .get(`${config.get('backend_url_projects')}`)
        .then((res) => this.props.getProjects(res.data.projects))
        .catch((error) => {
            toast.error( error.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            });
        }))
    }

    render() {

        const { projects } = this.props;

        let projectItem = [];

        if(projects.length < 1) {
            
            projectItem = (<div className="alert alert-info text-center" role="alert">
                No projects to be displayed.</div>)
        
        } else {
            
            projectItem = projects.map((project) => {
                return <ProjectItem key={project.projectIdentifier} project = {project} />
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

Dashboard.propTypes = {
    projects: PropTypes.array.isRequired,
    getProjects: PropTypes.func.isRequired
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