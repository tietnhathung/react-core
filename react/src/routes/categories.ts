import React from "react";
import {TRoutes} from "../types/TRoutes";

//user
const UserIndex = React.lazy(() => import('../pages/categories/users/Index'));
const UserCreate = React.lazy(() => import('../pages/categories/users/Create'));
const UserEdit = React.lazy(() => import('../pages/categories/users/Edit'));
const UserShow = React.lazy(() => import('../pages/categories/users/Show'));

//Rule
const RuleIndex = React.lazy(() => import('../pages/categories/rule/Index'));
const RuleCreate = React.lazy(() => import('../pages/categories/rule/Create'));
const RuleEdit = React.lazy(() => import('../pages/categories/rule/Edit'));
const RuleShow = React.lazy(() => import('../pages/categories/rule/Show'));

//menu
const MenuIndex = React.lazy(() => import('../pages/categories/menu/Index'));
const MenuCreate = React.lazy(() => import('../pages/categories/menu/Create'));
const MenuUpdate = React.lazy(() => import('../pages/categories/menu/Edit'));
const MenuShow = React.lazy(() => import('../pages/categories/menu/Show'));

const categoryRoutes: TRoutes[] = [
    //user
    {path: 'user', element: UserIndex, title: 'User', authorization: 'USER'},
    {path: 'user/create', element: UserCreate, title: 'Create User', authorization: 'USER'},
    {path: 'user/edit/:id', element: UserEdit, title: 'Edit User', authorization: 'USER'},
    {path: 'user/show/:id', element: UserShow, title: 'Show User', authorization: 'USER'},

    //rule
    {path: 'rule', element: RuleIndex, title: 'Rule', authorization: 'RULE'},
    {path: 'rule/create', element: RuleCreate, title: 'Create Rule', authorization: 'RULE'},
    {path: 'rule/edit/:id', element: RuleEdit, title: 'Update Rule', authorization: 'RULE'},
    {path: 'rule/show/:id', element: RuleShow, title: 'Show Rule', authorization: 'RULE'},

    //menu
    {path: 'menu', element: MenuIndex, title: 'Menu', authorization: 'MENU'},
    {path: 'menu/create', element: MenuCreate, title: 'Create menu', authorization: 'MENU'},
    {path: 'menu/edit/:id', element: MenuUpdate, title: 'Update menu', authorization: 'MENU'},
    {path: 'menu/show/:id', element: MenuShow, title: 'Show menu', authorization: 'MENU'},
];

export default categoryRoutes
