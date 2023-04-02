import { FC } from 'react';
import { NavLink } from "react-router-dom";
import { SubnavbarContainer, SubnavLinks, SubnavLink } from "./SubnavbarStyles";

const Subnavbar: FC = () => {
    return (
        <SubnavbarContainer>
            <SubnavLinks>
                <SubnavLink>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Products
                    </NavLink>
                </SubnavLink>
                <SubnavLink>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Categories
                    </NavLink>
                </SubnavLink>
                <SubnavLink>
                    <NavLink
                        to="/brands"
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Brands
                    </NavLink>
                </SubnavLink>
            </SubnavLinks>
        </SubnavbarContainer>
    )
}

export default Subnavbar;    