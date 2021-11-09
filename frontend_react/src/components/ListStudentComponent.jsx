import React, { Component } from 'react'
import StudentService from '../services/StudentService';
import Background from 'D:/Proj/react app/frontend_react/src/university.png';

var sectionStyle = {
  position: 'absolute',
  right: "0px",
  width: "133%",
  height: "150px",
  backgroundImage: "url(" + Background + ")"
};


class ListStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                students: []
        }
        this.addStudent = this.addStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.uniYear = this.uniYear.bind(this);
    }

    deleteStudent(id){
        StudentService.deleteStudent(id).then( res => {
            this.setState({students: this.state.students.filter(student => student.id !== id)});
        });
    }

    viewStudent(id){
        this.props.history.push(`/view_student/${id}`)
    }

    editStudent(id){
        this.props.history.push(`/add_student/${id}`)
    }

    componentDidMount(){
        StudentService.getStudents().then((res) => {
            this.setState({ students: res.data});
        });
    }


    addStudent(){
        this.props.history.push("/add_student/add");
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
                <section style={ sectionStyle } >
                </section>
                 <h2 style = {{marginBottom: "125px"}}>s</h2>
                 <h2 className="text-center">Students List</h2>
                 <div className = "row">
                     <button style = {{marginBottom: "10px"}}className="btn btn-primary" onClick={this.addStudent}> Add Student </button>
                 </div>
                 <div className = "row">
                        <table style = {{marginBottom: "80px"}} className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> First Name</th>
                                    <th> Last Name</th>
                                    <th className = 'text-center'> Year</th>
                                    <th className = 'text-center'> Email</th>
                                    <th className = 'text-center'> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.students.map(
                                        student => 
                                        <tr key = {student.id}>
                                             <td> {student.firstName} </td>   
                                             <td> {student.lastName}</td>
                                             <td className = 'text-center'> {this.uniYear(student.universityYear)}</td>
                                             <td className = 'text-center'> {student.emailId}</td>
                                             <td className = 'text-center'>
                                                 <button onClick = { () => this.editStudent(student.id)} className = "btn btn-primary">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStudent(student.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewStudent(student.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }   
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListStudentComponent