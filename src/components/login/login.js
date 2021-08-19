import './login.css';
import React from "react";
import {Link} from "react-router-dom";
import CustomAlert from "../common/customAlert";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isError: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    userName: this.state.email,
                    password: this.state.password
                }
            )
        }

        fetch("http://localhost:8080/login", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    localStorage.setItem("token", result.authorization);
                    this.props.setToken(localStorage.getItem("token"));
                },
                (error) => {
                    this.setState({isError: true});
                    console.log(error);
                }
            )
        event.preventDefault();
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(
            {[name]: value,}
        )
    }

    render() {
        return (
            <div>
                <div className="container logInContainer">
                    <h3>Log In</h3>
                    <CustomAlert
                        isError={this.state.isError}
                        errorMessage={"Invalid credentials."}
                    />
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
                    <div>
                        <Link to="/signup">Create Account</Link>
                    </div>
                </div>
            </div>
        )
    };
}

export default Login;
