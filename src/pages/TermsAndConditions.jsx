import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-800">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Terms and Conditions
          </h1>

          <section className="space-y-6 text-sm md:text-base leading-relaxed">
            <p>
              Welcome to StayFinder! These terms and conditions outline the rules and
              regulations for the use of our platform. By accessing or using our
              website, you agree to comply with and be bound by these terms.
            </p>

            <h2 className="text-lg font-semibold">1. Use of the Platform</h2>
            <p>
              You must be at least 18 years old to create an account. You agree to
              provide accurate and current information and to keep your login details
              secure.
            </p>

            <h2 className="text-lg font-semibold">2. User Responsibilities</h2>
            <ul className="list-disc ml-6">
              <li>You are responsible for your account activity.</li>
              <li>Do not use StayFinder for illegal or unauthorized purposes.</li>
              <li>Respect other users and their properties.</li>
            </ul>

            <h2 className="text-lg font-semibold">3. Booking and Cancellation</h2>
            <p>
              Booking policies, fees, and cancellation rules may vary per listing.
              Please read property-specific terms before confirming your stay.
            </p>

            <h2 className="text-lg font-semibold">4. Host Guidelines</h2>
            <p>
              Hosts are responsible for the accuracy of their listings and compliance
              with local laws. StayFinder is not liable for disputes between guests
              and hosts.
            </p>

            <h2 className="text-lg font-semibold">5. Payment & Fees</h2>
            <p>
              All payments are processed securely. Service and transaction fees may
              apply. By booking, you agree to pay the listed price and any applicable
              charges.
            </p>

            <h2 className="text-lg font-semibold">6. Intellectual Property</h2>
            <p>
              All content on StayFinder is the intellectual property of the company
              and may not be used without permission.
            </p>

            <h2 className="text-lg font-semibold">7. Limitation of Liability</h2>
            <p>
              StayFinder is not responsible for property conditions, personal injury,
              or loss of belongings during your stay. Use the platform at your own
              risk.
            </p>

            <h2 className="text-lg font-semibold">8. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use of the platform
              implies acceptance of the updated terms.
            </p>

            <h2 className="text-lg font-semibold">9. Contact Us</h2>
            <p>
              For any questions about these terms, contact us at{" "}
              <a href="mailto:support@stayfinder.com" className="text-blue-500 underline">
                support@stayfinder.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
