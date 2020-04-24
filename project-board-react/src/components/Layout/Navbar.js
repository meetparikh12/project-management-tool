import React from 'react';
import {Link} from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import { SET_CURRENT_USER } from '../../actions/actionTypes';
import setJWTToken from "../../securityUtils/setJWTToken";

class Navbar extends React.Component {
    
    logout(){
        localStorage.removeItem("jwtToken");
        setJWTToken(false);
        this.props.logoutUser();
        window.location.href = "/";
    }
    render() {
    const {validToken, user} = this.props.loggedInUser;

    const userIsAuthenticated = () => {
        
        return (
        <div class="collapse navbar-collapse" id="mobile-nav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <Link class="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
            </ul>

            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <Link class="nav-link" to="/dashboard">
                        <i className="fas fa-user-circle mr-1"/> 
                        {user.fullName}
                    </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/" onClick={this.logout.bind(this)}>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>);
    }

    const userIsNotAuthenticated = () => {
        
        return (
        
        <div class="collapse navbar-collapse" id="mobile-nav">
        
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <Link class="nav-link" to="/register">
                        Sign up
                    </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/login">
                        Login 
                    </Link>
                </li>
            </ul>
        </div>);
    }
    let headerLink;
    if(validToken && user){
        headerLink = userIsAuthenticated() 
    } else {
        headerLink = userIsNotAuthenticated()
    }
    return (
        <div>
            <nav class="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div class="container">
                    <Link class="navbar-brand" to="/">
                        Personal Project Management Tool
                    </Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span class="navbar-toggler-icon" />
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
        loggedInUser: state.user,
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        logoutUser: () => {
            dispatchEvent({
                type: SET_CURRENT_USER,
                payload: {}
            });
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);