import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  FaCogs,
  FaChevronLeft,
  FaRegPaperPlane,
  FaArrowRight,
  FaUsers,
  FaBriefcase,
  FaShoppingBag,
  FaChartLine,
  FaRegCheckCircle,
  FaLaptopCode,
  FaExternalLinkAlt,
} from "react-icons/fa";
import axios from "axios";

// Project Card Component
const ProjectCard = ({ project, variants }) => (
  <motion.div
    className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
    variants={variants}
    whileHover={{
      scale: 1.03,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    }}
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
        {project.category}
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Client:</span> {project.client}
      </p>
      <p className="text-gray-700 mb-4">{project.description}</p>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Technologies Used:</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Key Results:</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {project.results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mt-6">
        <motion.a
          href={project.link}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
        >
          View Case Study <FaExternalLinkAlt className="ml-2 text-sm" />
        </motion.a>
      </div>
    </div>
  </motion.div>
);

// Compact Project Card Component
const CompactProjectCard = ({ project, variants }) => (
  <motion.div
    className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
    variants={variants}
    whileHover={{
      scale: 1.03,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    }}
  >
    <div className="relative h-40 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>

    <div className="p-4">
      <div className="text-blue-600 text-xs font-semibold mb-1">
        {project.category}
      </div>
      <h4 className="font-bold mb-2">{project.title}</h4>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {project.description}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{project.client}</span>
        <motion.a
          href={project.link}
          whileHover={{ scale: 1.1 }}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaExternalLinkAlt />
        </motion.a>
      </div>
    </div>
  </motion.div>
);

const ServiceDetailPage = () => {
  const { id } = useParams(); // ✅ useParams must be inside the component
  const [serviceData, setServiceData] = useState(null); // ✅ hook inside component

  useEffect(() => {
    if (!id) return;

    axios
      .post(
        "http://localhost/custom-sites/gipl_backend/api/joint-services.php?verification_key=GIPL2025SecureKey",
        {
          id: id, // send the id in POST body
          verification_key: "GIPL2025SecureKey",
        },
        {
          headers: {
            "Content-Type": "application/json", // tell backend it's JSON
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success" && res.data.data.length > 0) {
          const service = res.data.data[0];

          setServiceData({
            id: service.id,
            title: service.title,
            description: service.description,
            icon: (
              <img
                src={`http://localhost/custom-sites/gipl_backend/${service.image}`}
                alt={service.title}
                className="w-20 h-20 mx-auto"
              />
            ),
            tagline: service.slug,
            ctaButtonText: "Get Started",
            subServices:
              service.service_details[0]?.sub_services.map((ss) => ({
                id: ss.id,
                title: ss.title,
                description: ss.description,
                icon: (
                  <img
                    src={`http://localhost/custom-sites/gipl_backend/${ss.image}`}
                    alt={ss.title}
                    className="w-10 h-10"
                  />
                ),
                features: [],
              })) || [],
          });
        }
      })
      .catch((err) => console.error("Error fetching service detail:", err));
  }, [id]);

  if (!serviceData) {
    return <p className="text-center py-20">Loading...</p>;
  }

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="bg-gray-50 text-gray-900 font-sans min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-center py-20 px-4 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-6xl md:text-7xl mb-6">{serviceData.icon}</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            {serviceData.title}
          </h1>
          <p className="text-lg md:text-xl max-w-4xl mx-auto opacity-90">
            {serviceData.tagline}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-8 py-3 rounded-full text-lg shadow-xl transition-colors duration-300 hover:bg-gray-100 transform hover:scale-105"
            >
              <FaRegPaperPlane className="mr-3" /> {serviceData.ctaButtonText}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content Sections */}
      <div className="container mx-auto py-16 px-4">
        {/* Back Button */}
        <Link
          to="/services"
          className="inline-flex items-center text-blue-600 font-bold mb-12"
        >
          <FaChevronLeft className="mr-2" /> Back to All Services
        </Link>

        {/* Overview Section */}
        <motion.div
          className="mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-200 pb-2">
            Overview
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
            {serviceData.description}
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          className="mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center border-b-2 border-blue-200 pb-2">
            Software Engineering Capabilities
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {serviceData.subServices.map((subService, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                variants={itemVariants}
              >
                <div className="flex items-center text-blue-600 text-3xl mb-4">
                  {subService.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">
                    {subService.title}
                  </h3>
                </div>
                <div
                  className="text-gray-600 mb-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: subService.description }}
                />
                <Link
                  to="/contact"
                  className="inline-flex items-center text-blue-600 font-semibold hover:underline transition-all duration-300 transform hover:translate-x-1"
                >
                  Know more <FaArrowRight className="ml-2 text-sm" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Final Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16 px-6 text-white text-center mt-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Ready to take the next step?
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Let's discuss how our services can drive your business forward.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-8 py-3 rounded-full text-lg shadow-xl transition-colors duration-300 hover:bg-gray-100"
              >
                <FaRegPaperPlane className="mr-3" /> Get a Free Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServiceDetailPage;
