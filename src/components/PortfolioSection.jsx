import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    category: 'eCommerce',
    title: 'SS Trading',
    description:
      'S S Trading UK is dedicated to quality, competitive pricing, and exceptional service. With strong ties to top brands and a streamlined supply chain, they ensure fast delivery and consistent stock—empowering small and medium retailers to succeed in a competitive market.',
    technologies: [
      { name: 'Python', icon: '🐍' },
      { name: 'React', icon: '⚛️' },
      { name: 'Node.js', icon: '🟢' },
    ],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    category: 'eCommerce', 
    title: 'AASK Store',
    description:
      'AASKStore is an eCommerce platform system that can help you to sell your products online. This is a complete solution for your online business. It has all the features that you need to start your online business.',
    technologies: [
      { name: 'Laravel', icon: '🔴' },
      { name: 'MySQL', icon: '🗄️' },
      { name: 'Bootstrap', icon: '💜' },
    ],
    image:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'Healthcare',
    title: 'Patient Management System',
    description:
      'A robust system designed to streamline patient record management, appointment scheduling, and secure communication for healthcare providers. It improves operational efficiency and patient outcomes.',
    technologies: [
      { name: 'Python', icon: '🐍' },
      { name: 'MongoDB', icon: '🗄️' },
      { name: 'Docker', icon: '🐳' },
    ],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 4,
    category: 'Logistics',
    title: 'Supply Chain Tracker',
    description:
      'An advanced logistics solution that offers real-time tracking, inventory management, and automated route optimization to ensure timely and efficient delivery of goods.',
    technologies: [
      { name: 'React', icon: '⚛️' },
      { name: 'JavaScript', icon: '💛' },
      { name: 'AWS', icon: '☁️' },
    ],
    image:
      'https://images.unsplash.com/photo-1626025439404-585352358872?q=80&w=2069&auto=format&fit=crop',
  },
];

