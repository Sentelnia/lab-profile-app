import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import {logout} from './auth/auth-service';

class Home extends Component{
    render(){
      return(
        <div>
        {this.props.userInSession ? (
          <>
          <p>Welcome, {this.props.userInSession.username}</p>
          <button onClick={(e) => {
              logout().then(() => this.props.updateUser(null))
            }}>Logout</button>
          </>
        ) : (
          <>
        <Link to='/signup'>Signup </Link>
        <Link to='/login'> Login</Link>
        </>
        )}
        
        </div>
      )
    }
  }
  
  export default Home;