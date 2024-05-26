import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import ActiveLink from "./ActiveLink";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () =>{
    logOut();
  }
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <ActiveLink to="/">Home</ActiveLink>
            </li>
            <li>
              <ActiveLink to="/about">About</ActiveLink>
            </li>
            <li>
              <ActiveLink to="">Dashboard</ActiveLink>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">Car Paradise</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <ActiveLink className="font-bold" to="/">Home</ActiveLink>
          </li>
          <li>
            <ActiveLink to="/about">About</ActiveLink>
          </li>
          {user ? <li>
            <ActiveLink to="dashboard">Dashboard</ActiveLink>
          </li> : ""}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
            <button onClick={handleLogout} className="btn bg-green-600 font-bold">Logout
            </button>
          </div>
        ) : (
          <button className="btn bg-green-600 font-bold">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
