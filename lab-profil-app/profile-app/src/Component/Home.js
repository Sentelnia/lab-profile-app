import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from './auth/auth-service';

class Home extends Component {
  render() {
    return (
      <>
        {this.props.userInSession ? (
          <>
            <p>Welcome, {this.props.userInSession.username}</p>
            <button onClick={(e) => {
              logout().then(() => this.props.updateUser(null))
            }}>Logout</button>
          </>
        ) : (
          <div className="container">
            <h1>IronProfile</h1>
            <p>Today we will create an app with authorisation, adding some cool styles!</p>
            <div className="btn-container">
              <Link to='/signup'>Sign up </Link>
              <Link to='/login'> Log in</Link>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Home;