/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

const ActiveLink = ({to, children}) => {
    return (
        <div>
            <NavLink
                to={to}
                className={({ isActive }) => isActive ? "text-yellow-600 me-4 font-bold text-lg" : " text-black me-4 font-semibold text-lg"
                }
            >
                {children}
            </NavLink>
        </div>
    );
};

export default ActiveLink;