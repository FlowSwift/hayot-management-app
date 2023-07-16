import { FC } from 'react';
import { NavLink } from "react-router-dom";
import { SubnavbarContainer, SubnavLinks, SubnavLink } from "./SubnavbarStyles";

const Subnavbar: FC = () => {
    return (
        <SubnavbarContainer>
            <SubnavLinks>
                <SubnavLink>
                    <NavLink
                        to="/dashboard/products"
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Products
                    </NavLink>
                </SubnavLink>
                <SubnavLink>
                    <NavLink
                        to="/dashboard/categories"
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Categories
                    </NavLink>
                </SubnavLink>
                <SubnavLink>
                    <NavLink
                        to="/dashboard/brands"
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Brands
                    </NavLink>
                </SubnavLink>
                <SubnavLink>
                    <NavLink
                        to="/dashboard/logs"
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        Logs
                    </NavLink>
                </SubnavLink>
            </SubnavLinks>
        </SubnavbarContainer>
    )
}

export default Subnavbar;    