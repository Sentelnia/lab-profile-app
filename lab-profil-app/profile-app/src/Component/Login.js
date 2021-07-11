// auth/Login.js

import React, { Component } from 'react';
import { login } from './auth/auth-service';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { username: '', password: '' }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    login(username, password)
      .then(response => {
        this.setState({ username: "", password: "" });
        this.props.updateUser(response)
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <>
        <div className='titles-container'>
          <h1>Log In</h1>
          <div className='subtitles-container'>
            <h2>Hello!!</h2>
            <h3>Awesome to have you at IronProfile again!</h3>
          </div>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <p>If you don't have an account yet, you can create your account <Link to={"/signup"}>here</Link></p>

          <div className="btn-form-container">
            <p>If you log in, you agree with all our terms and conditions where we can do whatever we want with the data!</p>
            <button>Log in</button>
          </div>
        </form>

      </>
    )
  }
}

export default Login;
