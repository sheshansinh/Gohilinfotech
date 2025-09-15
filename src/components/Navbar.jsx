import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ activeColor = "primary" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsScrolledUp(false); // scrolling down
      } else {
        setIsScrolledUp(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", path: "/", id: "home" },
    { name: "About", path: "/aboutus", id: "about" },
    { name: "Services", path: "/services", id: "services" },
    { name: "Technologies", path: "/technology", id: "technology" },
    { name: "Hire", path: "/HireUsPage", id: "hire" },
    { name: "Careers", path: "/careers", id: "careers" },
    { name: "Media", path: "/blog", id: "blog" },
    { name: "Our work", path: "/PortfolioPage", id: "our-work" },
  ];

  const isActiveLink = (path) => location.pathname === path;

  const getActiveBg = (color) =>
    color === "white" ? "bg-primary" : `bg-${color}`;

  // Navbar background
  const navbarClasses = isScrolledUp
    ? "bg-white/95 backdrop-blur-lg shadow-md"
    : "backdrop-blur-lg";

  // Dynamic text/icon colors
  const linkBaseClasses = isScrolledUp
    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
    : "text-primary hover:text-blue-200";

  const contactBtnClasses = isScrolledUp
    ? "text-blue-600 hover:bg-blue-300"
    : "bg-red border border-white text-primary hover:bg-white hover:text-blue-600";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navbarClasses}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Transition */}
          <Link
            to="/"
            className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={"src/assets/GIPL_Short Logo.png"}
              alt="GIPL Logo"
              className="h-12 w-auto transition-all duration-500 ease-in-out"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ name, path, id }) => (
              <Link
                key={id}
                to={path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActiveLink(path)
                    ? `text-[#fff] ${getActiveBg(activeColor)} shadow-md`
                    : linkBaseClasses
                }`}
              >
                <span>{name}</span>
              </Link>
            ))}
          </div>

          {/* Contact Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className={`hidden lg:flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm hover:shadow-lg transition-all ${contactBtnClasses} bg-[#73CCD7] text-white`}
            >
              <span>Contact us</span>
            </Link>

            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolledUp
                  ? "text-gray-700 bg-blue-100 hover:bg-blue-200"
                  : "text-black bg-white/20 hover:bg-white/30"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? "X" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl h-[80vh] overflow-y-auto">
          <div className="px-6 py-8 space-y-2">
            {navItems.map(({ name, path, id }) => (
              <Link
                key={id}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  isActiveLink(path)
                    ? `text-gray-100 ${getActiveBg(activeColor)} shadow-md`
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <span className="text-lg font-medium">{name}</span>
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                isActiveLink("/contact")
                  ? `text-gray-100 ${getActiveBg(activeColor)} shadow-md`
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <span className="text-lg font-medium">Contact</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;