import React from 'react'
import { Link } from "react-router-dom";
import Input from '../../Components/Input/Input'
import './Register.scss'

export default function Register({ onLogin }) {
    return (
        <div className="Login-container">
            <h1>Register</h1>
            <p>Already a member?<Link to={'/login'} className="inText"> Sign In</Link></p>
            <Input placeholder="Email" type="email" required></Input>
            <Input placeholder="Password"></Input>
            <button className="button">Sign up</button>
            <div className="spanWithLine">
                <span>or register with</span>
            </div>
            <div className="logosHolder">
                <img src="https://image.flaticon.com/icons/png/512/124/124010.png" alt="fb icon" className="logo"/>
                <img src="https://cdn.icon-icons.com/icons2/2631/PNG/512/google_search_new_logo_icon_159150.png" alt="google icon"  className="logo"/>
            </div>
        </div>
    )
}
