import React from 'react';
import avatar from '../assets/img/avatars/8.jpg';
import logo from "../assets/img/logo/logo-amitech.png";
import FaIcon from "./FaIcon";
import {Link} from "react-router-dom";
import {toggleHideSidebar} from "../store/app/appSlice"
import {useAppDispatch} from '../hooks/hooks';

const Header = () => {
    const dispatch = useAppDispatch()

    const handlerHideSidebarClick = () => {
        dispatch(toggleHideSidebar())
    }

    return (
        <header className="header header-sticky mb-4">
            <div className="container-fluid">
                <button className="header-toggler px-md-0 me-md-3" type="button" onClick={handlerHideSidebarClick}>
                    <FaIcon icon="far fa-align-justify"/>
                </button>
                <Link className="header-brand d-md-none" to="/">
                    <img src={logo} alt="amitech"/>
                </Link>
                <ul className="header-nav d-none d-md-flex">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Dashboard </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/user">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/line">Lines</Link>
                    </li>
                </ul>
                <ul className="header-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/"> </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/user"></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/line"></Link>
                    </li>
                </ul>
                <ul className="header-nav ms-3">
                    <li className="nav-item dropdown">
                        <a href="/" className="nav-link py-0" data-coreui-toggle="dropdown" role="button"
                           aria-haspopup="true" aria-expanded="false">
                            <div className="avatar avatar-md">
                                <img className="avatar-img" src={avatar} alt="user@email.com"/>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end pt-0">
                            <div className="dropdown-header bg-light py-2">
                                <div className="fw-semibold">Account</div>
                            </div>

                            <a href="/" className="dropdown-item">
                                Updates<span className="badge badge-sm bg-info ms-2">42</span>
                            </a>
                            <a href="/" className="dropdown-item">
                                Messages<span className="badge badge-sm bg-success ms-2">42</span>
                            </a>
                            <a href="/" className="dropdown-item">
                                Tasks<span className="badge badge-sm bg-danger ms-2">42</span>
                            </a>
                            <a href="/" className="dropdown-item">
                                Comments<span className="badge badge-sm bg-warning ms-2">42</span>
                            </a>
                            <div className="dropdown-header bg-light py-2">
                                <div className="fw-semibold">Settings</div>
                            </div>
                            <a href="/" className="dropdown-item"> Profile</a>
                            <a href="/" className="dropdown-item"> Settings</a>
                            <a href="/" className="dropdown-item"> Payments<span
                                className="badge badge-sm bg-secondary ms-2">42</span></a>
                            <a href="/" className="dropdown-item"> Projects<span
                                className="badge badge-sm bg-primary ms-2">42</span></a>
                            <div className="dropdown-divider"></div>
                            <a href="/" className="dropdown-item"> Lock Account</a>
                            <a href="/" className="dropdown-item"> Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
