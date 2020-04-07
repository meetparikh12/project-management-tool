import React, { Component } from 'react';
import ProjectItem from './Project/ProjectItem';
import { Link } from 'react-router-dom';
class Dashboard extends Component {
    render() {
        return (
            
            <div>
                <div className="projects">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4 text-center">Projects</h1>
                                <br />
                                <Link to="/addProject" className="btn btn-lg btn-info">
                                    Create a Project
                                </Link>
                                <br />
                                <hr />
                                <ProjectItem/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;