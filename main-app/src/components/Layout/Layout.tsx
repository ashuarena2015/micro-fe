import React from 'react';
import { Outlet } from "react-router-dom";
import Navigation from './Navigation';
import './Layout.css'; // Assuming you have a CSS file for styling

const Layout = () => {

    return (
        <>
            <Navigation />
            <div className='container'>
                <Outlet />
            </div>
        </>
    )

}

export default Layout;