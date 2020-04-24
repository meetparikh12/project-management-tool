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
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import jwt_decode from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken'
import { SET_CURRENT_USER } from './actions/actionTypes';
import store from './store';

const jwtToken = localStorage.jwtToken;
if(jwtToken){
  setJWTToken(jwtToken);
  const decoded_token = jwt_decode(jwtToken);
  //dispatch to our UserReducer
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_token
  });

  const currentTime = Date.now()/1000;
  if(decoded_token.exp < currentTime){
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
    window.location.href ="/";
  }
}

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
          <Route path="/register" component = {Register}/>
          <Route path="/login" component = {Login} />
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