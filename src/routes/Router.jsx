import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import AddNewCar from "../pages/dashboard/AddNewCar";
import EditCar from "../pages/dashboard/EditCar";
import Profile from "../pages/users/Profile";
import TraderCars from "../pages/dashboard/TraderCars";
import AllCars from "../pages/AllCars";
import CartItems from "../pages/dashboard/CartItems";

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
      },
      {
        path: "/all-cars",
        element: <AllCars></AllCars>
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
        path: "cart-items",
        element: (
          <PrivateRoute>
            <CartItems></CartItems>
          </PrivateRoute>
        )
      },
      {
        path: "merchant-cars",
        element: <PrivateRoute><TraderCars></TraderCars></PrivateRoute>
      },
      {
        path: "add-car",
        element: <PrivateRoute><AddNewCar></AddNewCar></PrivateRoute>
      },
      {
        path: "/dashboard/merchant-cars/edit-car/:id",
        element: <PrivateRoute><EditCar></EditCar></PrivateRoute>
      }
    ],
  },

]);
