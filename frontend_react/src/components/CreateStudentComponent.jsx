import React, { Component } from 'react';
import StudentService from '../services/StudentService';

class CreateStudentComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            universityYear: '',
            emailId: '',
            address: '',
            dateOfBirth: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeUniversityHandler = this.changeUniversityHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeDateOfBirthHandler = this.changeDateOfBirthHandler.bind(this);
        this.saveOrUpdateStudent = this.saveOrUpdateStudent.bind(this);
    }

    componentDidMount(){
        if(this.state.id == 'add'){
            return
        }else{
            StudentService.getStudentById(this.state.id).then( (res) =>{
                let student = res.data;
                this.setState({firstName: student.firstName,
                    lastName: student.lastName,
                    universityYear: student.universityYear,
                    emailId: student.emailId,
                    address: student.address,
                    dateOfBirth: student.dateOfBirth
                });
            });
        }
    }

    saveOrUpdateStudent = (e) =>{
        e.preventDefault();
        let student = {firstName: this.state.firstName, lastName: this.state.lastName, universityYear: this.state.universityYear, emailId: this.state.emailId, address: this.state.address, dateOfBirth: this.state.dateOfBirth};
        console.log('student => ' + JSON.stringify(student));

        if(this.state.id == 'add'){
            StudentService.createStudent(student).then(res => {
                this.props.history.push('/students');
            });
        }else{
            StudentService.updateStudent(student, this.state.id).then( res => {
                this.props.history.push('/students');
            });
        }
        
    }

    changeFirstNameHandler = (event) =>{
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) =>{
        this.setState({lastName: event.target.value});
    }

    changeUniversityHandler = (event) =>{
        this.setState({universityYear: event.target.value});
    }

    changeEmailHandler = (event) =>{
        this.setState({emailId: event.target.value});
    }

    changeAddressHandler = (event) =>{
        this.setState({address: event.target.value});
    }

    changeDateOfBirthHandler = (event) =>{
        this.setState({dateOfBirth: event.target.value});
    }

    cancel(){
        this.props.history.push("/students");
    }

    getTitle(){
        if(this.state.id == 'add'){
            return <h3 className ="text-center"> Add Student </h3>
        }else{
            return <h3 className ="text-center"> Update Student </h3>
        }
    }

    render() {
        return (
            <div>
                    <div className = "container">
                        <div className = "row">
                            <div style={{marginTop: "40px"}} className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className="card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder = "First Name" name = "firstName" className="form-control"
                                                value = {this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder = "Last Name" name = "lastName" className="form-control"
                                                value = {this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Year: </label>
                                            <input placeholder = "Year" name = "universityYear" className="form-control"
                                                value = {this.state.universityYear} onChange={this.changeUniversityHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Address: </label>
                                            <input placeholder = "Email Address" name = "emailId" className="form-control"
                                                value = {this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Address: </label>
                                            <input placeholder = "Address" name = "address" className="form-control"
                                                value = {this.state.address} onChange={this.changeAddressHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Date of birth: </label>
                                            <input placeholder = "Date of birth" name = "dateOfBirth" className="form-control"
                                                value = {this.state.dateOfBirth} onChange={this.changeDateOfBirthHandler}/>
                                        </div>

                                        <button className = "btn btn-success" onClick={this.saveOrUpdateStudent}>Save</button>
                                        <button className = "btn btn-danger" onClick={this.cancel.bind(this)} style = {{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default CreateStudentComponent;