import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router";
import './Admin.scss'
import { isAuthorized } from '../../Services/userService';
import UsersList from '../../Components/UsersList/UsersList';
import PhonesList from '../../Components/PhonesList/PhonesList';

export default function Admin(props) {
    const history = useHistory();

    useEffect(() => {
        if (!isAuthorized('admin')) {
            history.push('/')
        }
    })

    return (
        <div className="Admin-container">
            <BrowserRouter>
                <div className="nav">
                    <Link to='/admin/users'>
                        <i className="icon fas fa-mobile"></i>User
                    </Link>

                    <Link to='/admin/phones'>
                        <i className="icon fas fa-mobile"></i>Phones
                    </Link>
                </div>

                <Switch>
                    <Route path="/admin/users">
                        <UsersList />
                    </Route>
                    <Route path="/admin/phones">
                        <PhonesList />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}