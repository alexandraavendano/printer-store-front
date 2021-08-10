import './components/home/App.css';

import About from "./components/about/about";
import Login from "./components/login/Login";
import EmptyComponent from "./components/emptyComponent/EmptyComponent2";
import Signin from "./components/signin/signin";
import Home from "./components/home/Home";

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import './style.scss'
import Orders from "./components/orders/Orders";
import {Redirect} from "react-router";
import React, {useState} from "react";
import useToken from "./components/login/useToken";


function App() {
    const {token, setToken} = useToken();

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header/>
                    <div className="content-container">
                        <div className="container">
                            <Switch>
                                <Route exact path={"/"} component={Home}/>
                                <Route path="/about" component={About}/>
                                <Route path="/login">
                                    {token ? <Redirect to="/orders" /> : <Login/>}
                                </Route>
                                <Route path="/products" component={EmptyComponent}/>
                                <Route path="/services" component={EmptyComponent}/>
                                <Route path="/cart" component={EmptyComponent}/>
                                <Route path="/signin">
                                    {token ? <Redirect to="/orders" /> : <Signin setToken={setToken}/>}
                                </Route>
                                <PrivateRoute path="/orders" component={Orders}/>
                            </Switch>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        </div>
    );
}

function PrivateRoute({ children, ...rest }) {
    const auth = useAuth()
    return (
        <Route {...rest} render={({ location }) =>
            auth.user ? (children) :
                (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
        }
        />
    )
}


export default App;
