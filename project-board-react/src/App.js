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
          <div>
            <Navbar/>
            <Route exact path = "/" component= { Dashboard } />
            <Route path = "/addProject" component = {AddProject}/>
            <Route path="/updateProject" component = {UpdateProject} />
            <Route exact path="/projectboard" component={ProjectBoard} />
            <Route path="/projectboard/addProjectTask" component={AddProjectTask} />
            <Route path="/projectboard/updateProjectTask/:id" component={UpdateProjectTask}/>
          </div>
        </Router>

     )
  }
}

export default App;