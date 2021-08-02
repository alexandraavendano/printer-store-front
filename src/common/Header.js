import './Header.css';
import { BsPersonFill } from 'react-icons/bs'
import { FaCartPlus } from 'react-icons/fa'

function Header(){
    return (
        <div className="Header">
            <nav>
                <ul className="menu">
                    <li className="logo"><strong>BILLBOARD</strong></li>
                    <li>Home</li>
                    <li>About</li>
                    <li>Product</li>
                    <li>Services</li>
                    <li className="icon"><BsPersonFill size={20}/></li>
                    <li className="icon"><FaCartPlus size={20} /></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;