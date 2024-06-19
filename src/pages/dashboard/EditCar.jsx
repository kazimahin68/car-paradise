import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const EditCar = () => {
  const { id } = useParams();

  const { data: car = {}, refetch } = useQuery({
    queryKey: ["car"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/cars/${id}`);
      return res.json();
    },
  });
  const { brand_name, description, img_url, price, brand_country, model } = car;

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
            refetch();
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
          defaultValue={brand_name}
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
          defaultValue={description}
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
          defaultValue={img_url}
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
          defaultValue={price}
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
          defaultValue={brand_country}
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
          defaultValue={model}
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
