import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 text-gray-800 px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-10">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Privacy Policy
          </h1>

          <section className="space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              At StayFinder, your privacy is important to us. This Privacy Policy
              explains how we collect, use, and protect your information when you use
              our platform.
            </p>

            <h2 className="text-lg font-semibold mt-6">1. Information We Collect</h2>
            <ul className="list-disc list-inside ml-4">
              <li>Your name, email address, and contact details</li>
              <li>Property details and booking history</li>
              <li>Payment and transaction data (secured via Stripe)</li>
              <li>Cookies and usage data for improving user experience</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6">2. How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Process bookings and payments</li>
              <li>Provide customer support</li>
              <li>Send important account notifications</li>
              <li>Improve our platform and services</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6">3. Data Sharing</h2>
            <p>
              We do not sell your data. Your information may be shared with:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Payment gateways (e.g., Stripe)</li>
              <li>Service providers helping us operate StayFinder</li>
              <li>Legal authorities, if required</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6">4. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience. You can control
              cookies through your browser settings.
            </p>

            <h2 className="text-lg font-semibold mt-6">5. Your Choices</h2>
            <p>
              You can access, update, or delete your personal information by visiting
              your account settings or contacting support.
            </p>

            <h2 className="text-lg font-semibold mt-6">6. Changes to This Policy</h2>
            <p>
              We may update this policy occasionally. We encourage you to review this
              page periodically.
            </p>

            <h2 className="text-lg font-semibold mt-6">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us
              at <a href="mailto:support@stayfinder.com" className="text-blue-500 underline">support@stayfinder.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
