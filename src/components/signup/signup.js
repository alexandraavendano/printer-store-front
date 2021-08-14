import React from "react";
import {Link} from "react-router-dom";
import {Alert} from "bootstrap";
import CustomAlert from "../common/customAlert";

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            client: {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
            },
            isSuccess: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let response = fetch('http://localhost:8080/users/signup', {
            method: 'POST',
            body: JSON.stringify(this.state.client),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => {
                if (res.status !== 200) return Promise.reject(new Error("Authentication error"));
                return res.json()
            })
            .then(
                (result) => this.setState({"isSuccess": true}),
                (error) => {
                    this.setState({"isSuccess": false})
                    console.log("This is an error");
                }
            )
        event.preventDefault()
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({
            client: {
                ...prevState.client,
                [name]: value
            }
        }))

        event.preventDefault();
    }

    render() {
        if (this.state.isSuccess) {
            return (
               <CustomAlert error={!this.state.isSuccess}/>
            )
        } else {
            return (
                <div className="container logInContainer">
                    <h3>Sign Up</h3>
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
                                <label htmlFor="inputFirstName" className="form-label">First Name</label>
                                <input type="text"
                                       className="form-control"
                                       id="inputFirstName"
                                       name="firstName"
                                       value={this.state.firstName}
                                       onChange={this.handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputLastName" className="form-label">Last Name</label>
                                <input type="text"
                                       className="form-control"
                                       id="inputLastName"
                                       name="lastName"
                                       value={this.state.lastName}
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
            )
        }
    };
}

export default Signup;
