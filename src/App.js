import './components/home/App.css';

import About from "./components/about/about";
import Login from "./components/login/login";
import EmptyComponent from "./components/emptyComponent/emptyComponent";
import Signup from "./components/signup/signup";
import Home from "./components/home/home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import './style.scss'
import {Redirect} from "react-router";
import React, {useState} from "react";
import Orders from "./components/orders/orders";
import jwt_decode from 'jwt-decode';
import NotFound from "./components/common/notFound";
import EmployeeDashboard from "./components/admin/createEmployee/employeeDashboard";
import ShowProducts from "./components/products/showProducts";
import ProductDetails from "./components/products/productDetails";

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
    const [redirectToCart, setRedirectToCart] = useState(false);
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
                                <Route exact path="/products">
                                    <ShowProducts category='Customizable'/>
                                </Route>
                                <Route path="/products/:id">
                                    {redirectToCart ? <Redirect to="/cart"/> : <ProductDetails setRedirectToCart={setRedirectToCart}/>}
                                </Route>
                                <Route path="/services">
                                    <ShowProducts category='Service'/>
                                </Route>
                                <Route path="/cart" component={EmptyComponent}/>
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
