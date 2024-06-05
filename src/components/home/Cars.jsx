/* eslint-disable react/prop-types */
import SingleCar from "./SingleCar";

const Cars = ({ cars }) => {
  return (
    <div className="mt-20">
      <h2 className="font-bold text-center text-2xl">Popular Cars</h2>
      <div className="flex flex-wrap gap-4 m-auto w-4/5 mt-10">
        {cars.slice(0, 3).map((car) => (
          <SingleCar key={car._id} car={car}></SingleCar>
        ))}
      </div>
    </div>
  );
};

export default Cars;
