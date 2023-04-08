import { FC } from 'react';
import { Link } from "react-router-dom";
import { NavbarContainer, NavTitle, NavLinks, NavLink } from "./NavbarStyles";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const GlobalNavbar: FC = () => {
    return (
        <Navbar variant="dark" expand="md" className="p-0">
            <NavbarContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <NavTitle>
                    <img src="/assets/logo.png" alt="dog" /> <span>חיות במושבה</span> 
                </NavTitle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"> 
                        <NavLinks>
                            <NavLink>
                                <Link to="/login">Login</Link>
                            </NavLink>
                            <NavLink>
                                <Link to="/dashboard">Dashboard</Link>
                            </NavLink>
                        </NavLinks>
                    </Nav>
                </Navbar.Collapse>
            </NavbarContainer>
        </Navbar>
    )
}

export default GlobalNavbar;    