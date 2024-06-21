import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_Gateway_PK}`);
const Payment = () => {
  //   const location = useLocation();
  //   const queryParams = new URLSearchParams(location.search);
  //   const amount = queryParams.get("price");
  const { id } = useParams();
  const [axiosSecure] = useAxiosSecure();
  const { data: cartItem = [] } = useQuery({
    queryKey: ["cartItems", id],
    queryFn: async () => {
      const res = await axiosSecure(`/cars/cartItem/${id}`);
      // console.log('res from axios', res)
      return res.data;
    },
  });

  const amount = cartItem.price;

  const price = parseFloat(amount).toFixed(2);
  return (
    <div className="w-full text-center mx-auto">
      <h2 className="text-3xl">Payment Gateway</h2>
      <hr className="w-full mt-4" />
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} cartItem={cartItem}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
