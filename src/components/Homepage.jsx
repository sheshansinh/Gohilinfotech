import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import IndustriesSection from './IndustriesSection';
import SolutionsSection from './EngineeringSolutions';
import ProjectInMindCTA from './ProjectInMindCTA';
import PortfolioSection from './PortfolioSection';
import ShuffleHero from './ShuffleHero';
import AnimatedStats from './AnimatedStats';
import ProductsShowcase from './ProductsShowcase';
// --- Dependency-free Custom Hooks and Components ---

// Simple animation hook to detect if an element is in view
const useInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options]);
  return [setRef, inView];
};

// Simple SVG Icons
const IconCode = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
const IconMobile = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM6 4a1 1 0 011-1h6a1 1 0 011 1v10H6V4zm2 12a1 1 0 100 2h4a1 1 0 100-2H8z"
      clipRule="evenodd"
    />
  </svg>
);
const IconCloud = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
  </svg>
);
const IconChart = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);
const IconArrowRight = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
const IconEnvelope = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);
const IconPlay = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>
);

// Image components for the Business Categories section
const StartupImage = () => (
  <img
    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Startup"
    className="w-full h-full object-cover rounded-md"
  />
);
const EnterpriseImage = () => (
  <img
    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Enterprise"
    className="w-full h-full object-cover rounded-md"
  />
);
const AgencyImage = () => (
  <img
    src="https://images.unsplash.com/photo-1596526110998-6369f0674254?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Agency"
    className="w-full h-full object-cover rounded-md"
  />
);

// Reusable SVG logo component
const Logo = ({ path }) => (
  <svg className="w-10 h-10 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
    <path d={path} />
  </svg>
);

// --- Main Page Sections ---


