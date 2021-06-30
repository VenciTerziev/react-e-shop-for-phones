import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../../Pages/Home";
import Phones from "../../Pages/Phones/Phones";
import Reviews from "../../Pages/Reviews/Reviews";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Admin from "../../Pages/Admin/Admin";
import { clearAuth, getUserId } from '../../Services/userService';
import './Layout.scss'

// export default class Layout extends Component {
export default function Layout() {
    // const logged = this.props.loggedIn;
    const [logged, handleLogin] = useState(!!getUserId());

    function handleLogout() {
        clearAuth();
        handleLogin(false);
    }

    return (
        <div id="mainWrapper">
            <BrowserRouter>
                <Header loggedIn={logged} handleLogout={handleLogout}></Header>

                <div className="content-container">
                    <Switch>
                        <Route path="/login">
                            <Login onLogin={ () => handleLogin(true) } />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/phones">
                            <Phones />
                        </Route>
                        <Route path="/reviews">
                            <Reviews />
                        </Route>
                        <Route path="/Admin">
                            <Admin />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>

                {/* <Footer></Footer> */}
            </BrowserRouter>
        </div>
    );
}
// };