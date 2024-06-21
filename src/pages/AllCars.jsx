import { RiseLoader } from "react-spinners";
import SingleCar from "../components/home/SingleCar";
import { useQuery } from "@tanstack/react-query";

const AllCars = () => {
  const {
    data: cars = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const res = await fetch("https://car-paradise-server.onrender.com/cars");
      return res.json();
    },
  });
  if (isLoading) {
    <div className="flex justify-center items-center h-screen">
      <RiseLoader
        className="text-center"
        color="#36d7b7"
        cssOverride={{}}
        loading
        margin={11}
        size={25}
        speedMultiplier={1}
      />
    </div>;
  }

  return (
    <div className="flex gap-4 flex-wrap justify-center mx-auto w-11/12">
      <h2 className="text-4xl font-bold mt-10">All Available Cars</h2>
      <hr className="mb-10 w-full" />
      {cars.map((car) => (
        <SingleCar
          key={car._id}
          car={car}
          refetch={refetch}
        ></SingleCar>
      ))}
    </div>
  );
};

export default AllCars;
