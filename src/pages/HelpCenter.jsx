import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HelpCenter = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-800">
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Help Center
          </h1>

          <section className="space-y-10">
           
            <div>
              <h2 className="text-xl font-semibold mb-2">Booking Help</h2>
              <ul className="list-disc ml-6 text-sm md:text-base">
                <li>How do I book a property?</li>
                <li>Can I cancel or modify my reservation?</li>
                <li>What if the host doesn't respond?</li>
              </ul>
            </div>

            
            <div>
              <h2 className="text-xl font-semibold mb-2">Hosting Help</h2>
              <ul className="list-disc ml-6 text-sm md:text-base">
                <li>How do I become a host?</li>
                <li>How do I manage my listing?</li>
                <li>How do payouts work?</li>
              </ul>
            </div>

           
            <div>
              <h2 className="text-xl font-semibold mb-2">Account & Security</h2>
              <ul className="list-disc ml-6 text-sm md:text-base">
                <li>How do I reset my password?</li>
                <li>How do I verify my email or identity?</li>
                <li>How do I deactivate my account?</li>
              </ul>
            </div>

           
            <div>
              <h2 className="text-xl font-semibold mb-2">Payments & Refunds</h2>
              <ul className="list-disc ml-6 text-sm md:text-base">
                <li>How do I make a payment?</li>
                <li>How are refunds processed?</li>
                <li>What if I get charged twice?</li>
              </ul>
            </div>

          
            <div>
              <h2 className="text-xl font-semibold mb-2">Still need help?</h2>
              <p className="text-sm md:text-base">
                You can reach our support team from Monday to Friday, 9 AM – 5 PM IST.
                <br />
                Email us at{" "}
                <a
                  href="mailto:support@stayfinder.com"
                  className="text-blue-600 underline"
                >
                  support@stayfinder.com
                </a>
              </p>
            </div>

            <div className="text-center mt-8">
              <Link
                to="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition"
              >
                Back to Home
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HelpCenter;
