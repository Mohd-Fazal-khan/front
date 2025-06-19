import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/properties/my-properties`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setListings(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/properties/del/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <Navbar />
     <div className="flex flex-col min-h-screen">
    
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-center sm:text-left">My Properties</h1>
          <Link
            to="/add-property"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center"
          >
            Add New Property
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-xl">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : listings.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            <p>No properties found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((property) => (
              <div
                key={property._id}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={property.images[0] || "placeholder.jpg"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{property.title}</h2>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-lg font-bold mt-2">
                    ${property.price}{" "}
                    <span className="text-sm font-normal text-gray-500">/night</span>
                  </p>
                  <div className="mt-4 flex justify-between text-sm">
                    <Link
                      to={`/edit-property/${property._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>

    <Footer />
  </div>

    </>
  );
};

export default Dashboard;
