import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import { format } from 'date-fns'; 
import Footer from "../components/Footer";

const BookingConfirmation = () => {
  const location = useLocation();
  const booking = location.state?.booking;

 
  if (!booking) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-semibold text-red-600">Booking Not Found</h1>
          <p className="mt-4">No booking information available.</p>
          <Link
            to="/"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
          >
            Return Home
          </Link>
        </div>
         <Footer/>
      </>
    );
  }

  
  const formattedCheckIn = format(new Date(booking.checkIn), 'MMM dd, yyyy');
  const formattedCheckOut = format(new Date(booking.checkOut), 'MMM dd, yyyy');

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
       
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            Your booking is confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for booking with StayFinder. Your reservation details are below.
          </p>
        </div>

       
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
          <div className="border rounded-lg divide-y">
            <Row label="Check-in" value={formattedCheckIn} />
            <Row label="Check-out" value={formattedCheckOut} />
            <Row label="Number of Guests" value={`${booking.guests} guests`} />
            <Row label="Total Price" value={`$${booking.totalPrice.toFixed(2)}`} />
          </div>
        </section>

       
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Important Information</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <ul className="space-y-2">
              <li>• Check-in time is after 3:00 PM</li>
              <li>• Check-out time is before 11:00 AM</li>
              <li>• Please contact the property owner if you need early check-in or late check-out</li>
            </ul>
          </div>
        </section>

       
        <section className="flex gap-4">
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-yblue-700 text-white font-medium px-6 py-2 rounded"
          >
            Return Home
          </Link>
        </section>
      </div>
    </>
  );
};

const Row = ({ label, value }) => (
  <div className="flex justify-between px-4 py-3 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

export default BookingConfirmation;
