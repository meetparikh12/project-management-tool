import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProjectBoard from './components/ProjectBoard';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddProjectTask from './components/ProjectTask/AddProjectTask';
import UpdateProjectTask from './components/ProjectTask/UpdateProjectTask';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';


class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path = "/" component= { Dashboard } />
          <Route path = "/addProject" component = {AddProject}/>
          <Route path="/updateProject/:id" component = {UpdateProject} />
          <Route exact path="/projectboard/:projectId" component={ProjectBoard} />
          <Route path="/addProjectTask/:projectId" component={AddProjectTask} />
          <Route path="/updateProjectTask/:projectId" component={UpdateProjectTask}/>
        </div>
      </Router>

     )
  }
}

export default App;