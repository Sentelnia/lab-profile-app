import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom'; 
import { Redirect } from "react-router-dom";

import Signup from './Component/Signup'
import Login from './Component/Login'
import Home from './Component/Home'
import Profile from './Component/Profile'

import { loggedin } from './Component/auth/auth-service';

class App extends Component {

  state = { loggedInUser: null }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      loggedin()
        .then(response => {
          this.setState({ loggedInUser: response })
        })
        .catch(err => {
          this.setState({ loggedInUser: false })
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

  render() {
    console.log('loggedInUser',this.state.loggedInUser);
    return (
      <>
        <Switch>
          <Route exact path='/' render={() => (this.state.loggedInUser ? <Redirect to="/profile" /> : <Home userInSession={this.state.loggedInUser} updateUser={this.updateLoggedInUser} />)} />
          <Route exact path='/profile' render={() => (this.state.loggedInUser ? <Profile userInSession={this.state.loggedInUser} updateUser={this.updateLoggedInUser}  /> : <Redirect to="/login" /> )}/>
          <Route exact path='/signup' render={() => (this.state.loggedInUser ? <Redirect to="/profile" /> : <Signup updateUser={this.updateLoggedInUser} />)} />
          <Route exact path='/login' render={() => (this.state.loggedInUser ? <Redirect to="/profile" /> : <Login updateUser={this.updateLoggedInUser} />)} />
        </Switch>
      </>
    )
  }
}

export default App;
