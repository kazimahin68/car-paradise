// import { useLoaderData } from "react-router-dom";
import Banner from "../components/home/Banner";
import Cars from "../components/home/Cars";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: cars = [] } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/cars");
      return res.json();
    },
  });
  // console.log(cars)
  return (
    <div>
      <Banner></Banner>
      <Cars cars={cars}></Cars>
    </div>
  );
};

export default Home;
