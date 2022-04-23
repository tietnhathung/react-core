import React from 'react';
import { Link } from 'react-router-dom';
import FaIcon from "./FaIcon";
import logo from "../assets/img/logo/logo-amitech.png";

const Sidebar: React.FC = props => {
    return (
        <div className="sidebar sidebar-dark sidebar-fixed" id="sidebar">
            <div className="sidebar-brand d-none d-md-flex">
                <div className="sidebar-brand-full" >
                    <Link className="nav-link" to="/">
                        <img src={logo} alt="amitech" />
                    </Link>
                </div>
            </div>
            <ul className="sidebar-nav" data-coreui="navigation" data-simplebar="">
                <li className="nav-item">
                    <Link className="nav-link" to="/user">
                        <FaIcon className="nav-icon" icon="far fa-user" />User
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/line">
                        <FaIcon className="nav-icon" icon="fad fa-grip-lines" />Line
                    </Link>
                </li>
            </ul>
            <button className="sidebar-toggler" type="button"></button>
        </div>
    );
};

export default Sidebar;
