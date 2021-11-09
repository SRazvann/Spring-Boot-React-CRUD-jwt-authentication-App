import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';

import AuthService from "../services/auth_service";



class HeaderComponent extends Component {
    constructor(props){
        super(props)
        
        this.logOut = this.logOut.bind(this);

        this.state ={
            showModeratorBoard: false,
            showAdminBoard: false,
            showStudentDBM: false,
            showStudentDBA: false,
            showModeratorA: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
            showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            showStudentDBM: user.roles.includes("ROLE_MODERATOR"),
            showStudentDBA: user.roles.includes("ROLE_ADMIN"),
            showModeratorA: user.roles.includes("ROLE_ADMIN")
          });
        }
      }
    
      logOut() {
        AuthService.logout();
      }
    


    render() {
        const { currentUser, showModeratorBoard, showAdminBoard, showStudentDBM, showStudentDBA, showModeratorA } = this.state;

        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
                        <div><a href="/" className="navbar-brand">Student Database</a></div>
                    
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                            </li>

                            {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                User Content
                                </Link>
                            </li>
                            )}

                            {showModeratorBoard && (
                            <li className="nav-item">
                                <Link to={"/mod"} className="nav-link">
                                Moderator Content
                                </Link>
                            </li>
                            )}

                            {showModeratorA && (
                            <li className="nav-item">
                                <Link to={"/mod"} className="nav-link">
                                Moderator Content
                                </Link>
                            </li>
                            )}

                            {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link" >
                                Admin Content
                                </Link>
                            </li>
                            )}

                            {showStudentDBM && (
                            <li className="nav-item">
                                <Link to={"/students"} className="nav-link" style={{backgroundColor: "black", color: "white", align: "middle"}}>
                                Student Database
                                </Link>
                            </li>
                            )}

                            {showStudentDBA && (
                            <li className="nav-item">
                                <Link to={"/students"} className="nav-link" style={{backgroundColor: "black", color: "white", align: "middle"}}>
                                Student Database
                                </Link>
                            </li>
                            )}

                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                Logout
                                </a>
                            </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                Sign Up
                                </Link>
                            </li>
                            </div>
                        )}
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;