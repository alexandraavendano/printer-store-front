import {FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram} from "react-icons/all";
import './footer.css'
import {Link} from "react-router-dom";

function Footer(){
    return(
        <div className='Footer' >
            <div className='column-menu'>
                <div className="row-item limit-flex-m">
                    <h5>About Us</h5>
                    <span className="paragraph">At Billboard, our goal is to earn your business and become your single source for all your printing needs by providing you the highest quality offset.</span>
                    <div className="column-menu left">
                        <div className="row-item"><FiFacebook size={20}/></div>
                        <div className="row-item"><FiTwitter size={20}/></div>
                        <div className="row-item"><FiInstagram size={20}/></div>
                    </div>
                </div>
                <div className="row-item">
                    <h5>Useful Links</h5>
                    <ul>
                        <li><Link to="/login">Log In</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/products">Products</Link></li>
                    </ul>
                </div>
                <div className="row-item">
                    <h5>Get In Touch</h5>
                    <div className="icon-text">
                        <FiMapPin size={20}/>
                        <p>123th Street City, State, Country </p>
                    </div>
                    <div className="icon-text">
                        <FiPhone size={20}/>
                        <p>(123) 456 789 - (123) 789 1234 </p>
                    </div>
                    <div className="icon-text">
                        <FiMail size={20}/>
                        <p>someemail@billboard.com</p>
                    </div>
                </div>
            </div>

            <div>
                <hr/>
                <p>@2021 Billboard Company</p>
                <p>All Rights Reserved</p>
            </div>
        </div>
    );
}

export default Footer;