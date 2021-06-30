import React from 'react'
import { Link, useHistory } from "react-router-dom";
import Input from '../../Components/Input/Input'
import './Login.scss'
import { loginService } from '../../Services/userService';

export default function Login(props) {
    let history = useHistory();

    async function onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        const formData = new FormData(event.target);
        const data = {
            'username': formData.get('username'),
            'password': formData.get('password')
        }

        const result = await loginService(data);
        
        if (result) {
            props.onLogin();
            history.push({ pathname: `/` });
        }
    }


    return (
        <div className="Login-container">
            <h1>Log In</h1>
            <p>New to the site?<Link to={'/register'} className="inText"> Sign Up</Link></p>
            <form id="loginForm" onSubmit={onSubmit}>
                <Input placeholder="username" type="text" name="username"></Input>
                <Input placeholder="Password" type="password" name="password"></Input>
                <input type="submit" className="button" placeholder="Log In" value="Log in"></input>
            </form>
            <div className="spanWithLine">
                <span>or log in with</span>
            </div>
            <div className="logosHolder">
                <img src="http://localhost:3000/img/fb_icon.png" alt="fb icon" className="logo"/>
                <img src="http://localhost:3000/img/google_icon.png" alt="google icon"  className="logo"/>
            </div>
        </div>
    )
}
