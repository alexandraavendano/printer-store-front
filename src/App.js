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
import {Redirect} from "react-router";
import React, {useState} from "react";


function App() {
    const [token, setToken] = useState('');

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header/>
                    <h3>This is the token : {token}</h3>
                    <div className="content-container">
                        <div className="container">
                            <Switch>
                                <Route exact path={"/"} component={Home}/>
                                <Route path="/about" component={About}/>
                                <Route path="/login">
                                    {token ? <Redirect to="/orders" /> : <Login setToken={setToken}/>}
                                </Route>
                                <Route path="/products" component={EmptyComponent}/>
                                <Route path="/services" component={EmptyComponent}/>
                                <Route path="/cart" component={EmptyComponent}/>
                                <Route path="/signin">
                                    {token ? <Redirect to="/orders" /> : <Signin setToken={setToken}/>}
                                </Route>
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
