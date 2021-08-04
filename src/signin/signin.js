import Header from '../common/Header'
import Footer from '../common/Footer';
import React from "react";

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : '',
            firstName: '',
            lastName: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        fetch('http://localhost:8080/users/', { method: 'POST', body: JSON.stringify(this.state), headers: {'Content-Type': 'application/json'}})
            .then(res =>  res.json().then( myJson => console.log(myJson)))
        event.preventDefault()
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState(
            {[name] : value}
        )
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={"content-container"}>
                    <div className="container logInContainer">
                        <h3>Sign In</h3>
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
                </div>
                <Footer/>
            </div>
        )
    };

}

export default Signin;
