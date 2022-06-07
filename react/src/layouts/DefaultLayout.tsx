import React from 'react';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
    return (
        <>
            <Sidebar/>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Header/>
                <div className="body flex-grow-1 px-3">
                    <Outlet />
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default DefaultLayout;
