import React from "react";
import Nav from "../Nav";
import NavItem from "../NavItem";
import { ROOT, AUTHORS, BOOKS } from "../../../../routesMap";
export const Header = ({ currentRoute }) => {
    return (
        <Nav>
            <NavItem href={ROOT} isActive={currentRoute === ROOT}>
                Home
            </NavItem>
            <NavItem href={AUTHORS} isActive={currentRoute === AUTHORS}>
                Authors
            </NavItem>
            <NavItem href={BOOKS} isActive={currentRoute === BOOKS}>
                Books
            </NavItem>
        </Nav>
    );
};
