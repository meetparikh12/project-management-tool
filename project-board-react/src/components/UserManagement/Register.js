import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import {trackPromise} from 'react-promise-tracker';
import config from 'react-global-configuration';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:"",
            name:"",
            password:"",
            confirmPassword:"",
            isBtnDisabled: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.loggedInUser.user.userId) {
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
        this.setState({
            isBtnDisabled: !this.state.isBtnDisabled
        })
        const newUser = {
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword
        }
        trackPromise(
            axios
            .post(`${config.get('backend_url_users')}/register`, newUser)
            .then((res)=> {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                });
                this.props.history.push("/login");
            })
            .catch((error) => {
                this.setState({
                    isBtnDisabled: !this.state.isBtnDisabled
                })
                toast.error(error.response.data.message[0].msg || error.response.data.message, 
                    {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});
            }))
    }

    render() {
        return (
            <div className="Register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" name="name" value={this.state.name} onChange= {this.onChange} className="form-control form-control-lg"
                                     placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" value={this.state.email} onChange= {this.onChange} name="email" className="form-control form-control-lg" 
                                    placeholder="Email Address"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" value={this.state.password} onChange= {this.onChange} placeholder="Password" name="password" className="form-control form-control-lg"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" value={this.state.confirmPassword} onChange= {this.onChange}  placeholder="Confirm Password" name="confirmPassword" className="form-control form-control-lg"/>
                                </div>
                                <input type="submit" disabled= {this.state.isBtnDisabled} value="Sign up" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    loggedInUser: PropTypes.object.isRequired

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.user
    }
}

export default connect(mapStateToProps,null)(Register);