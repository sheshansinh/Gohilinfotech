import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCogs,
  FaLaptopCode,
  FaChartLine,
  FaShoppingBag,
  FaRobot,
  FaRocket,
  FaCloud,
  FaChevronRight,
  FaRegPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

// Centralized service data
// const services = [
//   {
//     id: "software-engineering",
//     icon: <FaCogs />,
//     title: "Software Engineering",
//     shortDescription:
//       "Building robust, scalable, and custom software solutions.",
//     longDescription:
//       "Our software engineering expertise covers the entire development lifecycle, from initial concept and design to deployment and ongoing maintenance. We build custom applications that are reliable, secure, and tailored to your specific business needs, ensuring a perfect fit for your business goals.",
//     features: [
//       "Custom App Development",
//       "System Integration",
//       "API Design & Development",
//       "Quality Assurance",
//     ],
//     technologies: ["C++", "Java", "Python", "Go", "Docker", "Kubernetes"],
//   },
//   {
//     id: "web-development",
//     icon: <FaLaptopCode />,
//     title: "Web Development",
//     shortDescription: "Creating stunning and responsive web applications.",
//     longDescription:
//       "We specialize in modern web development, crafting high-performance and visually appealing websites and applications. Our solutions are designed to provide an exceptional user experience on any device, with a focus on speed, security, and accessibility for a global audience.",
//     features: [
//       "Frontend & Backend Development",
//       "CMS Integration",
//       "E-commerce Platforms",
//       "Progressive Web Apps",
//     ],
//     technologies: ["React", "Next.js", "Node.js", "Django", "GraphQL"],
//   },
//   {
//     id: "data-solutions",
//     icon: <FaChartLine />,
//     title: "Data Solutions",
//     shortDescription:
//       "Leveraging data to drive intelligent business decisions.",
//     longDescription:
//       "From data warehousing to advanced analytics, we help you manage and make sense of your data. Our data solutions empower you with actionable insights, enabling you to optimize operations and gain a competitive edge in today's data-driven world.",
//     features: [
//       "Business Intelligence",
//       "Data Warehousing",
//       "ETL Pipelines",
//       "Big Data Analytics",
//     ],
//     technologies: [
//       "SQL",
//       "Snowflake",
//       "Tableau",
//       "Power BI",
//       "Python (Pandas, NumPy)",
//     ],
//   },
//   {
//     id: "ecommerce-solution",
//     icon: <FaShoppingBag />,
//     title: "eCommerce Solution",
//     shortDescription:
//       "Building powerful online stores that convert visitors into customers.",
//     longDescription:
//       "We create custom e-commerce platforms that provide a seamless shopping experience. Our solutions are secure, scalable, and equipped with features to boost sales, from integrated payment gateways to sophisticated inventory and customer relationship management.",
//     features: [
//       "Custom Storefronts",
//       "Payment Gateway Integration",
//       "Inventory Management",
//       "Security & Fraud Protection",
//     ],
//     technologies: ["Shopify", "Magento", "WooCommerce", "Stripe", "PayPal"],
//   },
//   {
//     id: "ai-automation",
//     icon: <FaRobot />,
//     title: "AI & Automation",
//     shortDescription:
//       "Implementing AI and automation to streamline your processes.",
//     longDescription:
//       "We develop intelligent systems that automate repetitive tasks, improve efficiency, and enable data-driven predictions. Our AI and machine learning solutions are designed to help your business operate smarter, faster, and more intelligently.",
//     features: [
//       "Machine Learning Models",
//       "Robotic Process Automation",
//       "Predictive Analytics",
//       "Natural Language Processing",
//     ],
//     technologies: ["TensorFlow", "PyTorch", "Python", "RPA", "Azure AI"],
//   },
//   {
//     id: "digital-marketing",
//     icon: <FaChartLine />,
//     title: "Digital Marketing",
//     shortDescription: "Boosting your online presence and growing your brand.",
//     longDescription:
//       "Our data-driven digital marketing strategies help you connect with your target audience and achieve your business goals. We specialize in creating campaigns that increase brand visibility, drive traffic, and generate high-quality leads.",
//     features: [
//       "SEO & SEM",
//       "Social Media Management",
//       "Content Strategy",
//       "Email Marketing",
//     ],
//     technologies: [
//       "Google Analytics",
//       "SEO Tools",
//       "Social Media Platforms",
//       "HubSpot",
//     ],
//   },
//   {
//     id: "digital-transformation",
//     icon: <FaRocket />,
//     title: "Digital Transformation",
//     shortDescription: "Guiding your business through its digital evolution.",
//     longDescription:
//       "We help businesses modernize their operations and leverage technology to improve efficiency, customer experience, and overall growth. Our comprehensive approach ensures a smooth transition to a more agile and innovative digital model.",
//     features: [
//       "Strategic Planning",
//       "Process Automation",
//       "Change Management",
//       "Technology Roadmap",
//     ],
//     technologies: [
//       "CRM Systems",
//       "ERP Software",
//       "Cloud Infrastructure",
//       "Agile Methodologies",
//     ],
//   },
//   {
//     id: "cloud-services",
//     icon: <FaCloud />,
//     title: "Cloud Services",
//     shortDescription: "Providing scalable and secure cloud infrastructure.",
//     longDescription:
//       "Our cloud services enable you to build, deploy, and manage applications with unprecedented flexibility and scalability. We offer solutions for migration, architecture, and management on leading cloud platforms, ensuring peak performance.",
//     features: [
//       "Cloud Migration",
//       "Infrastructure as Code",
//       "Cloud Security",
//       "Cost Optimization",
//     ],
//     technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
//   },
// ];

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost/custom-sites/gipl_backend/api/services.php?verification_key=GIPL2025SecureKey") // replace with your PHP API URL
      .then((res) => {
        if (res.data.status === "success") {
          setServices(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
      });
  }, []);
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans min-h-screen">
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-center py-20 px-4 sm:py-32">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your business with our expertise in software, data, and
            digital solutions.
          </motion.p>
        </div>

        {/* Services Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer transition-transform duration-200"
              >
                <img
                  src={`http://localhost/custom-sites/gipl_backend/${service.image}`}
                  alt={service.title}
                  className="w-20 h-20 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>
                <Link to={`/services/service-detail/${service.id}`}>
                <span className="text-blue-600 font-medium hover:underline flex items-center">
                  Learn more <FaChevronRight className="ml-1 text-xs" />
                </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16 px-6 text-white text-center mt-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Ready to build something amazing?
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Let's turn your ideas into reality with our expertise and
                passion for technology.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
      </main>
    </div>
  );
};

export default ServicesPage;
