import React, { Component } from 'react'
import {connect} from 'react-redux';
import classnames from 'classnames';
import { loginRequestError } from '../../actions/actions';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import jwt_decode from 'jwt-decode';
import setJWTToken from '../../securityUtils/setJWTToken'
import { SET_CURRENT_USER } from '../../actions/actionTypes';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const user = {
            "username": this.state.username,
            "password": this.state.password
        }
        this.props.loginRequest(user);
    }
    render() {
        return (
            <div className="Login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Email Address (Username)" name="username"
                                    onChange={this.onChange} value={this.state.username} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" 
                                        onChange={this.onChange} value={this.state.password} />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginRequest: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        errors: state.getErrorReducer.login_error
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        loginRequest: async (user) => {
            try {
                // post => Login request
                const res = await axios.post("/api/users/login",user);
                // extract token from res.data
                const {token} = res.data;
                // store token in local storage
                localStorage.setItem("jwtToken",token);
                // set token in header
                setJWTToken(token);
                //decode token on React
                const decoded = jwt_decode(token);
                //dispatch to our UserReducer
                dispatchEvent({
                    type: SET_CURRENT_USER,
                    payload: decoded
                });
            } catch (error) {
                dispatchEvent(loginRequestError(error.response.data))
            }
        } 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);