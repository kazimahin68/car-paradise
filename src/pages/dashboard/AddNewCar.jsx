/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";

const AddNewCar = () => {
  const {user} = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to proceed with this action?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const form = e.target;
        const id = form.id.value;
        const brand_name = form.brand_name.value;
        const description = form.description.value;
        const img_url = form.img_url.value;
        const price = form.price.value;
        const brand_country = form.brand_country.value;
        const model = form.model.value;
        const available_quantity = form.available_quantity.value;
        // Clear the form after submission
        form.reset();
        const data = {
          id,
          brand_name,
          description,
          img_url,
          price: parseFloat(price),
          brand_country,
          model,
          available_quantity: parseFloat(available_quantity),
          merchant_email: user?.email
        };

        await fetch("https://car-paradise-server.onrender.com/cars", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json)
          .then(() => {
            toast.success("Car information successfully inserted!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        );
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-4/5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Car Information</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="brand_name"
        >
          Brand Name
        </label>
        <input
          type="text"
          name="brand_name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          name="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="img_url"
        >
          Image URL
        </label>
        <input
          type="text"
          name="img_url"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Price
        </label>
        <input
          type="number"
          name="price"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="brand_country"
        >
          Brand Country
        </label>
        <input
          type="text"
          name="brand_country"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="model"
        >
          Model
        </label>
        <input
          type="text"
          name="model"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="available_quantity"
        >
          Available Quantity
        </label>
        <input
          type="number"
          name="available_quantity"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        <ToastContainer></ToastContainer>
      </div>
    </form>
  );
};

export default AddNewCar;
