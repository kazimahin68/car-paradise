import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";


const EditCar = () => {
  const car = useLoaderData();
  console.log(car)
  // const {_id, brand_name, description, img_url, price, brand_country, model} = car;
  const [brand_name, setBrandName] = useState(car.brand_name);
  const [description, setDescription] = useState(car.description);
  const [img_url, setImgURL] = useState(car.img_url);
  const [price, setPrice] = useState(car.price);
  const [brand_country, setBrandCountry] = useState(car.brand_country);
  const [model, setModel] = useState(car.model);

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
        const brand_name = form.brand_name.value;
        const description = form.description.value;
        const img_url = form.img_url.value;
        const price = form.price.value;
        const brand_country = form.brand_country.value;
        const model = form.model.value;
        // Clear the form after submission
        const data = {
          brand_name,
          description,
          img_url,
          price,
          brand_country,
          model,
        };

        await fetch(`http://localhost:5000/cars/${car._id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Car information successfully updated!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
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
          value={brand_name}
          onChange={(e) => setBrandName(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          value={img_url}
          onChange={(e) => setImgURL(e.target.value)}
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
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
          value={brand_country}
          onChange={(e) => setBrandCountry(e.target.value)}
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
          value={model}
          onChange={(e) => setModel(e.target.value)}
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

export default EditCar;
