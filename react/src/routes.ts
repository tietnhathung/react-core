import React from "react";


type RoutesType = {
    path: string,
    element: React.FC
}

//user
const UserIndex = React.lazy(() => import('./pages/users/Index'))
const UserCreate = React.lazy(() => import('./pages/users/Create'))
const UserEdit = React.lazy(() => import('./pages/users/Edit'))

//menu
const MenuIndex = React.lazy(() => import('./pages/menu/Index'))

const Page403 = React.lazy(() => import('./pages/403/Index'))
const Page404 = React.lazy(() => import('./pages/404/Index'))
const Home = React.lazy(() => import('./pages/home/Index'))


const routes: RoutesType[] = [

    {path: 'user', element: UserIndex},
    {path: 'user/create', element: UserCreate},
    {path: 'user/edit/:id', element: UserEdit},

    {path: 'menu', element: MenuIndex},

    {path: '403', element: Page403},
    {path: '/home', element: Home},
    {path: '/', element: Home},
    {path: '*', element: Page404}
];

export default routes
