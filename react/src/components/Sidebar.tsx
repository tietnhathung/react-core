import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import logo from "../assets/img/logo/logo-amitech.png";
import {useAppSelector, useAppDispatch} from '../hooks';
import {RootState} from '../store';
import {toggleUnfoldableSidebar} from "../store/app/appSlice"
import {IMenu} from "../types/entities/IMenu";
import {getMenusOfUser} from "../services/menuServices";
import MenuBuilder from "./MenuBuilder";

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch()
    const hideSidebar = useAppSelector((state: RootState) => state.app.hideSidebar)
    const unfoldableSidebar = useAppSelector((state: RootState) => state.app.unfoldableSidebar)

    const [menus, setMenus] = useState<IMenu[]>([]);

    useEffect(function () {
        getMenusOfUser().then(response => {
            let {status, data} = response;
            if (status && data) {
                setMenus(data);
            }
        });
    }, [])

    const handlerSidebarClick = () => {
        dispatch(toggleUnfoldableSidebar())
    }

    return (
        <div id="sidebar"
             className={"sidebar sidebar-dark sidebar-fixed" + (hideSidebar ? " hide" : "") + (unfoldableSidebar ? " sidebar-narrow-unfoldable" : "")}>
            <div className="sidebar-brand d-none d-md-flex">
                <div className="sidebar-brand-full">
                    <Link className="nav-link" to="/">
                        <img src={logo} alt="amitech"/>
                    </Link>
                </div>
            </div>
            <ul className="sidebar-nav" data-coreui="navigation" data-simplebar="">
                {<MenuBuilder menus={menus}/>}
            </ul>
            <button className="sidebar-toggler" type="button" onClick={handlerSidebarClick}></button>
        </div>
    );
};

export default Sidebar;
