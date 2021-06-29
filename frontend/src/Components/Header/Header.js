import React, { Component } from 'react'
import './Header.scss'
import { Link } from "react-router-dom";
import { isAuthorized } from '../../Services/userService';

export default class Header extends Component {
    render() {
        const logged = this.props.loggedIn;

        let links = [];
        if (logged) {
            if (isAuthorized('admin')) {
                links.push({ href: "/admin", text: "Admin Page", icon: "fas fa-users-cog" });
            }

            links.push({ href: "/profile", text: "Profile", icon: "fas fa-user-circle" });
            links.push({ href: "/", text: "Sign Out", icon: "fas fa-sign-in-alt",
                onClick: () => { this.props.handleLogout()} });
            links.push({ href: "#cart", text: "", icon: "fas fa-shopping-cart" });
        } else {
            links.push({ href: "/login", text: "Login", icon: "fas fa-user" });
            links.push({ href: "/register", text: "Register", icon: "fas fa-user-plus" });
            links.push({ href: "#cart", text: "", icon: "fas fa-shopping-cart" });
        }

        return (
            <div className="Header">
                <div className="Header-Left">
                    <Link to='/' className="Header-Item"><img src="./../espa_logo.png" alt="" className="Header-Logo"></img></Link>
                    <Link className="Header-Item" to='/phones'>
                            <i className="icon fas fa-mobile"></i>Phones
                    </Link>
                </div>

                <div className="Header-Right">
                    {links.map((link) => {
                        return (
                        <Link className="Header-Item" to={link.href} key={link.href} onClick={link.onClick}>
                            <i className={"icon " + link.icon}></i>{link.text}
                        </Link>)
                    })}
                </div>
            </div>
        )
    }
}