/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Swal from 'sweetalert2'
const SingleCarDashboard = ({ car, onDelete }) => {
  const { id, brand_name, model, price, description, img_url } = car;
  // console.log(brand_name, model, price, description, img_url)

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:3000/cars/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            onDelete(id); // Call the onDelete function after successful deletion
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "There was an error deleting your file.",
              icon: "error",
            });
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
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
        <p className="mb-4">{description}</p>
        <div className="card-actions justify-center items-center gap-6">
          <button className="btn btn-success">Details</button>
          <button className="btn btn-warning">Update</button>
          <button onClick={handleDelete} className="btn bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCarDashboard;
