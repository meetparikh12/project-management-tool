import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import jwt_decode from 'jwt-decode';
import setJWTToken from '../../securityUtils/setJWTToken'
import { SET_CURRENT_USER } from '../../actions/actionTypes';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {trackPromise} from 'react-promise-tracker';
import config from 'react-global-configuration';

toast.configure();
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            isBtnDisabled: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.loggedInUser.user.userId){
            this.props.history.push("/dashboard");
        }
    }
    
    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        this.setState({isBtnDisabled: !this.state.isBtnDisabled})
        const user = {
            "email": this.state.email,
            "password": this.state.password
        }
        // post => Login request
        trackPromise(
        axios.post(`${config.get('backend_url_users')}/login`, user)
        .then((res) => {
        // extract token from res.data
        const {token} = res.data;
        // store token in local storage
        localStorage.setItem("jwtToken",token);
        // set token in header
        setJWTToken(token);
        //decode token on React
        const decoded_token = jwt_decode(token);
        toast.success("Hi, " + decoded_token.name, {
            position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000
        });
        //dispatch to our UserReducer
        this.props.setUserInfo(decoded_token, this.props.history);
        })
        .catch((error) => {
            this.setState({isBtnDisabled: !this.state.isBtnDisabled})
            toast.error(error.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});
        }))
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
                                    <input type="text" className="form-control form-control-lg" placeholder="Email Address" name="email"
                                    onChange={this.onChange} value={this.state.email} />
                                   </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" 
                                        onChange={this.onChange} value={this.state.password} />
                                </div>
                                <input type="submit" disabled = {this.state.isBtnDisabled} value="Login" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loggedInUser: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        loggedInUser : state.user
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        setUserInfo: (userInfo, history) => {
            dispatchEvent({
                type: SET_CURRENT_USER,
                payload: userInfo
            });
            history.push('/dashboard');
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);