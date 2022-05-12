import React from "react";


type RoutesType = {
    path: string,
    element: React.FC,
    title: string,
    authority?: string
}

//user
const UserIndex = React.lazy(() => import('./pages/users/Index'))
const UserCreate = React.lazy(() => import('./pages/users/Create'))
const UserEdit = React.lazy(() => import('./pages/users/Edit'))
const UserShow = React.lazy(() => import('./pages/users/Show'))

//menu
const MenuIndex = React.lazy(() => import('./pages/menu/Index'))
const MenuCreate = React.lazy(() => import('./pages/menu/Create'))
const MenuUpdate = React.lazy(() => import('./pages/menu/Edit'))

const Page403 = React.lazy(() => import('./pages/403/Index'))
const Page404 = React.lazy(() => import('./pages/404/Index'))
const Home = React.lazy(() => import('./pages/home/Index'))


const routes: RoutesType[] = [

    {path: 'user', element: UserIndex, title: 'User', authority: 'USER'},
    {path: 'user/create', element: UserCreate, title: 'Create User', authority: 'USER'},
    {path: 'user/edit/:id', element: UserEdit, title: 'Edit User', authority: 'USER'},
    {path: 'user/show/:id', element: UserShow, title: 'Show User', authority: 'USER'},

    {path: 'menu', element: MenuIndex, title: 'Menu', authority: 'MENU'},
    {path: 'menu/create', element: MenuCreate, title: 'Create menu', authority: 'MENU'},
    {path: 'menu/edit/:id', element: MenuUpdate, title: 'Update menu', authority: 'MENU'},

    {path: '403', element: Page403, title: 'Access denied'},
    {path: '/home', element: Home, title: 'Home'},
    {path: '/', element: Home, title: 'Home'},
    {path: '*', element: Page404, title: 'Page not found'}
];

export default routes
