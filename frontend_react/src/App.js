import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';
import ListStudentComponent from './components/ListStudentComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStudentComponent from './components/CreateStudentComponent';
import ViewStudentComponent from './components/ViewStudentComponent';
import Login from "./components/login_component";
import Register from "./components/register_component";
import Home from "./components/home_component";
import Profile from "./components/profile_component";
import BoardUser from "./components/user_component";
import BoardModerator from "./components/moderator_component";
import BoardAdmin from "./components/admin_component";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path = "/students" component = {ListStudentComponent}></Route>
            <Route path = "/add_student/:id" component = {CreateStudentComponent}></Route>
            <Route path = "/view_student/:id" component = {ViewStudentComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
      </div>
    );
  }
}

export default App;
