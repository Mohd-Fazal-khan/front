import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I book a property on StayFinder?",
    answer:
      "To book a property, simply browse listings, choose your preferred stay, and click 'Book Now'. You'll need to be logged in to complete the reservation.",
  },
  {
    question: "Can I list my own property?",
    answer:
      "Yes! After signing up, you can become a host and list your property from your dashboard. Just click 'Add New Property'.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation policies vary by property. Please check the individual listing page for specific cancellation rules.",
  },
  {
    question: "Are payments secure on StayFinder?",
    answer:
      "Absolutely. We use Stripe to securely process payments. Your personal and card information is encrypted.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach us on the Contact Us page or email support@stayfinder.com. We respond within 24 hours.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Frequently Asked Questions</h1>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-md">
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left flex justify-between items-center px-4 py-3 focus:outline-none"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-blue-500" />
                  ) : (
                    <FaChevronDown className="text-blue-500" />
                  )}
                </button>
                {activeIndex === index && (
                  <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Faq;
