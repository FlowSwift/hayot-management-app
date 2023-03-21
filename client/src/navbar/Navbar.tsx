import { FC } from 'react';
import { Link } from "react-router-dom";

const Navbar: FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Login</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;    