import React from "react";
import NavigationBar from "../navigationBar";

const MainLayout = ({ children }) => {
    return (
        <div>
            <NavigationBar /> {/* Navbar is always present */}
            <main>{children}</main> {/* Dynamic content */}
        </div>
    );
};

export default MainLayout;
