import Header from '../common/Header'
import Footer from '../common/Footer';
import './Login.css';
import React from "react";
import {Link} from "react-router-dom";

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            email : '',
            password : '',
            error: null,
            isLoaded: false,
            clients: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const id = this.state.email;
        const fetchPromise = fetch("http://localhost:8080/users?id=" + id);
        fetchPromise
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        clients: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        event.preventDefault();
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState(
            {[name] : value,}
        )
    }

    render() {
            return (
                <div>
                    <Header/>
                    <div className={"content-container"}>
                        <div className="container logInContainer">
                            <h3>Log In</h3>
                            <div className="container bg-light border">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="inputEmail" className="form-label">Email address</label>
                                        <input type="email"
                                               className="form-control"
                                               id="inputEmail"
                                               aria-describedby="emailHelp"
                                               name="email"
                                               value={this.state.email}
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputPassword" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="inputPassword"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-secondary ">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div><Link to="/signin">Create and account</Link></div>
                        <span>Welcome: ${this.state.clients.email}</span>
                    </div>
                    <Footer/>
                </div>
    )
    };

}

export default Login;
