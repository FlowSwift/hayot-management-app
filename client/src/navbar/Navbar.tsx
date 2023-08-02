import { FC } from 'react';
import { Link } from "react-router-dom";
import { NavbarContainer, NavTitle, NavLink } from "./NavbarStyles";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserData } from '../auth/util';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';

interface Props {
    loading: boolean
    user: UserData
}

const GlobalNavbar: FC<Props> = ({ loading, user }) => {
    return (
        <Navbar variant="dark" expand="md" className="p-0">
            <NavbarContainer>
                <Navbar.Toggle className="me-3" aria-controls="basic-navbar-nav" />
                <NavTitle>
                    <img src="/assets/logo.png" alt="dog" /> <span>חיות במושבה</span>
                </NavTitle>
                <Navbar.Collapse id="basic-navbar-nav" className="dropdown-nav py-2 px-3 justify-content-md-end">
                    <Nav>
                        <NavLink> 
                            <Link to="/dashboard">Dashboard</Link>
                        </NavLink> 
                        {!loading &&
                            (user.isAuthenticated ?
                            (<NavLink>
                                <Link to="/login">Logout</Link>
                            </NavLink>)
                            :
                            (<NavLink>
                                <Link to="/login">Login</Link>
                            </NavLink>))
                        } 
                    </Nav>
                </Navbar.Collapse>
            </NavbarContainer>
        </Navbar >
    )
}

export default GlobalNavbar;    