import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
export default class AddProjectTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            summary: "",
            acceptanceCriteria: "",
            status: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitForm(e){
       
        e.preventDefault();
        const projectTask = {
            "summary": this.state.summary,
            "acceptanceCriteria": this.state.acceptanceCriteria,
            "status": this.state.status
        }
        axios.post(`http://localhost:8081/api/projectboard`, projectTask)
        .then((res) => {
            
            alert("Data sent successfully!");
            this.setState({
                summary: "",
                acceptanceCriteria: "",
                status: ""
            })

        })
        .catch((error) => {
            console.log(error); 
        })

    }
    render() {
        return (
            <div>
                <div className="addProjectTask">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                
                                <Link to="/" className="btn btn-light">Back to Board</Link>
                                <h4 className="display-4 text-center">Add /Update Project Task</h4>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" name="summary" 
                                        value={this.state.summary} placeholder="Project Task summary" onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" 
                                        value={this.state.acceptanceCriteria} name="acceptanceCriteria" onChange={this.onChange}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control form-control-lg" value={this.state.status} onChange={this.onChange} 
                                        name="status">
                                            <option value="">Select Status</option>
                                            <option value="TO_DO">TO DO</option>
                                            <option value="IN_PROGRESS">IN PROGRESS</option>
                                            <option value="DONE">DONE</option>
                                        </select>
                                    </div>
                                    <input type="submit" onClick={this.onSubmitForm} className="btn btn-primary btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
