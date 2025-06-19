import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddProperty = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    propertytype: "",
    maxGuests: "",
    price: "",
    description: "",
    mainImage: null,
    otherImages: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        mainImage: { file, preview },
      }));
    }
  };

  const handleOtherImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({
      ...prev,
      otherImages: previews,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("location", formData.location);
    form.append("propertytype", formData.propertytype);
    form.append("maxGuests", formData.maxGuests);
    form.append("price", formData.price);
    form.append("description", formData.description);

    if (formData.mainImage?.file) {
      form.append("mainImage", formData.mainImage.file);
    }

    formData.otherImages.forEach((img) => {
      form.append("otherImages", img.file);
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to add property.");
      }
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded shadow text-lg font-semibold">
            Uploading Property...
          </div>
        </div>
      )}

      <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Add New Property
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "title", label: "Title", placeholder: "Cozy Villa", type: "text" },
                { name: "location", label: "Location", placeholder: "Goa", type: "text" },
                { name: "maxGuests", label: "Max Guests", placeholder: "4", type: "number" },
                { name: "price", label: "Price/Night ($)", placeholder: "150", type: "number" },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  />
                </div>
              ))}

             
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  name="propertytype"
                  value={formData.propertytype}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select</option>
                  <option value="Cottage">Cottage</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description..."
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              ></textarea>
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                required
                className="w-full text-sm text-gray-600"
              />
              {formData.mainImage && (
                <img
                  src={formData.mainImage.preview}
                  alt="Preview"
                  className="mt-3 w-full h-48 object-cover rounded-lg shadow-sm transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleOtherImagesChange}
                className="w-full text-sm text-gray-600"
              />
              {formData.otherImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {formData.otherImages.map((img, i) => (
                    <img
                      key={i}
                      src={img.preview}
                      alt={`Image ${i}`}
                      className="w-full h-32 object-cover rounded-lg shadow-sm transition-transform duration-300 hover:scale-105"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-lg transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Uploading..." : "Submit Property"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AddProperty;
