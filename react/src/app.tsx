import React, {Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/App.scss';
import "./assets/fonts/fontawesome/css/all.min.css"
import 'alertifyjs/build/css/alertify.css'
import history from "./instants/history";
import {unstable_HistoryRouter as HistoryRouter, Route, Routes} from 'react-router-dom';

import Loading from "./components/Loading";

import routes from "./routes";
import PageRoute from "./components/PageRoute";
import {TRoutes} from "./types/TRoutes";

const RouterBuilder = (routes: TRoutes[]) => {
    return <>
        {routes.map((route, idx) => {
            return (
                route.element && (
                    <Route
                        key={idx}
                        path={route.path}
                        element={
                            <PageRoute title={route.title}
                                       authentication={route.authentication}
                                       authorization={route.authorization}>
                                <route.element/>
                            </PageRoute>
                        }
                    >
                        {route.children && RouterBuilder(route.children)}
                    </Route>
                )
            )
        })}
    </>
};

function App() {
    return (
        <HistoryRouter history={history}>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    {RouterBuilder(routes)}
                </Routes>
            </Suspense>
        </HistoryRouter>
    );
}

export default App;
