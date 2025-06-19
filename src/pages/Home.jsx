import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Herosection from "../components/Herosection";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Footer from "../components/Footer";

const Home = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filterProperties, setFilterProperties] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [propertyType, setPropertyType] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties`);
        setAllProperties(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = allProperties
    .filter((property) => {
      if (propertyType !== "All" && property.propertytype !== propertyType) return false;

      const price = Number(property.price);
      if (priceRange === "0-150" && price > 150) return false;
      if (priceRange === "150-300" && (price < 150 || price > 300)) return false;
      if (priceRange === "300+" && price < 300) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div>
        <Navbar />
        <Herosection />
        <div className="flex justify-center items-center mt-8">
          <p className="text-xl">Loading properties...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <Herosection />
        <div className="flex justify-center items-center mt-8">
          <p className="text-xl text-red-500">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Herosection onFilter={setFilterProperties} />

       
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 w-full">
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Cottage">Cottage</option>
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="All">All Prices</option>
              <option value="0-150">Below $150</option>
              <option value="150-300">$150 - $300</option>
              <option value="300+">Above $300</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="default">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(filterProperties && filterProperties.length === 0) ||
            (!filterProperties && filteredProperties.length === 0) ? (
              <p className="col-span-full text-center text-gray-500 py-8">
                No properties found
              </p>
            ) : (
              (filterProperties || filteredProperties).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
