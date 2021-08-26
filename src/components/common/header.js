import './header.css';
import {BsPersonFill} from 'react-icons/bs'
import {FaCartPlus} from 'react-icons/fa'
import React from "react";
import {Link} from "react-router-dom";
import {RiLogoutCircleRLine} from "react-icons/all";

//TODO: BasicHeader and UserHeader are similar. Try to abstract common links.
function BasicHeader() {
    return (
        <div>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li className="icon"><Link to="/login"><BsPersonFill size={20}/></Link></li>
            <li className="icon"><Link to="/cart"><FaCartPlus size={20}/></Link></li>
        </div>
    );
}

function ClientHeader() {
    return (
        <div>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/myOrders">Orders</Link></li>
            <li className="icon"><Link to="/logout"><RiLogoutCircleRLine size={20}/></Link></li>
            <li className="icon"><Link to="/cart"><FaCartPlus size={20}/></Link></li>
        </div>
    );
}

function AdminHeader() {
    return (
        <div>
            <li><Link to="/admin/home">Orders</Link></li>
            <li><Link to="/products">Client view</Link></li>
            <li><Link to="/admin/products">Products</Link></li>
            <li><Link to="/employees">Employees</Link></li>
            <li className="icon"><Link to="/logout"><RiLogoutCircleRLine size={20}/></Link></li>
        </div>
    );
}

function EmployeeHeader() {
    return (
        <div>
            <li><Link to="/orders">Orders</Link></li>
            <li className="icon"><Link to="/logout"><RiLogoutCircleRLine size={20}/></Link></li>
        </div>
    );
}

function CustomHeader(props) {
    if (props.role == null) {
        return <BasicHeader/>
    } else if (props.role === "ROLE_ADMIN") {
        return <AdminHeader/>;
    } else if (props.role === "ROLE_CLIENT") {
        return <ClientHeader/>
    } else if (props.role === "ROLE_EMPLOYEE") {
        return <EmployeeHeader/>
    } else {
        return <BasicHeader/>
    }
}


function Header(props) {
    return (
        <div className="Header">
            <nav>
                <ul className="menu">
                    <li className="logo"><strong>BILLBOARD</strong></li>
                    <CustomHeader role={props.role}/>
                </ul>
            </nav>
        </div>
    );
}

export default Header;