import React from 'react';
import {IMenu} from "../types/entities/IMenu";
import {Link} from "react-router-dom";
import FaIcon from "./FaIcon";

const MenuBuilder = (props: { menus: IMenu[] }) => {
    return (
        <>
            {props.menus.map((menu) => {
                if (menu.children && menu.children.length > 0) {
                    return (<li className="nav-group" key={menu.id}>
                        <a className="nav-link nav-group-toggle">
                            <FaIcon className="nav-icon" icon={menu.icon}/>{menu.title}
                        </a>
                        <ul className="nav-group-items">
                            {<MenuBuilder menus={menu.children}/>}
                        </ul>
                    </li>)
                } else {
                    return (<li className="nav-item" key={menu.id}>
                        <Link className="nav-link" to={menu.url} target={menu.target}>
                            <FaIcon className="nav-icon" icon={menu.icon}/>{menu.title}
                        </Link>
                    </li>)
                }
            })}
        </>
    );
};

export default MenuBuilder;
