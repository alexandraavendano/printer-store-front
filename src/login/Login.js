import '../home/App.css'
import Header from '../common/Header'
import Footer from '../common/Footer';
import './Login.css';
import '../style.scss'

function Login () {
    return (
        <div>
            <Header />
            <div className={"content-container"}>
                <div className="container logInContainer">
                    <h3>Log In</h3>
                    <div className="container bg-light border">
                        <form action="./login" method="POST">
                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="inputEmail"
                                       aria-describedby="emailHelp" name="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword" name="password"/>
                            </div>
                            <button type="submit" className="btn btn-secondary ">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
