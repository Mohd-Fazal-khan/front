import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ totalPrice, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
        amount: 2000, 
        currency: "usd", 
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        if (onSuccess) {
          onSuccess(); 
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded font-semibold"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
