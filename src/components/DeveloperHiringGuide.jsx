import React, { useState, useEffect, useRef } from 'react';

const DeveloperHiringGuide = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  const hiringData = [
    {
      id: 'benefits',
      title: 'Benefits of Hiring Developers',
      content: 'Hiring skilled developers brings expertise to your projects, accelerates development timelines, and ensures high-quality code. Professional developers can solve complex problems, implement best practices, and help scale your business efficiently.'
    },
    {
      id: 'factors',
      title: 'Factors to Consider While Hiring Developers',
      content: 'When hiring developers, consider their technical skills, experience with relevant technologies, portfolio quality, communication abilities, cultural fit, and problem-solving capabilities. Also evaluate their ability to work in your preferred development model.'
    },
    {
      id: 'model',
      title: 'Choosing the Right Development Model',
      content: 'Selecting an appropriate development model is pivotal in ensuring the seamless alignment of your project with dedicated developers. Whether you\'re considering full-time, part-time, or remote engagement, comprehending the advantages and drawbacks of each model is paramount.'
    },
    {
      id: 'challenges',
      title: 'Typical Challenges for Hiring Developers',
      content: 'Common challenges include finding qualified candidates, assessing technical skills accurately, competing with other companies for talent, managing remote teams effectively, and ensuring cultural alignment with your organization.'
    },
    {
      id: 'freelancers-vs-dedicated',
      title: 'Hiring Freelancers vs. Dedicated Developers',
      content: 'Freelancers offer flexibility and cost-effectiveness for short-term projects, while dedicated developers provide more commitment, deeper product knowledge, and better integration with your team for long-term projects.'
    },
    {
      id: 'communication',
      title: 'Ways to Ensure Effective Communication with Remote Developers',
      content: 'Establish clear communication channels, set regular check-ins, use collaboration tools, define expectations clearly, create documentation standards, and foster a culture of open feedback to ensure effective communication with remote developers.'
    }
  ];

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = [];
    
    sectionRefs.current.forEach((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev, index]);
            observer.unobserve(ref);
          }
        },
        { threshold: 0.1 }
      );
      
      if (ref) {
        observer.observe(ref);
        observers.push(observer);
      }
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Developer Hiring Guide</h1>
          <p className="text-lg text-gray-600">Everything you need to know about hiring the right developers for your project</p>
        </div>
        
        <div className="space-y-6">
          {hiringData.map((section, index) => (
            <div 
              key={section.id}
              ref={el => sectionRefs.current[index] = el}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform ${
                visibleSections.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors duration-200 rounded-xl"
              >
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                <span className="text-blue-600">
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${activeSection === section.id ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`px-6 transition-all duration-500 ease-in-out overflow-hidden ${
                  activeSection === section.id ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6">Ready to hire developers?</h2>
          <a href="#contact">
          <button className="bg-[#73CCD7] hover:bg-[#2C3E50] text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Today
          </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeveloperHiringGuide;