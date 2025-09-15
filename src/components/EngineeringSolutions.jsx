import React, { useState, useRef } from 'react';
import { Link} from "react-router-dom";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

const solutionsData = [
  {
    title: 'CRM',
    description: 'Streamline customer relationship operations, increase productivity & efficiency.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Workforce Management',
    description: 'Streamline workforce operations, increase productivity & efficiency.',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Human Resource Management',
    description: 'Simplify HR tasks with our automated and easy-to-use platform.',
    image: 'https://images.unsplash.com/photo-1556740714-a82f3c7e3f89?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Supply Chain Management',
    description: 'Elevate supply chain efficiency, streamline operations & cost savings.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Fleet Management',
    description: 'Optimize vehicle performance, reduce costs, and improve safety with our comprehensive fleet management tools.',
    image: 'https://images.unsplash.com/photo-1626025439404-585352358872?q=80&w=2069&auto=format&fit=crop',
  },
  {
    title: 'Operations Management',
    description: 'Gain a complete overview of your operations to make data-driven decisions and boost performance.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911&auto=format&fit=crop',
  },
];

const DynamicSolutions = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280; // Reduced for smaller cards
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const carouselVariants = {
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
    <section className="bg-[#F4F4F4] from-blue-50 to-gray-50 text-gray-900 py-16 sm:py-20 lg:py-24 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={ref}
          className="text-center mb-10 md:mb-12"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={carouselVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            variants={itemVariants}
          >
            Engineering Solutions That Solve Your Biggest Challenges
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            variants={itemVariants}
          >
            No matter the scale, our focus is simple - <span className="font-semibold text-blue-700">Measurable results, Delivered faster.</span>
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2"
          >
            {solutionsData.map((solution, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-72 snap-start" // Smaller card width
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer h-80" // Reduced height
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Image Overlay */}
                  <div className="absolute inset-0">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 transition-all duration-300 ${hoveredIndex === index ? 'bg-[#73CCD7]/80' : 'bg-gray-900/50'}`}></div>
                  </div>

                  {/* Card Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-white z-20">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                      {hoveredIndex === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="text-blue-100 text-xs mt-2"
                        >
                          {solution.description}
                        </motion.p>
                      )}
                    </div>
                    
                  </div>

                  {/* Top-Right Icon */}
                  <div className="absolute top-3 right-3 p-1.5 bg-white/20 rounded-full z-20 backdrop-blur-sm">
                    <ChevronRightIcon className="h-3 w-3 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex absolute top-1/2 left-0 right-0 justify-between -translate-y-1/2 px-2 ">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-2 bg-white/90 text-blue-700 rounded-full hover:bg-white transition-colors duration-200 shadow-lg"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-2 bg-white/90 text-blue-700 rounded-full hover:bg-white transition-colors duration-200 shadow-lg"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>

          </div>
        </div>

            <div className="flex justify-center">
               <a to="/services">
            <button className="bg-[#73CCD7] hover:bg-[#27B0C4] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Contact us
            </button>
            </a>
            </div>

        {/* Dots Indicator for Mobile */}
        <div className="flex justify-center mt-6 space-x-2 md:hidden">
          {solutionsData.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${index === Math.floor(hoveredIndex || 0) ? 'bg-blue-600' : 'bg-gray-400'}`}
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    left: index * 288, // card width (72) + gap (6) = 78 * 4 = 312
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
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

export default DynamicSolutions;