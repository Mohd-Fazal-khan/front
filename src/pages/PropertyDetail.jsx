import React, { useEffect, useState } from "react";
import {
  FaWifi,
  FaTv,
  FaSwimmer,
  FaFireAlt,
  FaParking,
  FaBed,
  FaUtensils,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { getCoordinates } from "../utils/geocode";
import "leaflet/dist/leaflet.css";


import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AMENITIES = [
  { id: 1, name: "Kitchen", icon: <FaUtensils /> },
  { id: 2, name: "Bedroom", icon: <FaBed /> },
  { id: 3, name: "TV", icon: <FaTv /> },
  { id: 4, name: "Wifi", icon: <FaWifi /> },
  { id: 5, name: "Free Parking", icon: <FaParking /> },
  { id: 6, name: "Swimming Pool", icon: <FaSwimmer /> },
  { id: 7, name: "Fireplace", icon: <FaFireAlt /> },
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (property?.location) {
      getCoordinates(property.location).then(setCoordinates);
    }
  }, [property]);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        {error}
      </div>
    );
  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">Property not found</div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">

       
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">{property.title}</h1>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="sm:col-span-2 h-64 sm:h-96">
            <img
              src={property.images?.[0]}
              alt="Main"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="sm:col-span-2 grid grid-cols-2 gap-4">
            {property.images?.slice(1, 5).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Property ${i}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          
          <div className="lg:col-span-2">
            <div className="space-y-4 border-b pb-6 mb-6">
              <h2 className="text-2xl font-semibold">Property Details</h2>
              <p className="text-gray-600">{property.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <div><strong>Type:</strong> {property.propertytype}</div>
                <div><strong>Location:</strong> {property.location}</div>
                <div><strong>Max Guests:</strong> {property.maxGuests}</div>
              </div>
            </div>

           
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {AMENITIES.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 p-4 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition">
                    <span className="text-gray-600 text-xl">{a.icon}</span>
                    <span className="text-gray-700">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

           
            {coordinates && (
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Location</h2>
                <div className="h-80 w-full rounded-lg overflow-hidden">
                  <MapContainer
                    center={[coordinates.lat, coordinates.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={[coordinates.lat, coordinates.lng]}>
                      <Popup>{property.location}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}
          </div>

         
          <div className="lg:col-span-1">
            <div className="sticky top-24 border rounded-xl p-6 shadow-lg bg-white">
              <div className="mb-4">
                <span className="text-2xl font-bold">${property.price}</span>
                <span className="text-gray-500"> /night</span>
              </div>

              <div className="space-y-4 mt-6 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>$20</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/book", { state: { property } })}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mt-6 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
