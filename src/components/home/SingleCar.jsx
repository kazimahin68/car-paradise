/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
const SingleCar = ({ car }) => {
  const { brand_name, model, price, description, img_url } = car;
//   console.log(id, brand_name, model, price);
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
            Price: <span className="font-normal">{price} </span>
           $</p>
        </div>
        <p className="mb-4">{description}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default SingleCar;
