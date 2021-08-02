import {FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram} from "react-icons/all";
import './Footer.css'
function Footer(){
    return(
        <div className='Footer'>
            <FiMapPin size={30}/>
            <FiPhone size={30}/>
            <FiMail size={30}/>
            <hr></hr>
            <FiFacebook size={30}/>
            <FiTwitter size={30}/>
            <FiInstagram size={30}/>
        </div>
    );
}

export default Footer;