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
                        מוצרים
                    </NavLink>
                </SubnavLink>
                <SubnavLink>
                    <NavLink
                        to="/dashboard/categories"
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        קטגוריות
                    </NavLink>
                </SubnavLink>
                <SubnavLink>
                    <NavLink
                        to="/dashboard/brands"
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        חברות
                    </NavLink>
                </SubnavLink>
                <SubnavLink>
                    <NavLink
                        to="/dashboard/logs"
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        לוגים
                    </NavLink>
                </SubnavLink>
            </SubnavLinks>
        </SubnavbarContainer>
    )
}

export default Subnavbar;    