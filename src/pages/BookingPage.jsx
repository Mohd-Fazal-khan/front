import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/stripe/CheckoutForm";

const stripePromise = loadStripe("pk_test_51RbEDvFLnvNjquzmXIjTobIbkNHJP3W94sU26pLIcSL0E8f9wZ3nSduLKaKbhYfDKU2iKVO8QA1OZC5du2Q3YwIk002kZoR1Ke");

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;
  const { user } = useContext(AuthContext);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  const [isAvailable, setIsAvailable] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  useEffect(() => {
    if (!property) {
      navigate("/");
    }
  }, [property, navigate]);

  useEffect(() => {
    if (checkIn && checkOut && property) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

      if (nights > 0 && property.price) {
        setTotalPrice(nights * property.price);
        checkAvailability();
      } else {
        setTotalPrice(0);
        setAvailabilityError("Check-out date must be after check-in date");
        setIsAvailable(false);
      }
    }
  }, [checkIn, checkOut, property]);

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) return;

    try {
      setLoadingAvailability(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings/check-availability`, {
        propertyId: property._id,
        checkIn,
        checkOut,
      });

      if (res.data.available) {
        setAvailabilityError("");
        setIsAvailable(true);
      } else {
        setAvailabilityError("Selected dates are already booked.");
        setIsAvailable(false);
      }
    } catch (err) {
      setAvailabilityError("Error checking availability. Please try again.");
      setIsAvailable(false);
    } finally {
      setLoadingAvailability(false);
    }
  };

  const handleStripeSuccess = async () => {
    try {
      const bookingData = {
        property: property._id,
        user: user._id,
        checkIn,
        checkOut,
        guests,
        totalPrice,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      navigate("/booking-confirmation", { state: { booking: bookingData } });
    } catch (err) {
      setError("Booking created but confirmation failed");
    }
  };

  if (!property) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
      Book Your Stay at{" "}
      <span className="text-blue-600">{property.title}</span>
    </h1>

    <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm sm:text-base">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            value={checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

       
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Guests (Max: {property.maxGuests})
          </label>
          <input
            type="number"
            min="1"
            max={property.maxGuests}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

       
        <div className="flex flex-col justify-center items-start sm:items-end">
          <span className="text-gray-700 text-lg font-medium">Total Price</span>
          <span className="text-3xl font-bold text-green-600 mt-2">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

    
      <div className="mt-10 border-t pt-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
          Complete Payment
        </h2>

        {loadingAvailability ? (
          <p className="text-gray-500">Checking availability...</p>
        ) : isAvailable ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} onSuccess={handleStripeSuccess} />
          </Elements>
        ) : (
          <p className="text-red-600 font-medium">{availabilityError || "Select valid dates to proceed."}</p>
        )}
      </div>
    </div>
  </div>
</main>

      <Footer />
    </div>
  );
};

export default BookingPage;
