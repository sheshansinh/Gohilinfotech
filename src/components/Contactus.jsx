import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, X } from "lucide-react";
import axios from "axios";

// Reusable animated container
const AnimatedContainer = ({ children }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      {children}
    </motion.div>
  );
};

// Reusable animated item
const AnimatedItem = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    }}
  >
    {children}
  </motion.div>
);

// Toast
const Toast = ({ message, type, onClose }) => {
  const baseClasses =
    "fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg font-semibold text-white z-50";
  const typeClasses = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`${baseClasses} ${typeClasses}`}
    >
      <div className="flex items-center space-x-2">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white transition"
        >
          <X size={20} />
        </button>
      </div>
    </motion.div>
  );
};

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    howDidYouHear: "",
    message: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [errors, setErrors] = useState({});

  const handleToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.company.trim())
      newErrors.company = "Company name is required.";

    // Updated phone number validation logic
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone =
        "Please enter a valid phone number (digits, spaces, hyphens, and parentheses are allowed).";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.howDidYouHear)
      newErrors.howDidYouHear = "Please select an option.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      handleToast("Please correct the form errors.", "error");
      return;
    }
    setErrors({});
    try {
      const response = await axios.post(
        "http://localhost/gipl_backend/process.php",
        formData
      );
      const { status, message } = response.data;
      if (status === "success") {
        handleToast(message, "success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          howDidYouHear: "",
          message: "",
        });
      } else {
        handleToast(message, "error");
      }
    } catch (error) {
      handleToast("An error occurred. Please try again later.", "error");
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      <main>
        {/* Hero Section */}
        <section className="w-full bg-gray-50 mt-24">
          <div className="max-w-6xl mx-auto text-center px-4">
            <AnimatedItem>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                Get in <span className="text-blue-600">Touch</span>
              </h1>
              <p className="text-lg text-gray-600  max-w-2xl mx-auto">
                We'd love to hear from you! Whether you have a project idea, a
                question, or just want to say hello, our team is ready to
                connect.
              </p>
            </AnimatedItem>
          </div>
        </section>

        {/* Contact Form, Info, and Map Section */}
        <section className="max-w-6xl mx-auto py-10 px-4">
          <AnimatedContainer>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Form */}
              <AnimatedItem>
                <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            First Name<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            className={`w-full p-3 border rounded-lg ${
                              errors.firstName
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        {/* Last Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Last Name<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            className={`w-full p-3 border rounded-lg ${
                              errors.lastName
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john.doe@example.com"
                          className={`w-full p-3 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Company */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Company<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Corp"
                          className={`w-full p-3 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.company
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.company && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.company}
                          </p>
                        )}
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 9876543210"
                          className={`w-full p-3 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Subject<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                        className={`w-full p-3 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.subject ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                    {/* How did you hear */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        How did you hear about us?
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="howDidYouHear"
                        id="howDidYouHear"
                        value={formData.howDidYouHear}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.howDidYouHear
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="Friend or colleague">
                          Friend or colleague
                        </option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Google search">Google search</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.howDidYouHear && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.howDidYouHear}
                        </p>
                      )}
                    </div>
                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Message<span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Tell us about your project..."
                        className={`w-full p-3 border rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.message ? "border-red-500" : "border-gray-300"
                        }`}
                      ></textarea>
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </AnimatedItem>

              {/* Right Column: Contact Info & Map */}
              <div className="flex flex-col gap-12">
                <AnimatedItem>
                  <div className="mt-3 space-y-8">
                    {/* Office */}
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="p-3 rounded-full bg-blue-100 text-blue-600 flex-shrink-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                      >
                        <MapPin size={24} />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Our Office
                        </h3>
                        <p className="text-gray-600">
                          209, Aamrakunj Business Centre <br />
                          Near Panchslok, Chandkheda <br />
                          Ahmedabad, Gujarat, India – 382424
                        </p>
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="p-3 rounded-full bg-blue-100 text-blue-600 flex-shrink-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.2,
                        }}
                      >
                        <Phone size={24} />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Phone
                        </h3>
                        <a
                          href="tel:+917945864006"
                          className="text-gray-600 hover:text-blue-600"
                        >
                          +91 7945864006
                        </a>
                      </div>
                    </div>
                    {/* Email */}
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="p-3 rounded-full bg-blue-100 text-blue-600 flex-shrink-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.4,
                        }}
                      >
                        <Mail size={24} />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Email
                        </h3>
                        <a
                          href="mailto:contact@gohilinfotech.com"
                          className="text-gray-600 hover:text-blue-600"
                        >
                          contact@gohilinfotech.com
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedItem>

                {/* Map */}
                <AnimatedItem>
                  <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg mt-1">
                    <iframe
                      title="Office Location"
                      src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sin!4v1756182913475!5m2!1sen!2sin!6m8!1m7!1sZsCuFG28mWV8aX67HZl0vQ!2m2!1d23.12097128951909!2d72.57018322882188!3f91.67664251649275!4f17.273412650370986!5f0.7820865974627469"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </AnimatedItem>
              </div>
            </div>
          </AnimatedContainer>
        </section>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactUsPage;
