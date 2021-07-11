import React, { Component } from 'react';
import { signup } from './auth/auth-service';
// import { Link } from 'react-router-dom';

class Signup extends Component {

  state = { username: '', password: '', campus: '', course: '' }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const campus = this.state.campus;
    const course = this.state.course;

    signup(username, password, campus, course)
      .then(response => {
        this.setState({ username: "", password: "", campus: "", course: "" });
        this.props.updateUser(response)
      })
      .catch(error => console.log(error))
  }

  // HERE
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <>
        <div className='titles-container'>
          <h1>Sign Up</h1>
          <div className='subtitles-container'>
            <h2>Hello!!</h2>
            <h3>Welcome to IronProfile!</h3>
          </div>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <label>Campus</label>
          <input type="text" name="campus" value={this.state.campus} onChange={e => this.handleChange(e)} />

          <label>Course</label>
          <input  type="text" name="course" value={this.state.course} onChange={e => this.handleChange(e)} />

          <div className="btn-form-container">
            <p>If you signup, you agree with all our terms and conditions where we can do whatever we want with the data!</p>
            <button>Create the Account</button>
          </div>
          
        </form>
      </>
    )
  }
}

export default Signup;