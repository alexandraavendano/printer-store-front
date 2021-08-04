import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import './index.css';
import './style.scss';
import App from './home/App';
import Login from "./login/Login";
import About from "./about/about";
import EmptyComponent from "./emptyComponent/EmptyComponent2";
import Signin from "./signin/signin";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} component={App}/>
                <Route path="/about" component={About}/>
                <Route path="/login" component={Login}/>}
                <Route path="/products" component={EmptyComponent}/>}
                <Route path="/services" component={EmptyComponent}/>}
                <Route path="/cart" component={EmptyComponent}/>}
                <Route path="/signin" component={Signin}/>}
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
