import React, { useState } from 'react';

const HireHeroSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Email submitted:', email);
  };

  return (
    <section className="relative bg-gradient-to-br from-[#F4F4F4] to-[#FFFFFF] py-12 sm:py-16 lg:py-20">
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-12">
        <div className="lg:pr-8">
          <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
            <h1 className="text-3xl font-bold text-[#2C3E50] sm:text-4xl lg:text-5xl">
              Hire Expert Developers <span className="inline-block text-[#27B0C4]">Tailored</span> to Your Needs
            </h1>
            
            <p className="mt-6 text-base font-normal leading-7 text-[#7A7A7A]">
              Connect with top-tier developers who specialize in your technology stack. 
              We match you with professionals who understand your vision and deliver exceptional results.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#27B0C4]">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-[#2C3E50]">Vetted developers with proven expertise</p>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#27B0C4]">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-[#2C3E50]">Flexible engagement models</p>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#27B0C4]">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-[#2C3E50]">Seamless collaboration process</p>
              </div>
            </div>
            
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-200 bg-[#E67E22] rounded-lg hover:bg-[#d35400] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E67E22]"
              >
                Start Hiring Today
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 lg:mt-0">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-[#2C3E50]">Our Developers Specialize In</h3>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center p-3 bg-[#F4F4F4] rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#73CCD7]">
                    <span className="text-white font-semibold">FR</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-[#2C3E50]">Frontend Development</h4>
                    <p className="text-sm text-[#7A7A7A]">React, Vue, Angular, Next.js</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-[#F4F4F4] rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#27B0C4]">
                    <span className="text-white font-semibold">BK</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-[#2C3E50]">Backend Development</h4>
                    <p className="text-sm text-[#7A7A7A]">Node.js, Python, Ruby, Java</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-[#F4F4F4] rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E67E22]">
                    <span className="text-white font-semibold">MD</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-[#2C3E50]">Mobile Development</h4>
                    <p className="text-sm text-[#7A7A7A]">React Native, Flutter, iOS, Android</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-[#F4F4F4] rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#2C3E50]">
                    <span className="text-white font-semibold">FS</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-[#2C3E50]">Full-Stack Development</h4>
                    <p className="text-sm text-[#7A7A7A]">End-to-end solution development</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-8 space-x-4">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 border-2 border-white rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Developer" />
                <img className="w-10 h-10 border-2 border-white rounded-full" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Developer" />
                <img className="w-10 h-10 border-2 border-white rounded-full" src="https://randomuser.me/api/portraits/men/29.jpg" alt="Developer" />
                <img className="w-10 h-10 border-2 border-white rounded-full" src="https://randomuser.me/api/portraits/women/68.jpg" alt="Developer" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#2C3E50]">50+ Developers Ready</p>
                <p className="text-xs text-[#7A7A7A]">Available for immediate projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 hidden lg:block">
        <svg className="w-32 h-32 text-[#73CCD7] opacity-20" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 hidden lg:block">
        <svg className="w-24 h-24 text-[#27B0C4] opacity-20" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>
    </section>
  );
};

export default HireHeroSection;