import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaCode,
  FaMobile,
  FaCloud,
  FaChartLine,
  FaChevronRight,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaDatabase,
  FaChartBar,
  FaBrain,
  FaRobot,
  FaLock,
  FaDesktop,
  FaSitemap,
} from 'react-icons/fa';

// --- AnimatedSection Component ---
const AnimatedSection = ({ children, threshold = 0.1, className = "" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold });
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.section>
  );
};

// --- CTASection Component ---
const CTASection = ({ title, description, buttonText, buttonLink }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      ref={ref}
      className="bg-[#F4F4F4] text-[#2C3E50] py-20 px-4 text-center"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">{description}</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={buttonLink}
            className="inline-block bg-[#73CCD7] text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary shadow-lg hover:shadow-xl"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- ServiceCard Component ---
const ServiceCard = ({ service, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#27B0C4] text-white shadow-lg' : 'bg-white text-[#2C3E50] hover:bg-[#F4F4F4] shadow-md'}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`text-2xl ${isActive ? 'text-white' : 'text-[#27B0C4]'}`}>
          {service.icon}
        </div>
        <h3 className="font-semibold text-lg">{service.title}</h3>
      </div>
    </motion.div>
  );
};

// --- Main ServicesPage Component ---
const TechnologyPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Web Development",
      icon: <FaLaptopCode />,
      description: "Building modern, responsive, and high-performance websites and web applications using the latest frameworks and technologies.",
      features: ["Responsive Design", "Performance Optimization", "SEO-Friendly", "Security-First Approach"],
      technologies: ["React", "Next.js", "Node.js", "Python", "AWS"],
      process: ["Requirements Analysis", "Design & Prototyping", "Development & Testing", "Deployment & Maintenance"],
    },
    {
      title: "Mobile Applications",
      icon: <FaMobileAlt />,
      description: "Developing native and cross-platform mobile applications for iOS and Android that deliver intuitive and exceptional user experiences.",
      features: ["Cross-Platform Development", "Native Performance", "Offline Capabilities", "Push Notifications"],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      process: ["Market Research", "UX/UI Design", "Development & Testing", "App Store Deployment"],
    },
    {
      title: "DevOps",
      icon: <FaServer />,
      description: "Streamlining development and operations with continuous integration, continuous delivery (CI/CD), and automated workflows.",
      features: ["Continuous Integration", "Automated Deployment", "Infrastructure as Code", "Monitoring & Logging"],
      technologies: ["Docker", "Kubernetes", "Jenkins", "Ansible", "Terraform"],
      process: ["Workflow Assessment", "Tooling Selection", "Pipeline Implementation", "Ongoing Optimization"],
    },
    {
      title: "Cloud Solutions",
      icon: <FaCloud />,
      description: "Architecting and managing scalable, secure, and cost-effective cloud solutions on leading platforms.",
      features: ["Auto-Scaling", "High Availability", "Cost Optimization", "Security & Compliance"],
      technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
      process: ["Assessment", "Architecture Design", "Migration & Implementation", "Monitoring & Support"],
    },
    {
      title: "Platforms",
      icon: <FaSitemap />,
      description: "Creating robust and scalable software platforms tailored to your business needs, from concept to deployment.",
      features: ["Custom Architecture", "Multi-Tenant Support", "API Integration", "Scalability & Reliability"],
      technologies: ["Node.js", "Django", "Spring Boot", "GraphQL", "PostgreSQL"],
      process: ["Concept & Strategy", "Architectural Design", "Platform Development", "Launch & Evolution"],
    },
    {
      title: "Database",
      icon: <FaDatabase />,
      description: "Designing, implementing, and optimizing databases to ensure data integrity, performance, and security for your applications.",
      features: ["Schema Design", "Performance Tuning", "Data Migration", "Security & Backup"],
      technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
      process: ["Requirements Gathering", "Data Modeling", "Implementation", "Maintenance & Optimization"],
    },
    {
      title: "Big Data",
      icon: <FaChartBar />,
      description: "Processing, analyzing, and visualizing large datasets to uncover valuable insights and drive data-driven decision-making.",
      features: ["Data Pipelines", "Real-time Analytics", "ETL Processes", "Reporting & Visualization"],
      technologies: ["Hadoop", "Spark", "Kafka", "Tableau", "Power BI"],
      process: ["Data Strategy", "Data Engineering", "Data Analysis", "Insight Delivery"],
    },
    {
      title: "Machine Learning",
      icon: <FaBrain />,
      description: "Building intelligent systems and predictive models that learn from data to automate tasks and solve complex problems.",
      features: ["Predictive Analytics", "Natural Language Processing", "Image Recognition", "Model Training & Deployment"],
      technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Keras"],
      process: ["Problem Definition", "Data Preparation", "Model Development", "Deployment & Monitoring"],
    },
    {
      title: "Automation Tools",
      icon: <FaRobot />,
      description: "Implementing automation tools and scripts to improve efficiency, reduce manual effort, and minimize errors across your systems.",
      features: ["Robotic Process Automation (RPA)", "Automated Testing", "Workflow Automation", "Custom Scripting"],
      technologies: ["UiPath", "Selenium", "Ansible", "Python", "PowerShell"],
      process: ["Process Audit", "Solution Design", "Development & Integration", "Monitoring & Support"],
    },
    {
      title: "Information Security",
      icon: <FaLock />,
      description: "Protecting your digital assets with comprehensive security solutions, including vulnerability assessments and threat mitigation.",
      features: ["Vulnerability Scans", "Penetration Testing", "Security Audits", "Incident Response"],
      technologies: ["OWASP", "Metasploit", "Wireshark", "Nmap", "Firewalls"],
      process: ["Security Assessment", "Threat Modeling", "Remediation Planning", "Continuous Monitoring"],
    },
    {
      title: "Desktop",
      icon: <FaDesktop />,
      description: "Developing powerful and reliable desktop applications for Windows, macOS, and Linux that meet your specific business requirements.",
      features: ["Offline Functionality", "Cross-Platform Support", "Performance Optimization", "Intuitive UI/UX"],
      technologies: ["Electron", "C# / .NET", "Java", "Python", "Qt"],
      process: ["Requirements Gathering", "UI/UI Design", "Development & Testing", "Deployment & Updates"],
    },
  ];

  const processSteps = ["Discover", "Design", "Develop", "Deploy"];

  return (
    <div className="bg-[#F4F4F4] text-[#2C3E50] font-sans pt-16 mt-3">
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="src/assets/WhatsApp Image 2025-09-11 at 2.52.02 PM.jpeg" 
          alt="Technology team collaborating" 
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-opacity-80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto bg-[#00000096] rounded-2xl p-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Our <span className="text-[#27B0C4]">Technology</span> Services
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Comprehensive solutions designed to accelerate your business growth and digital transformation.
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10"
          >
            <Link
              to="/contact"
              className="inline-block bg-[#73CCD7] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-[#27B0C4] transition-all duration-300"
            >
              Start Your Project
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>

        {/* Services Navigation */}
        <AnimatedSection className="py-8 px-4 sticky top-0 z-10 bg-[#FFFFFF] shadow-md" threshold={0.05}>
          <div className="container mx-auto">
            <div className="flex overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex space-x-3">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    service={service}
                    isActive={activeTab === index}
                    onClick={() => setActiveTab(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Content */}
        <AnimatedSection className="py-16 px-4">
          <div className="container mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 md:p-10 rounded-2xl shadow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  {/* Left Column: Description & Features */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl text-[#27B0C4]">{services[activeTab].icon}</div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50]">{services[activeTab].title}</h2>
                    </div>
                    <p className="text-[#7A7A7A] text-lg leading-relaxed mb-8">{services[activeTab].description}</p>
                    
                    <h3 className="text-2xl font-semibold mb-5 text-[#2C3E50] border-b border-[#F4F4F4] pb-2">Key Features</h3>
                    <ul className="space-y-3 mb-10">
                      {services[activeTab].features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-[#7A7A7A]">
                          <div className="text-[#27B0C4] mt-1">
                            <FaChevronRight className="text-sm" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Technologies & Process */}
                  <div className="lg:pl-8 lg:border-l lg:border-[#F4F4F4]">
                    <h3 className="text-2xl font-semibold mb-5 text-[#2C3E50] border-b border-[#F4F4F4] pb-2">Technologies We Use</h3>
                    <div className="flex flex-wrap gap-3 mb-10">
                      {services[activeTab].technologies.map((tech) => (
                        <span key={tech} className="bg-[#73CCD7] text-[#2C3E50] px-4 py-2 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-semibold mb-5 text-[#2C3E50] border-b border-[#F4F4F4] pb-2">Our Process</h3>
                    <div className="space-y-5">
                      {services[activeTab].process.map((step, index) => (
                        <div key={step} className="flex items-start gap-5">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#27B0C4] text-white font-bold text-lg flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg text-[#2C3E50]">Phase {index + 1}</h4>
                            <p className="text-[#7A7A7A]">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Process Overview */}
        <AnimatedSection className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C3E50]">Our Proven Process</h2>
              <p className="text-[#7A7A7A] text-lg">
                We follow a structured methodology to ensure successful project delivery every time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={step}
                  whileHover={{ y: -8 }}
                  className="bg-[#F4F4F4] p-6 rounded-xl shadow-md border border-[#F4F4F4] relative overflow-hidden"
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[#27B0C4] text-white text-2xl font-bold mb-5">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#2C3E50]">{step}</h3>
                  <p className="text-[#7A7A7A] text-sm leading-relaxed">
                    {step === "Discover" && "We analyze your requirements, define project scope, and establish success metrics."}
                    {step === "Design" && "We create wireframes, prototypes, and design systems that align with your brand."}
                    {step === "Develop" && "We build your solution using best practices, modern technologies, and agile methodologies."}
                    {step === "Deploy" && "We launch your project, provide training and documentation, and offer ongoing support."}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <CTASection
          title="Ready to Transform Your Business?"
          description="Let's discuss your requirements and create a custom solution that drives results."
          buttonText="Get Free Consultation"
          buttonLink="/contact"
        />
      </main>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TechnologyPage;