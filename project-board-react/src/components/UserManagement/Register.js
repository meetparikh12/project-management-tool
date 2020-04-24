import React, { Component } from 'react'
import {connect} from 'react-redux';
import classnames from 'classnames';
import { addNewUser, userCreationError} from '../../actions/actions';
import axios from 'axios';
import { PropTypes } from 'prop-types';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:"",
            fullName:"",
            password:"",
            confirmPassword:"",
            errors:{}
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
        const newUser = {
            "username": this.state.username,
            "fullName": this.state.fullName,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword
        }
        this.props.createNewUser(newUser,this.props.history);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="Register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" name="fullName" value={this.state.fullName} onChange= {this.onChange} className={classnames("form-control form-control-lg",{
                                        "is-invalid": errors.fullName})} placeholder="Name" />
                                    {errors.fullName && (<div className="invalid-feedback">{errors.fullName}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="text" value={this.state.username} onChange= {this.onChange} name="username" className={classnames("form-control form-control-lg",{
                                        "is-invalid": errors.username})} placeholder="Email Address (Username)" />
                                    {errors.username && (<div className="invalid-feedback">{errors.username}</div>)} 

                                </div>
                                <div className="form-group">
                                    <input type="password" value={this.state.password} onChange= {this.onChange} placeholder="Password" name="password" className={classnames("form-control form-control-lg",{
                                        "is-invalid": errors.password})} />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="password" value={this.state.confirmPassword} onChange= {this.onChange}  placeholder="Confirm Password" name="confirmPassword" className={classnames("form-control form-control-lg",{
                                        "is-invalid": errors.confirmPassword})} />
                                    {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)} 
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

Register.propTypes = {
    createNewUser : PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        errors: state.getErrorReducer.user_creation_error
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        createNewUser : (newUser,history) => {
                axios
                .post("api/users/register",newUser)
                .then((res)=> {
                    history.push("/login");
                    dispatchEvent(userCreationError({}))
                })
                .catch((error) => {
                    console.log(error);
                    dispatchEvent(userCreationError(error.response.data))
                })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);