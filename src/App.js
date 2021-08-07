import './components/home/App.css';

import About from "./components/about/about";
import Login from "./components/login/Login";
import EmptyComponent from "./components/emptyComponent/EmptyComponent2";
import Signin from "./components/signin/signin";
import Home from "./components/home/Home";

import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
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
                                <Route path="/login" component={Login}/>}
                                <Route path="/products" component={EmptyComponent}/>}
                                <Route path="/services" component={EmptyComponent}/>}
                                <Route path="/cart" component={EmptyComponent}/>}
                                <Route path="/signin" component={Signin}/>}
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
