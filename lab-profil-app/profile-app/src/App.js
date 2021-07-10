import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import Signup from './Component/Signup'
import Login from './Component/Login'
import Home from './Component/Home'



class App extends Component{

  state = { loggedInUser: null }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render(){
    return(
      <div>
        <Home/>
       <Switch>
        <Route exact path='/signup' render={() => <Signup updateUser={this.updateLoggedInUser}/>}/> 
        <Route path='/login' component={Login}/> 
       </Switch> 
      </div>
    )
  }
}

export default App;
