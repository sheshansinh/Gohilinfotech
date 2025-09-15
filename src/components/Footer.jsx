import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaRocket,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { IoLocationSharp, IoCall, IoMail } from "react-icons/io5";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector("#animated-footer");
    if (footerElement) {
      observer.observe(footerElement);
    }

    // Auto-update copyright year
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }

    return () => observer.disconnect();
  }, []);

  const socialMediaLinks = [
    {
      icon: FaFacebookF,
      label: "Facebook",
      color: "hover:bg-blue-500",
      bgGlow: "hover:shadow-blue-500/50",
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      color: "hover:bg-sky-400",
      bgGlow: "hover:shadow-sky-400/50",
    },
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
      color: "hover:bg-blue-600",
      bgGlow: "hover:shadow-blue-600/50",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500",
      bgGlow: "hover:shadow-purple-500/50",
    },
    {
      icon: FaGithub,
      label: "Github",
      color: "hover:bg-gray-600",
      bgGlow: "hover:shadow-gray-600/50",
    },
  ];

  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/aboutus" },
    { name: "Services", to: "/services" },
    { name: "Technology", to: "/technology" },
    { name: "Contact us", to: "/contact" },
  ];

  const services = [
    { name: "Web Development", to: "/services/web" },
    { name: "Mobile Apps", to: "/services/mobile" },
    { name: "UI/UX Design", to: "/services/ui-ux" },
    { name: "Cloud Solutions", to: "/services/cloud" },
    { name: "Digital Marketing", to: "/services/marketing" },
  ];

  const contactInfo = [
    {
      icon: IoLocationSharp,
      text: "209, Aamrakunj Business Centre, Near Panchslok, Chandkheda, Ahmedabad, Gujarat, India – 382424",
      link: "https://www.google.com/maps",
      color: "text-[#E67E22]",
      bgColor: "bg-[#E67E22]/10",
      hoverBg: "group-hover:bg-[#E67E22]/20",
    },
    {
      icon: IoCall,
      text: "+91 6352457958",
      link: "tel:+916352457958",
      color: "text-[#27B0C4]",
      bgColor: "bg-[#27B0C4]/10",
      hoverBg: "group-hover:bg-[#27B0C4]/20",
    },
    {
      icon: IoMail,
      text: "info@gohilinfotech.com",
      link: "mailto:info@gohilinfotech.com",
      color: "text-[#73CCD7]",
      bgColor: "bg-[#73CCD7]/10",
      hoverBg: "group-hover:bg-[#73CCD7]/20",
    },
  ];

  return (
    <footer
      id="animated-footer"
      className="relative bg-[#2C3E50] text-[#F4F4F4] overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#27B0C4]/20 to-[#73CCD7]/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-[#E67E22]/20 to-[#E67E22]/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
      </div>

      <div
        className={`relative z-10 mx-auto max-w-7xl px-6 py-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Main Grid: Adjusting column spans for a more balanced look */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {/* Company Info - Taking more space on smaller screens */}
          <div
            className={`md:col-span-2 lg:col-span-1 xl:col-span-2 space-y-6 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="group cursor-pointer relative">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="src/assets/GIPL_Logo1.png"
                  alt="Company Logo"
                  width={140}
                  height={36}
                  className="transition-all duration-500 group-hover:brightness-110 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#27B0C4]/20 to-[#73CCD7]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <HiSparkles className="absolute -top-1 -right-1 text-[#E67E22] text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin" />
              </div>
            </div>

            <p className="text-[#F4F4F4] leading-relaxed text-sm font-light relative">
              <HiLightningBolt className="inline text-[#E67E22] mr-1 animate-pulse" />
              We build powerful digital experiences that drive growth and
              innovation for businesses worldwide. Creating tomorrow's solutions
              today.
            </p>

            <div className="flex gap-3">
              {socialMediaLinks.map(
                ({ icon: Icon, label, color, bgGlow }, index) => (
                  <a
                    key={index}
                    href="#"
                    aria-label={label}
                    className={`group flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm text-[#F4F4F4] transition-all duration-500 ${color} ${bgGlow} hover:text-white hover:shadow-2xl hover:-translate-y-2 hover:rotate-12 border border-white/10 hover:border-white/30 transform hover:scale-110`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="text-base transition-all duration-300 group-hover:scale-125" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="relative text-xl font-bold text-white group">
              <FaRocket className="inline mr-2 text-[#27B0C4] animate-bounce" />
              Quick Links
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#27B0C4] to-[#73CCD7] rounded-full transition-all duration-1000 group-hover:w-full"></div>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map(({ name, to }, index) => (
                <li key={index} className="group">
                  <Link
                    to={to}
                    className="flex items-center text-[#F4F4F4] transition-all duration-500 hover:text-[#27B0C4] group-hover:translate-x-4 group-hover:scale-105"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-[#27B0C4] to-transparent transition-all duration-500 group-hover:w-6 mr-0 group-hover:mr-3 rounded-full"></span>
                    <span className="relative">
                      {name}
                      <span className="absolute inset-0 bg-gradient-to-r from-[#27B0C4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            className={`space-y-6 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="relative text-xl font-bold text-white group">
              <HiSparkles className="inline mr-2 text-[#73CCD7] animate-spin" />
              Services
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#73CCD7] to-[#27B0C4] rounded-full transition-all duration-1000 group-hover:w-full"></div>
            </h3>
            <ul className="space-y-4">
              {services.map(({ name, to }, index) => (
                <li key={index} className="group">
                  <Link
                    to={to}
                    className="flex items-center text-[#F4F4F4] transition-all duration-500 hover:text-[#73CCD7] group-hover:translate-x-4 group-hover:scale-105"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-[#73CCD7] to-transparent transition-all duration-500 group-hover:w-6 mr-0 group-hover:mr-3 rounded-full"></span>
                    <span className="relative">
                      {name}
                      <span className="absolute inset-0 bg-gradient-to-r from-[#73CCD7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Takes up the remaining space */}
          <div
            className={`md:col-span-2 lg:col-span-1 xl:col-span-1 space-y-6 transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-6">
              <h3 className="relative text-xl font-bold text-white group">
                <IoMail className="inline mr-2 text-[#E67E22] animate-pulse" />
                Contact Us
                <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#E67E22] to-[#E67E22]/70 rounded-full transition-all duration-1000 group-hover:w-full"></div>
              </h3>
              <ul className="space-y-4">
                {contactInfo.map(
                  ({ icon: Icon, text, color, bgColor, hoverBg, link }, index) => (
                    <li key={index} className="group">
                      <a
                        href={link}
                        // CHANGE HERE: Use a flex container for the link with items-start
                        className="flex items-start gap-3 text-sm cursor-pointer"
                      >
                        <div
                          // CHANGE HERE: Keep the icon container's fixed height and center the icon
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${bgColor} ${hoverBg} ${color} border border-white/10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg flex-shrink-0`}
                        >
                          <Icon className="text-sm transition-all duration-300 group-hover:scale-125" />
                        </div>
                        <span className="text-[#F4F4F4] group-hover:text-white transition-all duration-500 leading-relaxed group-hover:translate-x-1">
                          {text}
                        </span>
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div
          className={`flex flex-col items-center justify-between mt-16 pt-8 border-t border-gradient-to-r from-transparent via-white/20 to-transparent text-center md:flex-row transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-4 text-sm text-[#7A7A7A] md:mb-0 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#27B0C4] rounded-full animate-ping"></span>
            © <span id="current-year">2023</span> GIPL. All Rights Reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((link, index) => (
              <Link
                key={index}
                to={`/${link.toLowerCase().replace(" ", "-")}`}
                className="text-sm text-[#7A7A7A] transition-all duration-500 hover:text-[#27B0C4] relative group hover:scale-105"
              >
                <span className="relative z-10">{link}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#27B0C4] to-transparent transition-all duration-500 group-hover:w-full rounded-full"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#27B0C4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;