import React from 'react';
import { Link } from 'react-router-dom';
import FaIcon from "./FaIcon";
import logo from "../assets/img/logo/logo-amitech.png";
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { RootState } from '../store';
import {toggleUnfoldableSidebar} from "../store/app/appSlice"

const Sidebar: React.FC = () => {
    const hideSidebar = useAppSelector((state: RootState) => state.app.hideSidebar)
    const unfoldableSidebar = useAppSelector((state: RootState) => state.app.unfoldableSidebar)
    const dispatch = useAppDispatch()

    const handlerSidebarClick = () => {
        dispatch(toggleUnfoldableSidebar())
    }

    return (
        <div id="sidebar" className={"sidebar sidebar-dark sidebar-fixed"+(hideSidebar?" hide":"")+(unfoldableSidebar?" sidebar-narrow-unfoldable":"") } >
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
            <button className="sidebar-toggler" type="button" onClick={handlerSidebarClick}></button>
        </div>
    );
};

export default Sidebar;
