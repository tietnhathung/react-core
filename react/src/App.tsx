import React, {Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/App.scss';
import "./assets/fonts/fontawesome/css/all.min.css"
import 'alertifyjs/build/css/alertify.css'
import history from "./instants/history";
import { unstable_HistoryRouter as HistoryRouter, Route, Routes} from 'react-router-dom';

import Loading from "./components/Loading";
import AuthRoute from './components/AuthRoute';

const Login = React.lazy(() => import('./pages/core/Login/Index'))
const Callback = React.lazy(() => import('./pages/core/Login/Callback'))
const DefaultLayout = React.lazy(() => import('./layouts/DefaultLayout'))
function App() {
    return (
        <HistoryRouter history={history}>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path="/login" element={
                        <AuthRoute auth={false}>
                            <Login/>
                        </AuthRoute>
                    }/>
                    <Route path="/callback" element={
                        <AuthRoute auth={false}>
                            <Callback />
                        </AuthRoute>
                    }/>
                    <Route path="/*" element={
                        <AuthRoute auth={true}>
                            <DefaultLayout/>
                        </AuthRoute>
                    }/>
                </Routes>
            </Suspense>
        </HistoryRouter>
    );
}

export default App;
