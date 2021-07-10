import React, { Component } from 'react';
import {signup} from './auth/auth-service';
import { Link } from 'react-router-dom';

class Signup extends Component{

    state = { username: '', password: '' }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
     
        signup(username, password)
          .then(response => {
            this.setState({username: "", password: ""});
            this.props.updateUser(response)
          })
          .catch(error => console.log(error))
      }
     
      // HERE
      handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

    render(){
      return(
        <div>
          <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          
          <label>Password:</label>
          <input name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          
          <button>I Signup</button>
        </form>
 
        <p>Already have account? 
          <Link to={"/login"}>Login</Link>
        </p>
 
        </div>
      )
    }
  }
  
  export default Signup;