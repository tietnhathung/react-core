import React, {Suspense} from 'react';
import Loading from "./Loading";
import {Route, Routes} from "react-router-dom";
import routes from "../routes";
import PageRoute from "./PageRoute";


const Content = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                {routes.map((route, idx) => {
                    return (
                        route.element && (
                            <Route
                                key={idx}
                                path={route.path}
                                element={<PageRoute title={route.title} authority={route.authority} children={<route.element/>}/>}
                            />
                        )
                    )
                })}
            </Routes>
        </Suspense>
    );
};

export default Content;
