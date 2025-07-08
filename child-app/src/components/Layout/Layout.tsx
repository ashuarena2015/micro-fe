import React from 'react';
import { Outlet } from "react-router-dom";
// import Navigation from './Navigation';
import './Layout.css'; // Assuming you have a CSS file for styling

const Layout = () => {

    return (
        <div className='child-container'>
            {/* <Navigation /> */}
            <Outlet />
        </div>
    )

}

export default Layout;