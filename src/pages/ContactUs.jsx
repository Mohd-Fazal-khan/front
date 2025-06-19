import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for contacting us!");
    setFormData({ name: "", email: "", message: "" });
   
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
              >
                Send Message
              </button>
            </form>

           
            <div className="space-y-4 text-gray-700">
              <h2 className="text-xl font-semibold">StayFinder Support</h2>
              <p>📍 2101 Khale Street, Charleston, SC 29424</p>
              <p>📞 +1 (800) 123-4567</p>
              <p>📧 <a href="mailto:support@stayfinder.com" className="text-blue-600 underline">support@stayfinder.com</a></p>
              <p className="pt-4">
                Customer service hours: <br />
                Monday – Friday, 9:00 AM – 5:00 PM (EST)
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
