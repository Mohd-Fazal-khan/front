import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties/${id}`);
        const data = res.data;

        setProperty({
          ...data,
          mainImage: data.images?.[0] ? { preview: data.images[0] } : null,
          otherImages: data.images?.slice(1)?.map((img) => ({ preview: img })) || [],
        });
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setProperty((prev) => ({ ...prev, mainImage: { file, preview } }));
    }
  };

  const handleOtherImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setProperty((prev) => ({ ...prev, otherImages: previews }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("title", property.title);
    form.append("location", property.location);
    form.append("propertytype", property.propertytype);
    form.append("maxGuests", property.maxGuests);
    form.append("price", property.price);
    form.append("description", property.description);

    if (property.mainImage?.file) {
      form.append("mainImage", property.mainImage.file);
    }

    property.otherImages.forEach((imgObj) => {
      if (imgObj.file) {
        form.append("otherImages", imgObj.file);
      }
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to update property.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Loading property...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded shadow text-lg font-semibold">
            Updating Property...
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-600">Edit Property</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
          
            {[
              { label: "Title", name: "title", type: "text", placeholder: "e.g., Cozy Cottage" },
              { label: "Location", name: "location", type: "text", placeholder: "e.g., Goa" },
              { label: "Max Guests", name: "maxGuests", type: "number", placeholder: "4" },
              { label: "Price per night ($)", name: "price", type: "number", placeholder: "150" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={property[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
            ))}

           
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Property Type</label>
              <select
                name="propertytype"
                value={property.propertytype}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              >
                <option value="">Select Type</option>
                <option value="Cottage">Cottage</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>

            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                rows="4"
                placeholder="Write something about this property..."
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              ></textarea>
            </div>

           
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Main Image</label>
              <input type="file" accept="image/*" onChange={handleMainImageChange} className="w-full" />
              {property.mainImage?.preview && (
                <img
                  src={property.mainImage.preview}
                  alt="Main"
                  className="mt-3 rounded-md h-48 w-full object-cover shadow-sm transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>

           
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Other Images</label>
              <input type="file" accept="image/*" multiple onChange={handleOtherImagesChange} className="w-full" />
              {property.otherImages?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {property.otherImages.map((img, i) => (
                    <img
                      key={i}
                      src={img.preview}
                      alt={`Preview ${i}`}
                      className="h-32 object-cover rounded-md shadow-sm transition-transform duration-300 hover:scale-105"
                    />
                  ))}
                </div>
              )}
            </div>

           
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Update Property"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditProperty;
