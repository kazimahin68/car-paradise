import { Link, Outlet } from "react-router-dom";
import ActiveLink from "../components/ActiveLink";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center p-2">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex flex-col justify-between items-start menu w-64 min-h-full bg-base-200 text-base-content">
          <ul className="mt-12">
            {/* Sidebar content here */}
            <li>
                <ActiveLink to="">Dashboard</ActiveLink>
            </li>
            <li>
              <ActiveLink to="all-cars">All Cars</ActiveLink>
            </li>
            <li>
              <ActiveLink to="/items">Add New Car</ActiveLink>
            </li>
          </ul>
          <button className="btn font-bold text-lg bg-green-600 rounded-lg">
            <Link to="/">Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
