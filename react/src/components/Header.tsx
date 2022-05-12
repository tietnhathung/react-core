import React from 'react';
import avatar from '../assets/img/avatars/8.jpg';
import logo from "../assets/img/logo/logo-amitech.png";
import FaIcon from "./FaIcon";
import {Link, useNavigate} from "react-router-dom";
import {toggleHideSidebar} from "../store/app/appSlice"
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {NavDropdown} from 'react-bootstrap';
import alertify from "../instants/alertify";
import {authUser, logout} from '../store/auth/authSlice';
import history from "../instants/history";

const Header = () => {
    const dispatch = useAppDispatch()
    const auth = useAppSelector(authUser)
    let navigate = useNavigate();
    const handlerHideSidebarClick = () => {
        dispatch(toggleHideSidebar())
    }

    const handlerLogout = async () => {
        alertify.confirm("Are you sure you want to sign out?", async function () {
            dispatch(logout())
            history.push("/login");
        });
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
                        <Link className="nav-link" to="/menu">Menus</Link>
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
                    <li className="nav-item">
                        <NavDropdown
                            id="setting-dropdown"
                            className="pt-0"
                            title={<div className="avatar avatar-md">
                                <img className="avatar-img" src={avatar} alt={auth?.fullName} />
                            </div>}
                            menuVariant="light"
                        >
                            <NavDropdown.Item onClick={()=>{navigate("/profile")}}>
                                <i className="far fa-user"></i> Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={handlerLogout}>
                                <i className="far fa-sign-out"></i> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
