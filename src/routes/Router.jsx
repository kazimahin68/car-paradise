import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import AllCars from "../pages/dashboard/AllCars";
import AddNewCar from "../pages/dashboard/AddNewCar";
import EditCar from "../pages/dashboard/EditCar";
import Profile from "../pages/users/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: "users/:email",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      }
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        )
      },
      {
        path: "all-cars",
        element: <PrivateRoute><AllCars></AllCars></PrivateRoute>
      },
      {
        path: "add-car",
        element: <PrivateRoute><AddNewCar></AddNewCar></PrivateRoute>
      },
      {
        path: "/dashboard/all-cars/edit-car/:id",
        element: <PrivateRoute><EditCar></EditCar></PrivateRoute>
      }
    ],
  },

]);
