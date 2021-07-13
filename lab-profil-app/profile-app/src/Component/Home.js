import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { logout } from './auth/auth-service';
import { Redirect } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <>
      {this.props.userInSession ? <Redirect to="/profile" /> : (
      <div className="container">
        <h1>IronProfile</h1>
        <p>Today we will create an app with authorisation, adding some cool styles!</p>
        <div className="btn-container">
          <Link to='/signup'>Sign up </Link>
          <Link to='/login'> Log in</Link>
        </div>
      </div>)}
      </>
    )
  }
}

export default Home;