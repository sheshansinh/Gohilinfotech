import React, { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const industriesData = [
  {
    title: 'HEALTHCARE',
    description: 'Better Care, Better Outcomes',
    hoverDescription: 'We provide cutting-edge healthcare solutions that improve patient care and operational efficiency for medical institutions.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-indigo-950',
    direction: 'fromBottom'
  },
  {
    title: 'LOGISTICS & TRANSPORT',
    description: 'Optimized Logistics',
    hoverDescription: 'Our logistics software solutions streamline operations, reduce costs, and enhance supply chain visibility.',
    image: 'https://images.unsplash.com/photo-1626025439404-585352358872?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-slate-900',
    direction: 'fromTop'
  },
  {
    title: 'BANKING & FINANCE',
    description: 'Secure, Reliable. Scalable',
    hoverDescription: 'We develop secure financial systems that ensure compliance, protect data, and scale with your growing business needs.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-zinc-950',
    direction: 'fromLeft'
  },
  {
    title: 'MEDIA & ENTERTAINMENT',
    description: 'Improve Engagement',
    hoverDescription: 'Create immersive experiences and engage audiences with our media and entertainment technology solutions.',
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-blue-950',
    direction: 'fromRight'
  },
  {
    title: 'RETAIL & ECOMMERCE',
    description: 'Scalable Tech for Seamless Sales',
    hoverDescription: 'Transform your retail business with e-commerce platforms that drive sales and provide seamless customer experiences.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-blue-950',
    direction: 'fromBottomRight'
  },
  {
    title: 'FINTECH',
    description: 'Innovating Finance, Empowering Growth',
    hoverDescription: 'We build innovative fintech solutions that disrupt traditional finance and empower business growth.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bgColor: 'bg-indigo-950',
    direction: 'fromTopLeft'
  },
];

// Function to get animation variants based on direction
const getDirectionVariants = (direction) => {
  switch(direction) {
    case 'fromBottom':
      return {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 }
      };
    case 'fromTop':
      return {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 }
      };
    case 'fromLeft':
      return {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
      };
    case 'fromRight':
      return {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 }
      };
    case 'fromBottomRight':
      return {
        hidden: { opacity: 0, x: 100, y: 100 },
        visible: { opacity: 1, x: 0, y: 0 }
      };
    case 'fromTopLeft':
      return {
        hidden: { opacity: 0, x: -100, y: -100 },
        visible: { opacity: 1, x: 0, y: 0 }
      };
    default:
      return {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 }
      };
  }
};

// IndustryCard component with dark hover content
const IndustryCard = ({ industry, index, hoveredIndex, setHoveredIndex }) => {
  const isHovered = hoveredIndex === index;
  const directionVariants = getDirectionVariants(industry.direction);

  return (
    <div
      className="flex-shrink-0 w-80 rounded-xl overflow-hidden shadow-lg snap-start cursor-pointer relative transition-all duration-300 transform hover:scale-105"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onTouchStart={() => setHoveredIndex(isHovered ? null : index)}
    >
      <div className="relative h-72">
        {/* Main image */}
        <img
          src={industry.image}
          alt={industry.title}
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay for the bottom part (for default content) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        {/* Default content (always visible) */}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <h3 className="text-xl font-semibold mb-1">{industry.title}</h3>
          <p className="text-sm text-gray-200">{industry.description}</p>
        </div>

        {/* Hover content with dark background and directional animation */}
        <motion.div 
          className="absolute inset-0 p-6 text-white flex flex-col justify-center bg-gray-900/95"
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          variants={directionVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm md:text-base mb-4 leading-relaxed text-gray-100">
            {industry.hoverDescription}
          </p>
          <motion.a
            href="/contact"
            className="inline-block self-start px-4 py-2 bg-[#73CCD7] rounded-full font-semibold text-white text-xs transition-all duration-300 hover:bg-[#27B0C4]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

// Main component
const IndustriesSection = () => {
  const scrollContainerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="bg-white py-10 sm:py-20 lg:py-14 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered header section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              variants={itemVariants}
            >
              Industries We Cater to
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Get what you are looking for to fulfill your software development
              and outsourcing needs at ValueCoders, with our expertise on all in-demand 
              technologies & platforms.
            </motion.p>
          </motion.div>
          
          <motion.div
            className="flex space-x-4 mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.a
              href="/contact"
              className="mt-1 inline-flex items-center bg-[#73CCD7] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#27B0C4] hover:shadow-lg transform hover:scale-105"
            >
              Get a Free Quote
            </motion.a>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {industriesData.map((industry, index) => (
              <motion.div key={index} variants={itemVariants}>
                <IndustryCard 
                  industry={industry} 
                  index={index} 
                  hoveredIndex={hoveredIndex} 
                  setHoveredIndex={setHoveredIndex} 
                />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="hidden md:flex absolute top-1/2 left-0 right-0 justify-between -translate-y-1/2 px-4 md:px-8">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-3 bg-white/80 text-gray-700 rounded-full hover:bg-white transition-colors duration-200 shadow-lg"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-3 bg-white/80 text-gray-700 rounded-full hover:bg-white transition-colors duration-200 shadow-lg"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
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

export default IndustriesSection;