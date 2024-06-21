/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import SingleCar from "./SingleCar";

const Cars = () => {
  const { data: cars = [] } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const res = await fetch("https://car-paradise-server.onrender.com/cars/popular");
      return res.json();
    },
  });
  return (
    <div className="mt-20">
      <h2 className="font-bold text-center text-2xl">Popular Cars</h2>
      <hr className="w-full mt-4" />
      <div className="flex flex-wrap gap-4 justify-center mx-auto w-11/12 mt-10">
        {cars.map((car) => (
          <SingleCar key={car._id} car={car}></SingleCar>
        ))}
      </div>
    </div>
  );
};

export default Cars;
