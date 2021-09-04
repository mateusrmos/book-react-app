import React from "react";
import classNames from "classnames";
export const NavItem = ({ href, isActive, children }) => {
    const navItemStyles = classNames(`block px-4 py-2 rounded-md`, {
        [`bg-amber-100 text-amber-700`]: isActive,
    });
    return (
        <li>
            <a href={href} className={navItemStyles}>
                {children}
            </a>
        </li>
    );
};
