import './components/home/App.css';

import About from "./components/about/about";
import Login from "./components/login/Login";
import EmptyComponent from "./components/emptyComponent/EmptyComponent2";
import Signup from "./components/signup/signup";
import Home from "./components/home/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import './style.scss'
import {Redirect} from "react-router";
import React, {useState} from "react";
import Orders from "./components/orders/Orders";
import jwt_decode from 'jwt-decode';
import NotFound from "./components/common/NotFound";
import EmployeeDashboard from "./components/admin/createEmployee/employeeDashboard";

function getRole() {
    try {
        const token = localStorage.getItem("token");
        return jwt_decode(token).role;
    } catch (e) {
        return null;
    }
}

function LogOut(props) {
    localStorage.removeItem("token")
    props.setToken(null)
    return <Redirect to={"/"}/>;
}

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    let role = getRole();

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header role={role} setToken={token}/>
                    <div className="content-container">
                        <div className="container">
                            <Switch>
                                <Route exact path={"/"} component={Home}/>
                                <Route path="/about" component={About}/>
                                <Route path="/login">
                                    {token ? <Redirect to="/orders"/> : <Login setToken={setToken}/>}
                                </Route>
                                <Route path="/products" component={EmptyComponent}/>
                                <Route path="/services" component={EmptyComponent}/>
                                <Route path="/cart" component={EmptyComponent}/>
                                <Route path="/signup" component={Signup}/>
                                <Route path="/orders">
                                    {token ? <Orders/> : <Redirect to="/login"/>}
                                </Route>
                                <Route path="/employees">
                                    {role === "ROLE_ADMIN" ? <EmployeeDashboard/> : <Redirect to="/login"/>}
                                </Route>
                                <Route path="/logout">
                                    <LogOut setToken={setToken}/>
                                </Route>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
