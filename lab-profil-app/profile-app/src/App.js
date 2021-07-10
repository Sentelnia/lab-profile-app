import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import Signup from './Component/Signup'
import Login from './Component/Login'
import Home from './Component/Home'

import {loggedin} from './Component/auth/auth-service';

class App extends Component{

  state = { loggedInUser: null }

  fetchUser() {
    if (this.state.loggedInUser === null){
      loggedin()
        .then(response => {
          this.setState({loggedInUser: response})
        })
        .catch(err => {
          this.setState({loggedInUser: false}) 
        })
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render(){
    return(
      <div>
        <Home userInSession={this.state.loggedInUser}/>
       <Switch>
        <Route exact path='/signup' render={() => <Signup updateUser={this.updateLoggedInUser}/>}/> 
        <Route path='/login' render={() => <Login updateUser={this.updateLoggedInUser}/>}/> 
       </Switch> 
      </div>
    )
  }
}

export default App;
