import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProjectBoard from './components/ProjectBoard';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import AddProjectTask from './components/ProjectTask/AddProjectTask';


class App extends Component {
  render() {
    return (

      <Router>
          <div>
            <Navbar/>
            <Route exact path="/" component={ProjectBoard} />
            <Route path="/projectTaskForm" component={AddProjectTask} />
          </div>
        </Router>

     )
  }
}

export default App;