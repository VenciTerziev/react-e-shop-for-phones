import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router";
import './Admin.scss'
import { isAuthorized } from '../../Services/userService';
import UsersList from '../../Components/UsersList/UsersList';
import PhonesList from '../../Components/PhonesList/PhonesList';
import ReviewsList from '../../Components/ReviewsList/ReviewsList';

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
                        User
                    </Link>

                    <Link to='/admin/phones'>
                        Phones
                    </Link>

                    <Link to='/admin/reviews'>
                        Reviews
                    </Link>
                </div>

                <Switch>
                    <Route path="/admin/users">
                        <h3>Users List</h3>
                        <UsersList />
                    </Route>
                    <Route path="/admin/phones">
                        <h3>Phones List</h3>
                        <PhonesList />
                    </Route>
                    <Route path="/admin/reviews">
                        <h3>Reviews List</h3>
                        <ReviewsList />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}