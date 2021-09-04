import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../dashboard/components/Header";

const AppBase = ({ children }) => {
    const { pathname } = useLocation();
    return (
        <>
            <Header currentRoute={pathname} />
            <div className="relative min-h-screen">{children}</div>
        </>
    );
};

export default AppBase;
