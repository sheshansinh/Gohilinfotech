// src/components/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaCode, 
  FaMobile, 
  FaCloud, 
  FaChartLine, 
  FaArrowLeft, 
  FaArrowRight, 
  FaEnvelope, 
  FaCheckCircle,
  FaRocket,
  FaUsers,
  FaAward,
  FaLightbulb,
  FaStar,
  FaPlay
} from 'react-icons/fa';

// Helper component for animated sections
const AnimatedSection = ({ children, threshold = 0.1, className = "" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold });
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
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

// Hero Slider Component
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Innovation Meets Excellence",
      subtitle: "Transforming Ideas into Digital Reality",
      description: "We create cutting-edge solutions that drive business growth and digital transformation.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
      cta: "Discover More",
      highlight: "Digital Excellence"
    },
    {
      id: 2,
      title: "Future-Ready Technology",
      subtitle: "Building Tomorrow's Solutions Today",
      description: "Leverage the power of modern technology to stay ahead of the competition.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2125&q=80",
      cta: "Get Started",
      highlight: "Advanced Tech"
    },
    {
      id: 3,
      title: "Digital Excellence",
      subtitle: "Your Success is Our Mission",
      description: "Partner with us to unlock your business potential with innovative IT solutions.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Contact Us",
      highlight: "Success Driven"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('${slides[currentSlide].image}')`
          }}
        />
      </AnimatePresence>

      <div className="relative z-20 h-full flex items-center justify-center text-center text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {slides[currentSlide].highlight}
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.h2 
                className="text-2xl md:text-4xl mb-8 text-cyan-300 font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {slides[currentSlide].description}
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <Link to="/contact">
                  <motion.button
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {slides[currentSlide].cta}
                  </motion.button>
                </Link>
                <motion.button
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay className="text-cyan-400" />
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 group"
      >
        <FaArrowLeft size={20} className="group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 group"
      >
        <FaArrowRight size={20} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative transition-all duration-300 ${
              currentSlide === index ? 'w-12 h-3' : 'w-3 h-3'
            }`}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500' 
                : 'bg-white/50 hover:bg-white/75'
            }`} />
          </button>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </section>
  );
};

// Stats Counter Component
const StatsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [counts, setCounts] = useState({ projects: 0, clients: 0, experience: 0, satisfaction: 0 });

  const stats = [
    { number: 500, label: "Projects Completed", suffix: "+", icon: FaRocket, key: "projects" },
    { number: 200, label: "Happy Clients", suffix: "+", icon: FaUsers, key: "clients" },
    { number: 8, label: "Years Experience", suffix: "+", icon: FaAward, key: "experience" },
    { number: 99, label: "Client Satisfaction", suffix: "%", icon: FaStar, key: "satisfaction" },
  ];

  useEffect(() => {
    if (inView) {
      stats.forEach((stat) => {
        let start = 0;
        const end = stat.number;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCounts(prev => ({ ...prev, [stat.key]: end }));
            clearInterval(timer);
          } else {
            setCounts(prev => ({ ...prev, [stat.key]: Math.floor(start) }));
          }
        }, 16);
      });
    }
  }, [inView]);

  return (
    <AnimatedSection className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            ref={ref}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            Our Success in Numbers
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're proud of our achievements and the trust our clients place in us.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Icon className="text-4xl text-cyan-400 mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {counts[stat.key]}{stat.suffix}
                </div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};

// About Preview Component
const AboutPreview = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <AnimatedSection className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
              About Gohil Infotech
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pioneering Digital Innovation Since 2016
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We are a passionate team of technology enthusiasts dedicated to transforming businesses through innovative digital solutions. Our expertise spans across web development, mobile applications, cloud services, and digital marketing.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Expert team with 8+ years of experience",
                "500+ successful projects delivered",
                "24/7 support and maintenance",
                "Cutting-edge technology solutions"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/about">
              <motion.button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Us
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative z-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 text-white">
              <FaLightbulb className="text-6xl mb-6 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                To empower businesses with innovative technology solutions that drive growth, efficiency, and digital transformation in an ever-evolving digital landscape.
              </p>
            </div>
            <div className="absolute top-4 left-4 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Services Grid Component
const ServicesGrid = () => {
  const services = [
    {
      icon: <FaCode />,
      title: "Web Development",
      description: "Modern, responsive websites built with the latest technologies for optimal performance and user experience.",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Modern Frameworks"],
      link: "/services",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaMobile />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
      features: ["iOS & Android", "Cross-Platform", "User-Friendly", "Performance Optimized"],
      link: "/services",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaCloud />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services to optimize your business operations and reduce costs.",
      features: ["Cloud Migration", "Scalable Infrastructure", "Cost Effective", "24/7 Monitoring"],
      link: "/services",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <FaChartLine />,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies to grow your online presence and reach your target audience effectively.",
      features: ["SEO Optimization", "Social Media", "Content Strategy", "Analytics & Reporting"],
      link: "/services",
      color: "from-orange-500 to-red-500"
    },
  ];

  return (
    <AnimatedSection className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From web development to digital marketing, we provide end-to-end solutions designed to accelerate your business growth and digital transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              <div className="p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.color} text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link to={service.link} className="text-blue-600 font-semibold hover:text-primary transition-colors inline-flex items-center gap-2 group-hover:gap-3">
                  Learn More 
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// Enhanced Testimonials Component
const TestimonialsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const testimonials = [
    {
      quote: "Gohilinfotech transformed our business with their innovative solutions. Their team is professional and highly skilled!",
      name: "Alex Johnson",
      title: "CEO, TechSolutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      company: "TechSolutions Inc."
    },
    {
      quote: "Working with them was an absolute pleasure. They delivered our project ahead of schedule and exceeded all expectations.",
      name: "Sarah Lee",
      title: "Founder, Innovate Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      company: "Innovate Inc."
    },
    {
      quote: "The best tech partner we've ever had. Their support and expertise are unmatched. Highly recommend!",
      name: "Mike Rodriguez",
      title: "CTO, GrowthCo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      company: "GrowthCo Ltd."
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
            Client Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our amazing clients have to say about working with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              ref={ref}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="flex mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-3xl text-gray-700 font-light italic mb-8 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div className="flex items-center gap-6">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover shadow-lg"
                />
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].title}
                  </p>
                  <p className="text-blue-600 text-sm font-medium">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <FaArrowLeft className="text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <FaArrowRight className="text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Client Logos Carousel
const ClientLogos = () => {
  const clientLogos = [
    { name: "TechCorp", logo: "TC" },
    { name: "StartupXYZ", logo: "SX" },
    { name: "GrowthCo", logo: "GC" },
    { name: "InnovateInc", logo: "II" },
    { name: "FutureTech", logo: "FT" },
    { name: "DataSync", logo: "DS" },
    { name: "CloudFirst", logo: "CF" },
    { name: "NextGen", logo: "NG" },
  ];

  return (
    <AnimatedSection className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">
            Trusted by Leading Companies
          </p>
        </div>
        
        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: '-100%' }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{ width: 'max-content' }}
          >
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-bold text-lg group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  {client.logo}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Technology Showcase Component
const TechShowcase = () => {
  const technologies = [
    { name: 'React', icon: FaCode, color: 'text-blue-500' },
    { name: 'Node.js', icon: FaMobile, color: 'text-green-500' },
    { name: 'Cloud', icon: FaCloud, color: 'text-cyan-500' },
    { name: 'Analytics', icon: FaChartLine, color: 'text-purple-500' },
    { name: 'Mobile', icon: FaMobile, color: 'text-orange-500' },
    { name: 'Security', icon: FaCode, color: 'text-red-500' },
  ];

  return (
    <AnimatedSection className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto text-center">
        <div className="mb-16">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
            Our Technology Stack
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cutting-Edge Technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We leverage the latest and most reliable technologies to deliver exceptional results that stand the test of time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Icon className={`text-4xl ${tech.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                  {tech.name}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      
      // Reset after 5 seconds for demo
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      className="relative py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold mb-8 inline-block border border-white/20">
              Stay Connected
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Get the Latest Tech Insights
            </h2>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
              Subscribe to our newsletter and receive exclusive updates, industry insights, and expert tips delivered straight to your inbox.
            </p>
          </motion.div>

          <motion.div
            className="max-w-lg mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 text-lg"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe to Newsletter'
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl py-8 px-6 border border-white/20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-green-400 mb-4"
                >
                  <FaCheckCircle className="text-4xl mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h3>
                <p className="text-gray-200">Thank you for subscribing to our newsletter. You'll receive amazing content soon!</p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: "🚀", title: "Weekly Insights", desc: "Latest tech trends and innovations" },
              { icon: "🛡️", title: "No Spam Policy", desc: "We respect your inbox and privacy" },
              { icon: "📧", title: "Easy Unsubscribe", desc: "Leave anytime with one click" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-sm opacity-75">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Call to Action Section
const CTASection = ({ title, description, buttonText, buttonLink }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/50 to-purple-600/50"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-100 mb-12 opacity-90 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to={buttonLink}>
              <motion.button
                className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                {buttonText}
              </motion.button>
            </Link>
            
            <Link to="/portfolio">
              <motion.button
                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Main HomePage Component
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900 font-sans overflow-x-hidden">
      <main>
        {/* Hero Slider - New Addition */}
        <HeroSlider />

        {/* Client Logos */}
        <ClientLogos />

        {/* Stats Section */}
        <StatsSection />

        {/* About Preview */}
        <AboutPreview />

        {/* Services Grid */}
        <ServicesGrid />
        
        {/* Testimonials */}
        <TestimonialsShowcase />

        {/* Technology Showcase */}
        <TechShowcase />

        {/* Newsletter Section - New Addition */}
        <Newsletter />

        {/* CTA Section */}
        <CTASection
          title="Ready to Transform Your Business?"
          description="Let's collaborate to turn your vision into reality with cutting-edge technology solutions that drive real results."
          buttonText="Start Your Project"
          buttonLink="/contact"
        />
      </main>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;