import React from 'react'
import { Link, useHistory } from "react-router-dom";
import Input from '../../Components/Input/Input'
import { loginService, registerService } from '../../Services/userService';
import './Register.scss'

export default function Register(props) {
    let history = useHistory();

    async function onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        const formData = new FormData(event.target);
        const data = {
            'username': formData.get('username'),
            'fullname': formData.get('fullname'),
            'email': formData.get('email'),
            'password': formData.get('password'),
        }

        await registerService(data);
        const result = await loginService(data);

        if (result) {
            props.onLogin();
            history.push({ pathname: `/` });
        }
    }

    return (
        <div className="Register-container">
            <h1>Register</h1>
            <p>Already a member?<Link to={'/login'} className="inText"> Sign In</Link></p>
            <form id="loginForm" onSubmit={onSubmit}>
                <Input placeholder="Username" type="text" name="username" required></Input>
                <Input placeholder="Fullname" type="text" name="fullname" required></Input>
                <Input placeholder="Email" type="email" name="email" required></Input>
                <Input type="password" placeholder="Password" name="password" required></Input>
                <input type="submit" className="button" placeholder="Sign up" value="Sign up"></input>
            </form>

            <div className="spanWithLine">
                <span>or register with</span>
            </div>
            <div className="logosHolder">
                <img src="http://localhost:3000/img/fb_icon.png" alt="fb icon" className="logo" />
                <img src="http://localhost:3000/img/google_icon.png" alt="google icon" className="logo" />
            </div>
        </div>
    )
}
