import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const ProjectInMindCTA = ({
  heading = 'Got a Project in Mind?',
  description = 'Let\'s transform your concept into a market-winning product. Our teams integrate seamlessly with yours, bringing speed, skill, and scalability to every project.',
  buttonText = 'CONTACT US',
  mainImage = 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
  stats = [
    '50+ Industry Sectors',
    '97% Client Satisfaction',
    '4200+ Projects'
  ]
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="bg-[#2C3E50] text-white font-sans py-10 lg:py-14 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-10">
          {/* Left Section - Text Content */}
          <motion.div
            ref={ref}
            className="lg:w-1/2 text-center lg:text-left z-10"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold leading-tight mb-3"
              variants={itemVariants}
            >
              {heading}
            </motion.h2>
            <motion.p
              className="text-[#73CCD7] mb-5 max-w-xl mx-auto lg:mx-0 text-sm md:text-base"
              variants={itemVariants}
            >
              {description}
            </motion.p>
            
            <motion.a
              href="#contact"
              className="inline-flex items-center bg-[#E67E22] text-white font-semibold px-5 py-2.5 rounded-full shadow-lg hover:bg-[#d67118] transition-all duration-300 transform hover:scale-105 mb-6 lg:mb-8 text-sm md:text-base"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {buttonText}
              <ChevronRightIcon className="h-4 w-4 ml-1.5" />
            </motion.a>

            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2 sm:gap-3 flex-wrap"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div key={index} className="flex items-center text-xs md:text-sm text-[#73CCD7] font-medium" variants={itemVariants}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-[#27B0C4] mr-1.5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4.004-5.5Z" clipRule="evenodd" />
                  </svg>
                  {stat}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Section - Image & Overlays */}
          <div className="lg:w-1/2 relative flex justify-center items-center h-[240px] sm:h-[280px] lg:h-[340px] w-full">
            {/* Main Image */}
            <div className="relative rounded-2xl w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px] overflow-hidden shadow-xl ring-4 ring-[#27B0C4]/30">
              <img
                src={mainImage}
                alt="Project in Mind"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Overlay Elements (profile pictures and shapes) */}
            {/* Small Profile 1 (Top Left) */}
            <motion.div
              className="absolute bg-white rounded-full w-12 h-12 sm:w-16 sm:h-16 overflow-hidden shadow-lg -top-2 left-2 lg:left-0 z-20 flex items-center justify-center p-0.5 ring-2 ring-[#27B0C4]"
              initial={{ opacity: 0, x: -30, y: -30 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&crop=face" 
                alt="Profile 1" 
                className="w-full h-full object-cover rounded-full" 
              />
            </motion.div>

            {/* Small Profile 2 (Bottom Right) */}
            <motion.div
              className="absolute bg-white rounded-full w-14 h-14 sm:w-18 sm:h-18 overflow-hidden shadow-lg -bottom-2 right-2 lg:right-0 z-20 flex items-center justify-center p-0.5 ring-2 ring-[#27B0C4]"
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2070&auto=format&fit=crop&crop=face" 
                alt="Profile 2" 
                className="w-full h-full object-cover rounded-full" 
              />
            </motion.div>

            {/* Small Profile 3 (Top Right - with rating) */}
            <motion.div
              className="absolute bg-white rounded-lg p-1.5 shadow-lg -top-6 right-6 lg:right-8 z-20 flex items-center border border-[#F4F4F4]"
              initial={{ opacity: 0, x: 30, y: -30 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <img 
                src="https://unsplash.com/photos/young-man-in-patterned-shirt-by-a-lake-rOlPLLlWG7E" 
                alt="Profile 3" 
                className="w-7 h-7 rounded-full object-cover mr-1.5" 
              />
              <div className="text-gray-800 text-xs">
                <span className="font-bold block text-[10px]">Rahul R.</span>
                <div className="flex items-center text-[#E67E22]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5">
                    <path fillRule="evenodd" d="M10.868 2.884c.321-.772 1.415-.772 1.736 0l1.294 3.117 3.493.472c.817.11 1.149 1.045.505 1.605L14.32 10.74a1.5 1.5 0 01-.432 1.353l.794 3.398c.19.814-.64 1.442-1.396 1.011L10 15.347l-2.825 1.657c-.756.431-1.586-.197-1.396-1.011l.794-3.398a1.5 1.5 0 01-.432-1.353L2.732 8.078c-.644-.56-.312-1.495.505-1.605l3.493-.472 1.294-3.117z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-0.5 text-gray-700 text-[10px]">4.9</span>
                </div>
              </div>
            </motion.div>

            {/* Small Profile 4 (Middle Left - with rating) */}
            <motion.div
              className="absolute bg-white rounded-lg p-1.5 shadow-lg top-1/2 -translate-y-1/2 -left-6 lg:-left-8 z-20 flex items-center border border-[#F4F4F4]"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop&crop=face" 
                alt="Profile 4" 
                className="w-7 h-7 rounded-full object-cover mr-1.5" 
              />
              <div className="text-gray-800 text-xs">
                <span className="font-bold block text-[10px]">Anisha P.</span>
                <div className="flex items-center text-[#E67E22]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5">
                    <path fillRule="evenodd" d="M10.868 2.884c.321-.772 1.415-.772 1.736 0l1.294 3.117 3.493.472c.817.11 1.149 1.045.505 1.605L14.32 10.74a1.5 1.5 0 01-.432 1.353l.794 3.398c.19.814-.64 1.442-1.396 1.011L10 15.347l-2.825 1.657c-.756.431-1.586-.197-1.396-1.011l.794-3.398a1.5 1.5 0 01-.432-1.353L2.732 8.078c-.644-.56-.312-1.495.505-1.605l3.493-.472 1.294-3.117z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-0.5 text-gray-700 text-[10px]">5.0</span>
                </div>
              </div>
            </motion.div>

            {/* Decorative Dots */}
            <motion.div
              className="absolute top-1/4 right-2 w-5 h-5 bg-[#E67E22] rounded-full opacity-60 filter blur-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 0.6, scale: 1 } : {}}
              transition={{ delay: 1.6, duration: 0.8 }}
            ></motion.div>
            <motion.div
              className="absolute bottom-1/4 left-2 w-4 h-4 bg-[#27B0C4] rounded-full opacity-60 filter blur-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 0.6, scale: 1 } : {}}
              transition={{ delay: 1.8, duration: 0.8 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInMindCTA;