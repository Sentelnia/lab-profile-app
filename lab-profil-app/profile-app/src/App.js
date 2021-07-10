import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import Signup from './Component/Signup'
import Login from './Component/Login'
import Home from './Component/Home'



class App extends Component{
  render(){
    return(
      <div>
        <Home/>
       <Switch>
        <Route exact path='/signup' component={Signup}/> 
        <Route path='/login' component={Login}/> 
       </Switch> 
      </div>
    )
  }
}

export default App;
