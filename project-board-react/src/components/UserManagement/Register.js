import React, { Component } from 'react'

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:"",
            fullName:"",
            password:"",
            confirmPassword:""
        }
        this.onChange = this.onChange.bind(this);
      //  this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({
        [e.target.name] : e.target.value
        })
    }
    render() {
        return (
            <div className="Register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form>
                                <div className="form-group">
                                    <input type="text" name="fullName" value={this.state.fullName} onChange= {this.onChange} className="form-control form-control-lg" placeholder="Name" 
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="email" value={this.state.username} onChange= {this.onChange}  className="form-control form-control-lg" placeholder="Email Address" name="username" />

                                </div>
                                <div className="form-group">
                                    <input type="password" value={this.state.password} onChange= {this.onChange} className="form-control form-control-lg" placeholder="Password" name="password" />
                                </div>
                                <div className="form-group">
                                    <input type="password" value={this.state.confirmPassword} onChange= {this.onChange} className="form-control form-control-lg" placeholder="Confirm Password"
                                        name="confirmPassword" />
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
export default Register;