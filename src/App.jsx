// src/App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
import ServicesPage from "./components/ServicesPage";
import AboutUsPage from "./components/Aboutus";
import TechnologyPage from "./components/Technology";
import ContactUsPage from "./components/Contactus";
import CareersPage from "./components/CareersPage";
import Footer from "./components/Footer";
import BlogPage from "./components/blog";
import ScrollToTop from "./components/ScrollToTop"; // ✅ Import this

import HireUsPage from "./components/HireUsPage";
import PortfolioPage from "./components/OurWorkPage";
import ServiceDetailPage from "./components/ServiceDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* ✅ Add this */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Aboutus" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/Technology" element={<TechnologyPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/services/service-detail/:id" element={<ServiceDetailPage />} />

        <Route path="/HireUsPage" element={<HireUsPage />} />
        <Route path="/PortfolioPage" element={<PortfolioPage />} />
      </Routes>
      <Footer showLatestJobs={true} />
    </BrowserRouter>
  );
};

export default App;
