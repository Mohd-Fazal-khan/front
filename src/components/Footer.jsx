import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-8 mt-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-y-10 gap-x-16 text-sm">

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">StayFinder</h3>
          <p className="text-gray-400">Your trusted platform for finding the perfect short or long stay.</p>
        </div>

       
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full text-center md:text-left">
         
          <div>
            <h4 className="font-semibold mb-2">Explore</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/dashboard" className="hover:underline">Become a Host</Link></li>
            </ul>
          </div>

         
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/help" className="hover:underline">Help Center</Link></li>
            </ul>
          </div>

          
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link to="/privacy-poilcy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>

      
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} StayFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
