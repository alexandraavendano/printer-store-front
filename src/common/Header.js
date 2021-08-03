import './Header.css';
import { BsPersonFill } from 'react-icons/bs'
import { FaCartPlus } from 'react-icons/fa'
import React from "react";
import {Link} from "react-router-dom";

function Header(){
    return (
        <div className="Header">
            <nav>
                <ul className="menu">
                    <li className="logo"><strong>BILLBOARD</strong></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/products">Product</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li className="icon"><Link to="/login"><BsPersonFill size={20}/></Link></li>
                    <li className="icon"><Link to="/cart"><FaCartPlus size={20} /></Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;