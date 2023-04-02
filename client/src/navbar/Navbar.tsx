import { FC } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { NavbarContainer, NavTitle, NavLinks, NavLink } from "./NavbarStyles";

const Navbar: FC = () => {
    const logo = <FontAwesomeIcon icon={faDog} />
    return (
        <NavbarContainer>
            <NavTitle>
                {logo} חיות במושבה
            </NavTitle>
            <NavLinks>
                <NavLink>
                    <Link to="/login">Login</Link>
                </NavLink>
                <NavLink>
                    <Link to="/dashboard">Dashboard</Link>
                </NavLink>
            </NavLinks>
        </NavbarContainer>
    )
}

export default Navbar;    