const PortfolioSection = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [transformX, setTransformX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextProject = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentProject((prev) => (prev + 1) % projectsData.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const prevProject = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentProject(
      (prev) => (prev - 1 + projectsData.length) % projectsData.length
    );
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const setProjectAtIndex = useCallback((index) => {
    if (isTransitioning || index === currentProject) return;
    setIsTransitioning(true);
    setCurrentProject(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentProject, isTransitioning]);

  // Enhanced drag handling
  const handleMouseDown = (e) => {
    if (isTransitioning) return;
    setIsDragging(true);
    setDragStart(e.clientX);
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    if (isTransitioning) return;
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isTransitioning) return;
    const currentX = e.clientX;
    const diff = currentX - dragStart;
    setTransformX(Math.max(-200, Math.min(200, diff * 0.8)));
  };

  const handleTouchMove = (e) => {
    if (!isDragging || isTransitioning) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStart;
    setTransformX(Math.max(-200, Math.min(200, diff * 0.8)));
  };

  const handleDragEnd = (e) => {
    if (!isDragging || isTransitioning) return;
    
    const threshold = 80;
    
    if (Math.abs(transformX) > threshold) {
      if (transformX > 0) {
        prevProject();
      } else {
        nextProject();
      }
    }

    setIsDragging(false);
    setTransformX(0);
    setDragStart(0);
  };

  // Event listeners
  useEffect(() => {
    const handleMouseMoveGlobal = (e) => handleMouseMove(e);
    const handleMouseUpGlobal = (e) => handleDragEnd(e);
    const handleTouchMoveGlobal = (e) => handleTouchMove(e);
    const handleTouchEndGlobal = (e) => handleDragEnd(e);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMoveGlobal);
      document.addEventListener('mouseup', handleMouseUpGlobal);
      document.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
      document.addEventListener('touchend', handleTouchEndGlobal);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
      document.removeEventListener('touchmove', handleTouchMoveGlobal);
      document.removeEventListener('touchend', handleTouchEndGlobal);
    };
  }, [isDragging, transformX, dragStart]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

  return (
    <section className="bg-[#F4F4F4] text-white py-16 font-sans overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light text-primary mb-2 leading-tight">
            From Challenge to Victory: Exploring Case Studies of
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-primary">
            Innovation and Excellence
          </h2>
        </div>

        {/* Card Stack Container */}
        <div className="relative h-[380px] flex items-center justify-center">
          {projectsData.map((project, index) => {
            const offset = index - currentProject;
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;
            
            if (!isVisible) return null;

            // Calculate positions based on your screenshots
            let translateX = 0;
            let translateY = 0;
            let rotate = 0;
            let scale = 1;
            let zIndex = 0;
            let opacity = 1;

            if (offset === 0) {
              // Active card - center
              translateX = transformX;
              scale = isDragging ? 1.02 : 1;
              zIndex = 30;
              rotate = isDragging ? transformX * 0.02 : 0;
            } else if (offset === 1) {
              // Next card - right side, rotated and smaller
              translateX = 280 + transformX * 0.3;
              translateY = 20;
              rotate = -15;
              scale = 0.85;
              zIndex = 20;
              opacity = 0.8;
            } else if (offset === -1) {
              // Previous card - left side, rotated and smaller  
              translateX = -280 + transformX * 0.3;
              translateY = 20;
              rotate = 15;
              scale = 0.85;
              zIndex = 20;
              opacity = 0.8;
            } else if (offset === 2) {
              // Far right card - more rotated, smaller
              translateX = 450 + transformX * 0.1;
              translateY = 40;
              rotate = -25;
              scale = 0.7;
              zIndex = 10;
              opacity = 0.6;
            } else if (offset === -2) {
              // Far left card - more rotated, smaller
              translateX = -450 + transformX * 0.1;
              translateY = 40;
              rotate = 25;
              scale = 0.7;
              zIndex = 10;
              opacity = 0.6;
            }

            return (
              <div
                key={project.id}
                className={`absolute w-[600px] h-[400px] bg-gray-800 rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 ease-out ${
                  isActive ? 'cursor-grab active:cursor-grabbing' : ''
                }`}
                style={{
                  transform: `
                    translate3d(${translateX}px, ${translateY}px, 0) 
                    rotate(${rotate}deg) 
                    scale(${scale})
                  `,
                  zIndex,
                  opacity,
                  transformOrigin: 'center center',
                }}
                onMouseDown={isActive ? handleMouseDown : undefined}
                onTouchStart={isActive ? handleTouchStart : undefined}
                onClick={!isActive ? () => setProjectAtIndex(index) : undefined}
              >
                {/* Card Content */}
                <div className="flex h-full">
                  {/* Left Image Section */}
                  <div className="w-1/2 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                      style={{
                        transform: `scale(${isActive ? 1 : 1.1})`,
                        transition: 'transform 0.5s ease-out'
                      }}
                    />
                  </div>
                  
                  {/* Right Content Section */}
                  <div className="w-1/2 p-8 flex flex-col justify-center relative">
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-semibold">
                      {project.category}
                    </div>
                    
                    <h3 className="text-2xl font-light text-white mb-4 leading-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
                      {project.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-semibold">
                        Technology
                      </div>
                      <div className="flex gap-3">
                        {project.technologies.slice(0, 2).map((tech, techIndex) => (
                          <div key={techIndex} className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-lg">
                            {tech.icon}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Navigation Buttons */}
          <button
            onClick={prevProject}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/50 hover:bg-gray-700/70 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextProject}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/50 hover:bg-gray-700/70 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bullet Navigation */}
        <div className="flex items-center justify-center mt-12 gap-2">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setProjectAtIndex(index)}
              disabled={isTransitioning}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentProject 
                  ? 'bg-accent w-8' 
                  : 'bg-gray-600 w-2 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default PortfolioSection;