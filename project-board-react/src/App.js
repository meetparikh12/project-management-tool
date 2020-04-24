import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';


class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">
          <Navbar/>
          { 
            //Public routes
          }
          <Route exact path = "/" component={Landing}/>

          { 
            //Private routes
          }
          
          <Route path = "/dashboard" component= { Dashboard } />
          <Route path = "/addProject" component = {AddProject}/>
          <Route path="/updateProject/:id" component = {UpdateProject} />
          <Route path="/projectboard/:projectId" component={ProjectBoard} />
          <Route path="/addProjectTask/:projectId" component={AddProjectTask} />
          <Route path="/updateProjectTask/:backlog_id/:projectSequence" component={UpdateProjectTask}/>
        </div>
      </Router>

     )
  }
}

export default App;