import './Header.css';
import { BsPersonFill } from 'react-icons/bs'
import { FaCartPlus } from 'react-icons/fa'

function Header(){
    return (
        <div className="Header">
            <nav>
                <ul className="menu">
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li><BsPersonFill size={20}/></li>
                    <li><FaCartPlus size={20} /></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;