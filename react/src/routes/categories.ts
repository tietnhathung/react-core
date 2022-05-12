import {RoutesType} from "./index";
import React from "react";

//user
const UserIndex = React.lazy(() => import('../pages/categories/users/Index'))
const UserCreate = React.lazy(() => import('../pages/categories/users/Create'))
const UserEdit = React.lazy(() => import('../pages/categories/users/Edit'))
const UserShow = React.lazy(() => import('../pages/categories/users/Show'))

//menu
const MenuIndex = React.lazy(() => import('../pages/categories/menu/Index'))
const MenuCreate = React.lazy(() => import('../pages/categories/menu/Create'))
const MenuUpdate = React.lazy(() => import('../pages/categories/menu/Edit'))
const MenuShow = React.lazy(() => import('../pages/categories/menu/Show'))

const categoryRoutes: RoutesType[] = [
    //user
    {path: 'user', element: UserIndex, title: 'User', authority: 'USER'},
    {path: 'user/create', element: UserCreate, title: 'Create User', authority: 'USER'},
    {path: 'user/edit/:id', element: UserEdit, title: 'Edit User', authority: 'USER'},
    {path: 'user/show/:id', element: UserShow, title: 'Show User', authority: 'USER'},

    //menu
    {path: 'menu', element: MenuIndex, title: 'Menu', authority: 'MENU'},
    {path: 'menu/create', element: MenuCreate, title: 'Create menu', authority: 'MENU'},
    {path: 'menu/edit/:id', element: MenuUpdate, title: 'Update menu', authority: 'MENU'},
    {path: 'menu/show/:id', element: MenuShow, title: 'Show menu', authority: 'MENU'},
];

export default categoryRoutes