import React from "react";
import "./App.css";
// import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import BookingConfirmation from "./pages/BookingConfirmation";
import BookingPage from "./pages/BookingPage";
import EditProperty from "./pages/EditProperty";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import Faq from "./pages/Faq";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />}/>
          <Route path="/book" element={<BookingPage />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route path="/privacy-poilcy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
