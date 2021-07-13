import React, { Component } from 'react';
import { logout } from './auth/auth-service';
import avatar from '../avatar.svg';
// import { Link } from 'react-router-dom'; 

class Profile extends Component {
    
    render() {
        console.log(this.props)
        return (
            <div className="div-container">
                <div className="left">
                    <h1>Profile</h1>
                    <div className="profile-container">
                        <p>Username</p>
                        <h4>{this.props.userInSession ? this.props.userInSession.username : ""}</h4>
                        <p>Campus</p>
                        <h4>{this.props.userInSession ? this.props.userInSession.campus : ""}</h4>
                        <p>Course</p>
                        <h4>{this.props.userInSession ? this.props.userInSession.course : ""}</h4>
                        <button className="btn-logOut" onClick={(e) => {
                            logout().then(() => this.props.updateUser(null))
                        }}>Logout</button>
                    </div>
                </div>
                <div className="right">
                    <img src={avatar} alt="avatar" />
                    <button className="submit-btn" type="submit">Edit Photo</button>
                </div>
            </div>
        )
    }
}

export default Profile;