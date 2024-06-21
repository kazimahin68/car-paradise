/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import "./checkoutForm.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../authProvider/AuthProvider";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ price, cartItem }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  // console.log(cartItem);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      // console.log(confirmError.message)
      setCardError(confirmError.message);
    }
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        brand_name: cartItem.brand_name,
        model_name: cartItem.model_name,
        transactionId: paymentIntent.id,
        price,
        id: cartItem.carId,
        deleteId: cartItem._id,
        date: new Date(),
        status: "service pending",
      };
      axiosSecure.post("/payments", payment).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Your Payment is confirmed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };
  return (
    <>
      <form className="mt-6" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-xs m-auto mt-5 flex bg-green-600"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && (
        <p className="text-red-600 font-semibold mt-5">{cardError}</p>
      )}
      {transactionId && (
        <p className="text-green-600 font-semibold mt-5">
          <span className="text-black">
            Payment Completed with TransactionId:
          </span>{" "}
          {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
