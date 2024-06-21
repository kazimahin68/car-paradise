/* eslint-disable no-undef */

import { useContext, useState } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";

/* eslint-disable react/prop-types */
const SingleCar = ({ car }) => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [cart, setCart] = useState([]);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const { brand_name, model, price, description, img_url, available_quantity } =
    car;

  const handleCart = (car) => {
    if (!user && user?.email) {
      toast.success("Car information successfully updated!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/login");
      return;
    }
    const CartItems = {
      carId: car._id,
      brand_name,
      model,
      price: parseFloat(price),
      description,
      img_url,
      buyer_email: user?.email,
      available_quantity: parseFloat(available_quantity),
      merchant_email: car.merchant_email,
    };

    axiosSecure.post("/cars/cartItem", CartItems).then((data) => {
      if (data.data.insertedId) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Your Item is successfully added to the Cart",
          showConfirmButton: false,
          timer: 1500,
        });
        setCart((prevCartItem) => [...prevCartItem, car._id]);
      }
    });
  };
  const isAddedToCart = (carId) => {
    return cart.includes(carId);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="h-56">
        <img src={img_url} alt="car" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">
          Brand Name: <span className="font-normal">{brand_name}</span>
        </h2>
        <div className="flex justify-between items-center">
          <p className="mb-4 font-bold">
            Model: <span className="font-normal">{model}</span>
          </p>
          <p className="mb-4 font-bold">
            Price: <span className="font-normal">{price} </span>$
          </p>
        </div>
        <p className="mb-4 font-bold">
          Available Stock:{" "}
          <span className="font-normal">{available_quantity} </span>
        </p>
        <p className="mb-4">{description}</p>
        <div className="card-actions justify-center">
          <button
            onClick={() => handleCart(car)}
            disabled={available_quantity === 0 || isAddedToCart(car._id)}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </div>
  );
};

export default SingleCar;
