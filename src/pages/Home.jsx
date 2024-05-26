import { useLoaderData } from "react-router-dom";
import Banner from "../components/home/Banner";
import Cars from "../components/home/Cars";

const Home = () => {
    const cars = useLoaderData();
    // console.log(cars)
    return (
        <div>
            <Banner></Banner>
            <Cars cars={cars}></Cars>
        </div>
    );
};

export default Home;