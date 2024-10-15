import React from "react";
import { Outlet } from "react-router-dom";
import App from '../../App';

const BlankLayout = () => {
    return (
        <App>
            <div className="text-black dark:text-white-dark min-h-screen">
                <Outlet />
            </div>
        </App>
    );
};

export default BlankLayout;
