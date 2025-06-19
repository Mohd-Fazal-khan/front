import React, { useState } from 'react';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import axios from 'axios';

const Herosection = ({ onFilter }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/properties/filter`, {
        location,
        checkIn,
        checkOut,
        guests,
      });
      onFilter(response.data); // send to Home.jsx
    } catch (error) {
      console.error("Error filtering properties:", error);
    }
  };

  return (
  <div className="relative w-full h-[500px] md:h-[600px]">
  <img
    src="../src/assets/hero.jpg"
    className="w-full h-full object-cover brightness-75"
    alt="StayFinder Hero"
  />

  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 text-white">
    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4">
      Find Your Perfect Stay
    </h1>
    <h2 className="text-sm sm:text-base md:text-xl mb-4 md:mb-6">
      Search unique homes and experiences
    </h2>

    <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl p-4 flex flex-col md:flex-row md:flex-nowrap gap-4 items-stretch md:items-center justify-between">
      
     
      <div className="flex items-center gap-2 px-2 w-full flex-1">
        <FaMapMarkerAlt className="text-gray-500" />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full outline-none text-sm text-gray-700"
        />
      </div>

      
      <div className="flex items-center gap-2 px-2 w-full flex-1">
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full outline-none text-sm text-gray-700"
        />
      </div>

      
      <div className="flex items-center gap-2 px-2 w-full flex-1">
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full outline-none text-sm text-gray-700"
        />
      </div>

      
      <div className="flex items-center gap-2 px-2 w-full flex-1">
        <FaUser className="text-gray-500" />
        <input
          type="number"
          placeholder="Guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full outline-none text-sm text-gray-700"
          min="1"
        />
      </div>

     
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-blue-700 w-full md:w-auto justify-center"
      >
        <FaSearch /> <span>Search</span>
      </button>
    </div>
  </div>
</div>


  );
};

export default Herosection;
