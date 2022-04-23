import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/App.scss';
import "./assets/fonts/fontawesome/css/all.min.css"

import {HashRouter, Route, Routes } from 'react-router-dom';

import Loading from "./components/Loading";
const Login = React.lazy(() => import('./pages/Login'))
const DefaultLayout = React.lazy(() => import('./layouts/DefaultLayout'))

function App() {
  return (
      <HashRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
  );
}

export default App;
