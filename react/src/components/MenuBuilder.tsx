import React from 'react';
import {IMenu} from "../types/entities/IMenu";
import {NavLink} from "react-router-dom";
import FaIcon from "./FaIcon";

const MenuBuilder = (props: { menus: IMenu[] }) => {
    return (
        <>
            {props.menus.map((menu) => {
                if (menu.children && menu.children.length > 0) {
                    return <React.Fragment key={menu.id}>
                        <li className="nav-title">{menu.title}</li>
                        {<MenuBuilder menus={menu.children}/>}
                    </React.Fragment>
                } else {
                    return <li className="nav-item" key={menu.id}>
                        <NavLink className="nav-link" to={menu.url} target={menu.target}>
                            <FaIcon className="nav-icon" icon={menu.icon}/>{menu.title}
                        </NavLink>
                    </li>
                }
            })}
        </>
    );
};

export default MenuBuilder;
