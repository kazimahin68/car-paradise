import { useContext } from "react";
import SingleCarDashboard from "./SingleCarDashboard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../authProvider/AuthProvider";
import { RiseLoader } from "react-spinners";

const TraderCars = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {
    data: cars = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cars", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cars/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
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
    <div className="flex gap-4 flex-wrap justify-center">
      {cars.map((car) => (
        <SingleCarDashboard
          key={car._id}
          car={car}
          refetch={refetch}
        ></SingleCarDashboard>
      ))}
    </div>
  );
};

export default TraderCars;
