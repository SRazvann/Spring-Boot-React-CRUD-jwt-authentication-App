import React, { Component } from 'react';
import StudentService from '../services/StudentService';

class ViewStudentComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            student: {}
        }
    }

    componentDidMount(){
        StudentService.getStudentById(this.state.id).then( res =>{
            this.setState({student: res.data});
        })
    }

    uniYear(year){
        if(year == 1){
            return year+'st'
        }else if(year == 2){
            return year+'nd'
        }else if(year == 3){
            return year+'rd'
        }else if(year >= 4 && year<20){
            return year+'th'
        }else{
            return "Unassigned";
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Student Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> <b>First Name: </b></label>
                            <div style={{marginLeft: "7px", marginTop: "10px"}}> {this.state.student.firstName}</div>
                        </div>
                        <div className = "row">
                            <label> <b>Name: </b></label>
                            <div style={{marginLeft: "7px", marginTop: "10px"}}> {this.state.student.lastName}</div>
                        </div>
                        <div className = "row">
                            <label> <b>Year: </b></label>
                            <div style={{marginLeft: "7px", marginTop: "10px"}}> {this.uniYear(this.state.student.universityYear)}</div>
                        </div>
                        <div className = "row">
                            <label> <b>Email:</b> </label>
                            <div style={{marginLeft: "7px", marginTop: "10px"}}> {this.state.student.emailId}</div>
                        </div>
                        <div className = "row">
                            <label> <b>Address:</b> </label>
                            <div style={{marginLeft: "7px", marginTop: "10px"}}> {this.state.student.address}</div>
                        </div>
                        <div className = "row">
                            <label> <b>Date of birth:</b> </label>
                            <div style={{marginLeft: "7px", marginTop: "10px"}}> {this.state.student.dateOfBirth}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewStudentComponent;