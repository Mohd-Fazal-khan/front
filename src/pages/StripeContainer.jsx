import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51RbEDvFLnvNjquzmXIjTobIbkNHJP3W94sU26pLIcSL0E8f9wZ3nSduLKaKbhYfDKU2iKVO8QA1OZC5du2Q3YwIk002kZoR1Ke");

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;
