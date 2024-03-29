import React from 'react';
import {Link} from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import { SET_CURRENT_USER, GET_PROJECTS, GET_PROJECT_TASKS } from '../../actions/actionTypes';
import setJWTToken from "../../securityUtils/setJWTToken";
import store from '../../store';

class Navbar extends React.Component {
    
    logout(){
        localStorage.removeItem("jwtToken");
        setJWTToken(false);
        this.props.logoutUser();
        store.dispatch({
           type: GET_PROJECTS,payload: []
          
        })
        store.dispatch({type: GET_PROJECT_TASKS, payload: []})
    }
    render() {
    
    const userIsAuthenticated = () => {
        
        return (
        <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        <i className="fas fa-user-circle mr-1"/> 
                        {this.props.loggedInUser.user.name}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={this.logout.bind(this)}>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>);
    }

    const userIsNotAuthenticated = () => {
        
        return (
        
        <div className="collapse navbar-collapse" id="mobile-nav">
        
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login 
                    </Link>
                </li>
            </ul>
        </div>);
    }
    let headerLink;
    if(this.props.loggedInUser.user.userId){
        headerLink = userIsAuthenticated() 
    } else {
        headerLink = userIsNotAuthenticated()
    }
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Personal Project Management Tool
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>
                    
                    {headerLink}
                    
                </div>
            </nav>
        </div>
    )
}
}
Navbar.propTypes = {
    loggedInUser: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.user
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        logoutUser: () => {
           
                dispatchEvent({type: SET_CURRENT_USER,payload: {}})
                
            
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);