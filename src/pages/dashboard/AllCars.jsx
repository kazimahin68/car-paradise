import { useEffect, useState } from "react";
import SingleCarDashboard from "./SingleCarDashboard";
// import SingleCarDashboard from "./SingleCarDashboard";

const AllCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);


  const handleDeleteCar = (id) =>{
    setCars(cars.filter(car => car._id !== id))
  }

  // console.log(cars)
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {cars.map((car) => (
        <SingleCarDashboard key={car._id} car={car} onDelete={handleDeleteCar}></SingleCarDashboard>
      ))}
    </div>
  );
};

export default AllCars;
