import './components/home/App.css';

import About from "./components/about/about";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Home from "./components/home/home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import {Redirect} from "react-router";
import React, {useState} from "react";
import Orders from "./components/ordersByUser/orders";
import NotFound from "./components/common/notFound";
import EmployeeDashboard from "./components/admin/employeeDashboard/employeeDashboard";
import ShowProducts from "./components/products/showProducts";
import ProductDetails from "./components/products/productDetails";
import {Cart} from "./components/cart/cart";
import {Payment} from "./components/payment/payment";
import {AddressForm} from "./components/address/addressForm";
import {getRole} from "./components/helpers/dtos";
import ProductDashboard from "./components/admin/productDashboard/productDashboard";
import {ProductCreateAndEdit} from "./components/admin/productCreation/productCreateAndEdit";
import "./components/common/common.css";
import './style.scss'
import {OrderDashBoard} from "./components/admin/ordersDashBoard/OrderDashBoard";

function LogOut(props) {
    localStorage.removeItem("token")
    props.setToken(null)
    return <Redirect to={"/"}/>;
}

function redirectHome(){
    const role = getRole();
    if(role === "ROLE_ADMIN") {
        return <Redirect to="/employees"/>
    } else if(role === "ROLE_CLIENT") {
        if(localStorage.getItem("cart") != null){
            return <Redirect to="/cart"/>
        } else {
            return <Redirect to="/myOrders"/>
        }
    } else {
        return <Redirect to="/orders"/>
    }
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
                                <Route exact path={"/"} >
                                    <Home setRedirectToCart={setRedirectToCart}/>
                                </Route>
                                <Route path="/about" component={About}/>
                                <Route path="/login">
                                    {token ? redirectHome() : <Login setToken={setToken}/>}
                                </Route>
                                <Route exact path="/products">
                                    <ShowProducts category='Customizable'/>
                                </Route>
                                <Route path="/products/:id">
                                    {redirectToCart
                                        ? <Redirect to="/cart"/>
                                        : <ProductDetails setRedirectToCart={setRedirectToCart}/>}
                                </Route>
                                <Route path="/services">
                                    <ShowProducts category='Service'/>
                                </Route>
                                <Route path="/cart" component={Cart}/>
                                <Route path="/signup" component={Signup}/>
                                <Route path="/payment">
                                    {role === "ROLE_CLIENT" ? <Payment/> : <Redirect to="/login"/>}
                                </Route>
                                <Route path="/delivery">
                                    {role === "ROLE_CLIENT" ? <AddressForm/> : <Redirect to="/login"/>}
                                </Route>
                                <Route path="/myOrders">
                                    {role === "ROLE_CLIENT" ? <Orders/> : <Redirect to="/login"/>}
                                </Route>
                                <Route path="/employees">
                                    {role === "ROLE_ADMIN" ? <EmployeeDashboard/> : <Redirect to="/login"/>}
                                </Route>
                                <Route exact path="/admin/products">
                                    {role === "ROLE_ADMIN" ? <ProductDashboard/> : <Redirect to="/login"/>}
                                </Route>
                                <Route path="/admin/products/:id">
                                    {role === "ROLE_ADMIN" ? <ProductCreateAndEdit/>: <Redirect to="/login"/>}
                                </Route>
                                <Route exact path="/admin/products/create">
                                    {role === "ROLE_ADMIN" ? <ProductCreateAndEdit/>: <Redirect to="/login"/>}
                                </Route>
                                <Route exact path="/orders">
                                    {role === "ROLE_ADMIN" || role === "ROLE_EMPLOYEE" ? <OrderDashBoard/>: <Redirect to="/login"/>}
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