const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Envelope Icon
  const IconEnvelope = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
      className="w-5 h-5"
    >
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );

  const newsletterImage = 'src/assets/GIPL_Logo1.png';

  return (
    <section className="bg-gradient-to-br from-[#1C2852] to-[#2C3B6E] text-white py-16 px-4 relative overflow-hidden font-sans">
      {/* Subtle blur overlay */}
      <div className="absolute inset-0 bg-blue-950/20 backdrop-blur-sm"></div>

      {/* Floating blobs */}
      <motion.div
        className="absolute top-20 left-10 w-6 h-6 bg-[#E67E22] rounded-full opacity-40"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-12 w-5 h-5 bg-[#27B0C4] rounded-full opacity-40"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-4 h-4 bg-[#73CCD7] rounded-full opacity-40"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <motion.div
        ref={ref}
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: text + form */}
          <div className="lg:w-1/2 flex-1 text-center lg:text-left">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
              variants={itemVariants}
            >
              Get the Latest Tech{' '}
              <span className="text-[#E67E22]">Insights</span>
            </motion.h2>
            <motion.p
              className="text-[#F4F4F4] text-base md:text-lg mb-8"
              variants={itemVariants}
            >
              Subscribe to our newsletter and never miss updates on
              cutting-edge technologies and industry trends.
            </motion.p>

            <motion.div
              className="w-full max-w-md mx-auto lg:mx-0"
              variants={itemVariants}
            >
              <div className="bg-[#2C3E50] rounded-xl p-6 md:p-8 border border-[#27B0C4]/30">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#73CCD7]">
                      <IconEnvelope />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3 bg-[#2C3E50] border border-[#27B0C4]/50 rounded-lg text-white placeholder-[#7A7A7A] focus:outline-none focus:ring-2 focus:ring-[#E67E22] transition-all"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-[#E67E22] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#d67118] transition-all duration-300 flex items-center justify-center gap-2"
                    disabled={isSubscribed}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubscribed ? (
                      '✓ Subscribed!'
                    ) : (
                      <>
                        Subscribe Now{' '}
                        <ChevronRightIcon className="h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Right: professional graphic */}
          <motion.div
            className="lg:w-1/2 flex justify-center items-center relative p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            {/* Gradient rings for depth */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#27B0C4]/20 to-transparent blur-3xl"></div>
            <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-[#E67E22]/20 to-transparent blur-2xl"></div>

            {/* Main image */}
            <img
              src={newsletterImage}
              alt="Tech Insights Graphic"
              className="w-full h-auto max-w-lg rounded-2xl shadow-2xl object-cover z-10 relative border border-white/10"
              style={{ maxHeight: '380px' }}
            />

            {/* Accent mini-cards */}
            <motion.div
              className="absolute -top-6 -right-8 w-20 h-20 bg-white rounded-xl overflow-hidden shadow-xl z-20 border border-gray-200"
              initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200"
                alt="AI Technology"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -left-8 w-24 h-24 bg-white rounded-xl overflow-hidden shadow-xl z-20 border border-gray-200"
              initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=200"
                alt="Data Visualization"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-6 w-16 h-16 bg-white rounded-full overflow-hidden shadow-lg z-20 border-2 border-[#E67E22]"
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <img
                src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=200"
                alt="Cloud Computing"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const SlidingImageSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Team Collaboration',
      description:
        'Empowering teams to work together seamlessly across all platforms and technologies.',
      features: [
        'Real-time Collaboration',
        'Cloud Integration',
        'Secure Workflows',
      ],
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
      title: 'Data Analytics',
      description:
        'Transform your business data into actionable insights with our advanced analytics solutions.',
      features: [
        'Advanced Analytics',
        'Real-time Reports',
        'Predictive Modeling',
      ],
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Digital Innovation',
      description:
        'Stay ahead of the competition with cutting-edge technology solutions tailored for your business.',
      features: ['AI Integration', 'Automation', 'Scalable Solutions'],
    },
  ];

  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);
  const [ref, inView] = useInView();

  // Auto slide functionality
  const startAutoSlide = () => {
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval.current);
  };

  useEffect(() => {
    if (inView) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [inView, slides.length]);

  // Manual navigation
  const goToSlide = (index) => {
    stopAutoSlide();
    setCurrentSlide(index);
    setTimeout(startAutoSlide, 5000);
  };

  const goToNextSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(startAutoSlide, 5000);
  };

  const goToPrevSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(startAutoSlide, 5000);
  };

  return (
    <section
      ref={ref}
      className={`py-20 px-4 bg-white transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="flex w-full h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="flex-shrink-0 w-full h-full relative"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="transition-all duration-600">
              <h3 className="text-4xl font-bold text-primary mb-4">
                How We Work
                </h3>
              <h4 className="text-2xl font-bold text-[#27B0C4] mb-4">
                {slides[currentSlide].title}
              </h4>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {slides[currentSlide].description}
              </p>
              <div className="space-y-3 mb-8">
                {slides[currentSlide].features.map((feature, index) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#E67E22] rounded-full" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href="/demo"
                  className="mt-1 inline-flex items-center bg-[#73CCD7] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#27B0C4] hover:shadow-lg transform hover:scale-105"
                >
                  <IconPlay /> Watch Demo
                </a>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechShowcase = () => {
  const technologies = [
    {
      name: 'React',
      icon: '⚛️',
      color: 'text-[#27B0C4]',
      description:
        'Modern, component-based UI library for building interactive user interfaces',
    },
    {
      name: 'Node.js',
      icon: '🟢',
      color: 'text-green-500',
      description:
        "JavaScript runtime built on Chrome's V8 engine for server-side applications",
    },
    {
      name: 'Python',
      icon: '🐍',
      color: 'text-yellow-500',
      description:
        'Versatile programming language known for its readability and extensive libraries',
    },
    {
      name: 'AWS',
      icon: '☁️',
      color: 'text-orange-500',
      description:
        'Comprehensive cloud platform offering reliable, scalable cloud computing services',
    },
    {
      name: 'Docker',
      icon: '🐳',
      color: 'text-[#73CCD7]',
      description:
        'Platform for developing, shipping, and running applications in containers',
    },
    {
      name: 'Git',
      icon: '📚',
      color: 'text-red-500',
      description:
        'Distributed version control system for tracking changes in source code',
    },
    {
      name: 'MongoDB',
      icon: '🗄️',
      color: 'text-green-600',
      description:
        'NoSQL document database designed for ease of development and scaling',
    },
    {
      name: 'JavaScript',
      icon: '💛',
      color: 'text-yellow-400',
      description:
        'High-level programming language that conforms to the ECMAScript specification',
    },
  ];

  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);
  const [ref, inView] = useInView();

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector('.tech-card').offsetWidth;
      const currentScroll = sliderRef.current.scrollLeft;
      const maxScroll =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

      if (currentScroll >= maxScroll - 5) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
      }
    }
  };

  const startAutoSlide = () => {
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    autoSlideInterval.current = setInterval(scrollRight, 3500);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval.current);
  };

  useEffect(() => {
    if (inView) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [inView]);

  const handleManualScroll = (direction) => {
    stopAutoSlide();
    if (direction === 'left') {
      const cardWidth = sliderRef.current.querySelector('.tech-card').offsetWidth;
      sliderRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    } else {
      scrollRight();
    }
    setTimeout(startAutoSlide, 5000);
  };

  return (
    <section
      ref={ref}
      className={`py-20 bg-white transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="container mx-auto ">
        <div className="text-center mb-2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
            Technologies We Use
          </h2>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable, and
            high-performance solutions.
          </p>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-0 p-8"
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
            onTouchStart={stopAutoSlide}
            onTouchEnd={startAutoSlide}
          >
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="tech-card flex-shrink-0 w-72 p-6 bg-[#F4F4F4] rounded-xl shadow-lg border border-[#F4F4F4] snap-start transition-transform duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="text-5xl mb-4 text-center">{tech.icon}</div>
                <h3 className={`text-xl font-bold text-center mb-2 text-[#2C3E50]`}>
                  {tech.name}
                </h3>
                <p className="text-[#7A7A7A] text-sm text-center">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleManualScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#7A7A7A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => handleManualScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#7A7A7A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="text-center">
          <a
            href="/technologies"
            className="mt-1 inline-flex items-center bg-[#73CCD7] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#27B0C4] hover:shadow-lg transform hover:scale-105"
          >
            Explore All Technologies
            <IconArrowRight />
          </a>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

const BusinessCategoriesSection = () => {
  const [activeTab, setActiveTab] = useState('startups');
  const categories = {
    startups: {
      title: 'Startups',
      description:
        'Empowering startups to reach business goals while optimizing efficiency.',
      services: [
        { icon: '🚀', name: 'MVP Development' },
        { icon: '🎨', name: 'UI/UX Design' },
        { icon: '☁️', name: 'SaaS Development' },
        { icon: '📈', name: 'Product Development' },
      ],
      buttonText: 'Get Details',
    },
    enterprises: {
      title: 'Enterprises',
      description: 'Comprehensive solutions designed to scale and drive transformation.',
      services: [
        { icon: '🛡️', name: 'Enterprise Security' },
        { icon: '🗄️', name: 'Data Management' },
        { icon: '☁️', name: 'Cloud Migration' },
        { icon: '👥', name: 'Team Collaboration' },
      ],
      buttonText: 'Explore Solutions',
    },
    agencies: {
      title: 'Agencies',
      description:
        'Specialized tools for agencies to deliver exceptional results efficiently.',
      services: [
        { icon: '📊', name: 'Analytics Dashboard' },
        { icon: '👤', name: 'Client Management' },
        { icon: '🏷️', name: 'White Label Solutions' },
        { icon: '📈', name: 'Performance Tracking' },
      ],
      buttonText: 'Partner With Us',
    },
  };
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`py-10 px-4 bg-[#F4F4F4] transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="w-full md:w-[70%] max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#2C3E50] mb-3">
            Smart Solutions for Sustainable Business Growth
          </h2>
          <p className="text-lg text-[#7A7A7A] max-w-2xl mx-auto">
            With the right tech and people, we help businesses reach their
            revenue goals.
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center mb-4 gap-2 sm:gap-4">
            {Object.keys(categories).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full transition-all duration-300 capitalize text-1xl font-bold ${
                  activeTab === key
                    ? 'bg-[#E67E22] text-white shadow-lg'
                    : 'bg-white text-[#7A7A7A] hover:text-[#E67E22]'
                }`}
              >
                {categories[key].title}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-10 transition-all duration-600">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-[#2C3E50] mb-3">
                {categories[activeTab].title}
              </h3>
              <p className="text-[#7A7A7A] mb-6 text-lg leading-relaxed">
                {categories[activeTab].description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {categories[activeTab].services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center gap-3 p-3 bg-[#F4F4F4] rounded-lg hover:bg-[#73CCD7]/20 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded flex items-center justify-center text-lg flex-shrink-0" style={{ color: '#2C3E50' }}>
                      {service.icon}
                    </div>
                    <span className="font-medium text-[#2C3E50] text-base">
                      {service.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className='flex justify-center'>
              <a
                href="/contact"
                className="mt-1 inline-flex items-center bg-[#73CCD7] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#27B0C4] hover:shadow-lg transform hover:scale-105"
              >
                {categories[activeTab].buttonText}
                <ChevronRightIcon className="h-5 w-5" />
              </a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-80 h-80 bg-gradient-to-br from-[#27B0C4] to-[#73CCD7] rounded-lg p-2">
                <div className="w-full h-full bg-white rounded-md flex items-center justify-center p-1">
                  <div className="text-center w-full h-full">
                    {activeTab === 'startups' && <StartupImage />}
                    {activeTab === 'enterprises' && <EnterpriseImage />}
                    {activeTab === 'agencies' && <AgencyImage />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Service Card Component
const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-[#F4F4F4] p-8 rounded-lg shadow-lg text-center flex-shrink-0 w-80 lg:w-96 snap-start">
    <div className="text-4xl text-[#27B0C4] mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#73CCD7]/20">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold mb-2 text-[#2C3E50]">{title}</h3>
    <p className="text-[#7A7A7A] mb-4">{description}</p>
  </div>
);

// New Services Slider Component
const ServicesCardsSlider = () => {
  const services = [
    {
      icon: <IconCode />,
      title: 'Web Development',
      description:
        'Modern, responsive websites built with the latest technologies for optimal performance.',
    },
    {
      icon: <IconMobile />,
      title: 'Mobile Apps',
      description:
        'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    },
    {
      icon: <IconCloud />,
      title: 'Cloud Solutions',
      description:
        'Scalable cloud infrastructure and migration services to optimize your business operations.',
    },
    {
      icon: <IconChart />,
      title: 'Digital Marketing',
      description:
        'Data-driven marketing strategies to grow your online presence and reach your target audience.',
    },
    {
      icon: <IconCode />,
      title: 'Custom Software',
      description:
        'Tailored software solutions to meet your unique business needs and challenges.',
    },
    {
      icon: <IconChart />,
      title: 'UI/UX Design',
      description:
        'Intuitive and beautiful user interfaces that enhance user satisfaction and engagement.',
    },
  ];

  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);
  const [ref, inView] = useInView();

  // Function to scroll to the next slide
  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector('.flex-shrink-0').offsetWidth;
      const currentScroll = sliderRef.current.scrollLeft;
      const maxScroll =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

      if (currentScroll >= maxScroll - 5) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' }); // 24px is tailwind's `gap-6`
      }
    }
  };

  // Function to handle auto-sliding
  const startAutoSlide = () => {
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    autoSlideInterval.current = setInterval(scrollRight, 4000);
  };

  // Function to stop auto-sliding
  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval.current);
  };

  useEffect(() => {
    if (inView) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [inView]);

  const handleManualScroll = (direction) => {
    stopAutoSlide();
    if (direction === 'left') {
      const cardWidth =
        sliderRef.current.querySelector('.flex-shrink-0').offsetWidth;
      sliderRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    } else {
      scrollRight();
    }
    setTimeout(startAutoSlide, 5000); // Resume auto-slide after a delay
  };

  return (
    <section
      ref={ref}
      className={` bg-white py-20 px-4 text-center transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Our Services</h2>
        <p className="text-[#7A7A7A] text-lg mb-6 max-w-2xl mx-auto">
          Comprehensive technology solutions designed to accelerate your
          business growth and digital transformation.
        </p>
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-0 p-5"
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
            onTouchStart={stopAutoSlide}
            onTouchEnd={startAutoSlide}
          >
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <button
            onClick={() => handleManualScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#7A7A7A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => handleManualScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#7A7A7A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <a
          href="/services"
          className="mt-6 inline-flex items-center bg-[#73CCD7] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#27B0C4] hover:shadow-lg transform hover:scale-105"
        >
          Explore All Services
          <IconArrowRight />
        </a>
      </div>
    </section>
  );
};

const TestimonialCardsSlider = () => {
  const testimonials = [
    {
      quote:
        "GVOICE's dashboard shows me exactly which products are selling best each day. The weight-based billing feature is perfect for my grocery items, and the automatic stock alerts help me reorder on time. My billing process is now 50% faster!.",
      name: 'Rajesh Kumar',
      title: 'Kumar General Store, Delhi',
      avatar: 'RK',
      rating: 5,
    },
    {
      quote:
        "The invoice management with image previews is amazing! I can quickly find items while billing customers. The Excel export feature helps me track my monthly sales easily. The HR attendance system keeps my staff punctual too.",
      name: 'Priya Sharma',
      title: 'Boutique owner, Fashion retail',
      avatar: 'PS',
      rating: 5,
    },
    {
      quote:
        'Managing my staff attendance and salary calculations was a headache before GVOICE. Now everything is automated - punch-in/out tracking, bonus calculations, even salary slip generation. It saves me 5 hours every month!',
      name: 'Raj Patel',
      title: 'Store owner, Electronics retail',
      avatar: 'RP',
      rating: 5,
    },
    {
      quote:
        'The best part is the customer support. They helped me set up everything remotely and trained my staff. Truly professional service.',
      name: 'Sunita Patel',
      title: 'Patel Medical Store, Ahmedabad',
      avatar: 'SP',
      rating: 5,
    },
    // Add more testimonials as needed
  ];

  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);
  const [ref, inView] = useInView();

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector('.testimonial-card').offsetWidth;
      const currentScroll = sliderRef.current.scrollLeft;
      const maxScroll =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

      if (currentScroll >= maxScroll - 5) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' }); // 24px is tailwind's `gap-6`
      }
    }
  };

  const startAutoSlide = () => {
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    autoSlideInterval.current = setInterval(scrollRight, 4000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval.current);
  };

  useEffect(() => {
    if (inView) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [inView]);

  const handleManualScroll = (direction) => {
    stopAutoSlide();
    if (direction === 'left') {
      const cardWidth =
        sliderRef.current.querySelector('.testimonial-card').offsetWidth;
      sliderRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    } else {
      scrollRight();
    }
    setTimeout(startAutoSlide, 5000); // Resume auto-slide after a delay
  };

  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="text-[#E67E22]">★</span>);
    }
    return <div className="flex gap-1 mb-4">{stars}</div>;
  };

  return (
    <section
      ref={ref}
      className={`py-20 px-4 bg-[#F4F4F4] transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="container mx-auto ">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-2">
            Loved by 15,000+ Indian Retailers
          </h2>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            See what our customers have to say about their experience with our
            POS system.
          </p>
        </div>
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-0"
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
            onTouchStart={stopAutoSlide}
            onTouchEnd={startAutoSlide}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card flex-shrink-0 w-80 lg:w-96 p-8 bg-white rounded-lg shadow-lg border border-[#F4F4F4] snap-start"
              >
                <StarRating rating={testimonial.rating} />
                <p className="text-base text-[#7A7A7A] italic mb-6 flex-grow overflow-y-auto">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[#F4F4F4]">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#27B0C4] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#2C3E50]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[#7A7A7A]">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleManualScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-[#F4F4F4] transition-colors hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#7A7A7A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => handleManualScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-[#F4F4F4] transition-colors hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#7A7A7A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
    </section>
  );
};

const CTASection = ({ title, description, buttonText, buttonLink }) => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`bg-[#F4F4F4] text-[#2C3E50] py-20 px-4 text-center transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="container mx-auto ]">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-8 opacity-90">{description}</p>
        <a
          href={buttonLink}
          className="inline-block bg-[#73CCD7] text-[#ffffff] px-10 py-4 rounded-full font-semibold text-lg transition-colors duration-300 hover:bg-[#27B0C4] transform hover:scale-105"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
};

// --- Main HomePage Component ---

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clientLogos = [
    'TechCorp',
    'StartupXYZ',
    'GrowthCo',
    'InnovateInc',
    'FutureTech',
  ];

  return (
    <div className="bg-[#F4F4F4] text-[#2C3E50] font-sans">
      <main>
        <ShuffleHero />

        <ServicesCardsSlider />

        <AnimatedStats/>

        <ProductsShowcase/>

        <section className="py-12 bg-white px-4">
          <div className="container mx-auto text-center">
            <p className="text-[#7A7A7A] text-sm uppercase tracking-wider font-semibold mb-4">
              Trusted by Leading Companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
              {clientLogos.map((logo, index) => (
                <div
                  key={index}
                  className="text-[#7A7A7A] font-bold text-xl md:text-2xl opacity-75 hover:opacity-100 transition-opacity transform hover:scale-110 cursor-pointer"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <IndustriesSection />
        
        <TestimonialCardsSlider />
        
        <ProjectInMindCTA />

        <TechShowcase />

        <BusinessCategoriesSection />

        <SlidingImageSection />

         <PortfolioSection /> 
         
         <SolutionsSection />

        <section className="my-1 ">
          
        </section>  
       
        

        
        <CTASection
          title="Ready to Transform Your Business?"
          description="Let's discuss how we can help you achieve your digital goals with our expert team and proven solutions."
          buttonText="Start Your Project"
          buttonLink="/contact"
        />
        
         <NewsletterSection />

      </main>
    </div>
  );
};

export default HomePage;
