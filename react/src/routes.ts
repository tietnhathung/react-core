import React from "react";


type RoutesType = {
    path: string,
    element:React.FC
}

//user
const UserIndex = React.lazy(() => import('./pages/users/Index'))
const UserCreate = React.lazy(() => import('./pages/users/Create'))
const UserEdit = React.lazy(() => import('./pages/users/Edit'))



const Page404 = React.lazy(() => import('./pages/404/Index'))


const routes:RoutesType[] = [
    { path: '/user', element: UserIndex },
    { path: '/user/create', element: UserCreate },
    { path: '/user/edit/:id', element: UserEdit },
    { path: '*', element: Page404 }
];

export default routes
