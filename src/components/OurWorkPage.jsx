import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRight, ExternalLink, Calendar, User, Tag, ArrowLeft, Search, Filter, Briefcase, Zap, Award, TrendingUp, Eye, Star, Globe, Code } from 'lucide-react';

// Extended project data with comprehensive details
const projectsData = [
  {
    id: 1,
    category: 'eCommerce',
    title: 'SS Trading',
    shortDescription: 'S S Trading UK is dedicated to quality, competitive pricing, and exceptional service.',
    fullDescription: 'S S Trading UK is a comprehensive B2B trading platform that revolutionizes how small and medium retailers connect with suppliers. The platform features advanced inventory management, real-time pricing updates, automated order processing, and integrated logistics tracking. Built with scalability in mind, it handles thousands of daily transactions while maintaining optimal performance. The system includes multi-vendor support, automated invoicing, and a comprehensive analytics dashboard.',
    technologies: [
      { name: 'Python', icon: '🐍' },
      { name: 'React', icon: '⚛️' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'PostgreSQL', icon: '🗄️' },
      { name: 'Redis', icon: '🔴' },
      { name: 'AWS', icon: '☁️' },
      { name: 'Docker', icon: '🐳' },
      { name: 'GraphQL', icon: '💜' }
    ],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
    ],
    liveLink: 'https://ss-trading-demo.vercel.app',
    duration: '6 months',
    teamSize: '4 experts',
    status: 'Live',
    year: '2024',
    client: 'SS Trading UK',
    challenges: [
      'Real-time inventory synchronization across multiple suppliers',
      'Handling high-volume concurrent transactions',
      'Complex pricing algorithms with dynamic discounts',
      'Multi-vendor payment processing',
      'Scalable architecture for rapid growth'
    ],
    solutions: [
      'Implemented event-driven architecture with Redis pub/sub',
      'Used database sharding and connection pooling',
      'Created flexible pricing engine with rule-based calculations',
      'Integrated multiple payment gateways with fallback options',
      'Deployed on AWS with auto-scaling capabilities'
    ],
    results: [
      '300% increase in order processing speed',
      '99.9% uptime with zero data loss',
      '40% reduction in inventory management overhead',
      '50,000+ successful transactions processed',
      '25% increase in customer satisfaction'
    ],
    features: [
      'Multi-vendor marketplace',
      'Real-time inventory tracking',
      'Advanced analytics dashboard',
      'Automated invoicing system',
      'Mobile-responsive design',
      'API integrations'
    ],
    featured: true,
    completedAt: '2024-01-15'
  },
  {
    id: 2,
    category: 'eCommerce',
    title: 'AASK Store',
    shortDescription: 'Complete eCommerce solution for online businesses with modern features.',
    fullDescription: 'AASK Store is a full-featured eCommerce platform designed for modern online businesses. It includes advanced product management, secure payment processing, order tracking, customer analytics, and a powerful admin dashboard. The platform supports multiple payment gateways, multi-language support, and responsive design across all devices. Features include abandoned cart recovery, SEO optimization, and comprehensive reporting tools.',
    technologies: [
      { name: 'Laravel', icon: '🔴' },
      { name: 'MySQL', icon: '🗄️' },
      { name: 'Bootstrap', icon: '💜' },
      { name: 'Vue.js', icon: '🟢' },
      { name: 'Stripe', icon: '💳' },
      { name: 'PayPal', icon: '💰' }
    ],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2127&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2080&auto=format&fit=crop'
    ],
    liveLink: 'https://aask-store-demo.vercel.app',
    duration: '4 months',
    teamSize: '3 experts',
    status: 'Live',
    year: '2023',
    client: 'AASK Technologies',
    challenges: [
      'Implementing secure payment processing',
      'Creating responsive design for all devices',
      'Optimizing for high-traffic scenarios',
      'Multi-language support implementation',
      'SEO optimization for better visibility'
    ],
    solutions: [
      'Integrated multiple payment gateways with fallback options',
      'Used mobile-first design approach with Bootstrap',
      'Implemented caching strategies and CDN integration',
      'Built flexible localization system',
      'Applied advanced SEO techniques and meta optimization'
    ],
    results: [
      '250% increase in conversion rates',
      '50% reduction in cart abandonment',
      'Successfully handling 10k+ concurrent users',
      '40% improvement in page load speeds',
      '200% increase in organic traffic'
    ],
    features: [
      'Advanced product catalog',
      'Shopping cart & checkout',
      'Order management system',
      'Customer dashboard',
      'Admin panel',
      'Payment gateway integration'
    ],
    featured: true,
    completedAt: '2023-11-20'
  },
  {
    id: 3,
    category: 'Healthcare',
    title: 'Patient Management System',
    shortDescription: 'Streamlined patient record management and appointment scheduling system.',
    fullDescription: 'A comprehensive healthcare management system that digitizes patient records, automates appointment scheduling, and facilitates secure communication between healthcare providers and patients. Features include electronic health records (EHR), prescription management, billing integration, and HIPAA-compliant data handling. The system supports telemedicine consultations, automated reminders, and comprehensive reporting for healthcare analytics.',
    technologies: [
      { name: 'Python', icon: '🐍' },
      { name: 'MongoDB', icon: '🗄️' },
      { name: 'Docker', icon: '🐳' },
      { name: 'React', icon: '⚛️' },
      { name: 'Flask', icon: '🌶️' },
      { name: 'JWT', icon: '🔐' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=2127&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2128&auto=format&fit=crop'
    ],
    liveLink: 'https://patient-mgmt-demo.vercel.app',
    duration: '8 months',
    teamSize: '5 experts',
    status: 'Live',
    year: '2023',
    client: 'MediCare Solutions',
    challenges: [
      'HIPAA compliance and data security',
      'Complex appointment scheduling algorithms',
      'Integration with existing hospital systems',
      'Real-time communication between stakeholders',
      'Handling sensitive medical data'
    ],
    solutions: [
      'Implemented end-to-end encryption and audit trails',
      'Created flexible scheduling engine with conflict resolution',
      'Built robust API layer for seamless integrations',
      'Used WebSocket for real-time updates',
      'Applied zero-trust security architecture'
    ],
    results: [
      '60% reduction in administrative overhead',
      '95% improvement in appointment scheduling efficiency',
      '100% HIPAA compliance with zero security incidents',
      '30% increase in patient satisfaction scores',
      '45% reduction in appointment no-shows'
    ],
    features: [
      'Electronic Health Records',
      'Appointment scheduling',
      'Patient portal',
      'Prescription management',
      'Billing integration',
      'Telemedicine support'
    ],
    featured: false,
    completedAt: '2023-09-10'
  },
  {
    id: 4,
    category: 'Logistics',
    title: 'Supply Chain Tracker',
    shortDescription: 'Advanced logistics solution with real-time tracking and route optimization.',
    fullDescription: 'A sophisticated supply chain management platform that provides end-to-end visibility of goods movement, real-time tracking, predictive analytics for demand forecasting, and AI-powered route optimization. The system integrates with IoT devices, GPS tracking, and weather APIs to ensure optimal delivery performance. Features include automated notifications, driver management, and a comprehensive analytics dashboard for supply chain optimization.',
    technologies: [
      { name: 'React', icon: '⚛️' },
      { name: 'JavaScript', icon: '💛' },
      { name: 'AWS', icon: '☁️' },
      { name: 'GraphQL', icon: '💜' },
      { name: 'TensorFlow', icon: '🧠' },
      { name: 'MongoDB', icon: '🗄️' }
    ],
    image: 'https://images.unsplash.com/photo-1626025439404-585352358872?q=80&w=2069&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1626025439404-585352358872?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2065&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'
    ],
    liveLink: 'https://supply-chain-demo.vercel.app',
    duration: '10 months',
    teamSize: '6 experts',
    status: 'Live',
    year: '2024',
    client: 'LogiTech Solutions',
    challenges: [
      'Processing massive amounts of real-time data',
      'Complex route optimization algorithms',
      'Integration with multiple third-party logistics providers',
      'Predictive analytics for demand forecasting',
      'Real-time tracking across global supply chain'
    ],
    solutions: [
      'Implemented event streaming architecture with Kafka',
      'Used machine learning for predictive route optimization',
      'Created unified API layer for logistics provider integration',
      'Built TensorFlow models for demand prediction',
      'Deployed global edge computing infrastructure'
    ],
    results: [
      '35% reduction in delivery times',
      '25% decrease in fuel costs',
      '99.5% accuracy in delivery predictions',
      '20% improvement in customer satisfaction',
      '30% reduction in operational costs'
    ],
    features: [
      'Real-time GPS tracking',
      'Route optimization',
      'Inventory management',
      'Analytics dashboard',
      'Driver management',
      'Customer notifications'
    ],
    featured: true,
    completedAt: '2024-03-05'
  },
  {
    id: 5,
    category: 'Finance',
    title: 'CryptoTrade Dashboard',
    shortDescription: 'Advanced cryptocurrency trading platform with real-time analytics.',
    fullDescription: 'A comprehensive cryptocurrency trading platform that provides real-time market data, advanced charting tools, automated trading strategies, and portfolio management. The platform supports multiple exchanges, offers technical analysis indicators, and includes risk management tools. Features include social trading, copy trading functionality, and AI-powered market insights.',
    technologies: [
      { name: 'Next.js', icon: '⚡' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'WebSocket', icon: '🔗' },
      { name: 'Chart.js', icon: '📊' },
      { name: 'Redis', icon: '🔴' },
      { name: 'PostgreSQL', icon: '🗄️' }
    ],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2126&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop'
    ],
    liveLink: 'https://cryptotrade-demo.vercel.app',
    duration: '7 months',
    teamSize: '4 experts',
    status: 'Live',
    year: '2024',
    client: 'CryptoTrade Inc',
    challenges: [
      'Real-time data streaming from multiple exchanges',
      'Complex trading algorithm implementation',
      'High-frequency data processing',
      'Security for financial transactions',
      'Scalable architecture for global users'
    ],
    solutions: [
      'Implemented WebSocket connections with fallback options',
      'Built modular trading engine with strategy patterns',
      'Used Redis for high-speed data caching',
      'Applied multi-layer security with JWT and OAuth',
      'Deployed on AWS with global CDN'
    ],
    results: [
      '1M+ trades executed successfully',
      '99.99% uptime during market hours',
      '50ms average response time',
      '10,000+ active users',
      '95% customer satisfaction rating'
    ],
    features: [
      'Real-time trading',
      'Advanced charting',
      'Portfolio management',
      'Risk analysis',
      'Social trading',
      'Mobile app'
    ],
    featured: true,
    completedAt: '2024-05-15'
  },
  {
    id: 6,
    category: 'Education',
    title: 'EduLearn Platform',
    shortDescription: 'Comprehensive online learning management system for educational institutions.',
    fullDescription: 'A modern learning management system (LMS) designed for educational institutions and corporate training. Features include course creation tools, interactive content delivery, assessment management, progress tracking, and collaborative learning tools. The platform supports multiple content formats, live streaming, and AI-powered personalized learning paths.',
    technologies: [
      { name: 'Django', icon: '🎯' },
      { name: 'React', icon: '⚛️' },
      { name: 'PostgreSQL', icon: '🗄️' },
      { name: 'WebRTC', icon: '📹' },
      { name: 'AWS S3', icon: '☁️' }
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2070&auto=format&fit=crop'
    ],
    liveLink: 'https://edulearn-demo.vercel.app',
    duration: '9 months',
    teamSize: '5 experts',
    status: 'Live',
    year: '2023',
    client: 'EduTech Institute',
    challenges: [
      'Scalable video streaming infrastructure',
      'Real-time collaborative features',
      'Content management and delivery',
      'Assessment and grading system',
      'Mobile-responsive design'
    ],
    solutions: [
      'Implemented CDN-based video delivery',
      'Built real-time collaboration with Socket.io',
      'Created flexible content management system',
      'Developed automated grading algorithms',
      'Used responsive design principles'
    ],
    results: [
      '50,000+ students enrolled',
      '500+ courses created',
      '90% course completion rate',
      '4.8/5 user satisfaction rating',
      '60% reduction in administrative workload'
    ],
    features: [
      'Course management',
      'Live streaming',
      'Assessment tools',
      'Progress tracking',
      'Discussion forums',
      'Mobile app'
    ],
    featured: false,
    completedAt: '2023-12-10'
  }
];

// Statistics data
const statsData = [
  { label: 'Projects Completed', value: 50, icon: Briefcase, suffix: '+' },
  { label: 'Happy Clients', value: 30, icon: User, suffix: '+' },
  { label: 'Years of Experience', value: 5, icon: Award, suffix: '+' },
  { label: 'Innovative Solutions', value: 25, icon: Zap, suffix: '+' }
];

// Custom Hook for Counter Animation
const useCounter = (end, duration) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const currentCount = Math.min(
              Math.floor((progress / duration) * end),
              end
            );
            setCount(currentCount);
            if (progress < duration) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [end, duration]);

  return [count, ref];
};

// Main Our Work Page Component
const OurWorkPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', ...new Set(projectsData.map(project => project.category))];

  const filteredProjects = projectsData.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredProjects = projectsData.filter(project => project.featured);

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="bg-[#FFFFFF] text-[#2C3E50] min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Projects Section */}
      <FeaturedProjectsSection
        featuredProjects={featuredProjects}
        onProjectSelect={setSelectedProject}
      />

      {/* All Projects Section */}
      <AllProjectsSection
        filteredProjects={filteredProjects}
        categories={categories}
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onProjectSelect={setSelectedProject}
      />

      {/* Call to Action Section */}
      <CallToActionSection />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => (
  <section className="relative py-24 bg-gradient-to-br from-[#F4F4F4] via-[#FFFFFF] to-[#F4F4F4] overflow-hidden">
    {/* Floating Elements */}
    <div className="absolute top-20 left-10 w-20 h-20 bg-[#27B0C4]/10 rounded-full animate-float"></div>
    <div className="absolute top-40 right-20 w-16 h-16 bg-[#73CCD7]/10 rounded-full animate-float-delayed"></div>
    <div className="absolute bottom-20 left-20 w-12 h-12 bg-[#2C3E50]/10 rounded-full animate-float"></div>

    <div className="relative max-w-7xl mx-auto px-4">
      <div className="text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-[#2C3E50]">
            Our Work
          </h1>
          <div className="text-2xl md:text-3xl font-light mb-8 text-[#27B0C4] animate-fade-in">
            Crafting Digital Solutions, Delivering Excellence
          </div>
        </div>
        <div className="animate-fade-in-up animation-delay-200">
          <p className="text-xl text-[#7A7A7A] mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover our journey through successful projects, from concept to deployment.
            Each case study represents a unique challenge solved with our expertise,
            creative solutions, and a passion for excellence.
          </p>
        </div>
        <div className="animate-fade-in-up animation-delay-400">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 bg-[#27B0C4] rounded-full"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#27B0C4] hover:bg-[#2C3E50] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              View Our Case Studies
            </button>
            <button className="border border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Stats Section Component
const StatsSection = () => (
  <section className="py-16 bg-[#F4F4F4]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {statsData.map((stat, index) => (
          <StatItem key={index} stat={stat} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const StatItem = ({ stat, index }) => {
  const [count, ref] = useCounter(stat.value, 1500);
  return (
    <div
      ref={ref}
      className="text-center group animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-[#FFFFFF] rounded-2xl p-6 shadow-md hover:bg-[#F4F4F4] transition-all duration-300 transform group-hover:scale-105">
        <stat.icon className="w-8 h-8 text-[#27B0C4] mx-auto mb-4 group-hover:animate-bounce" />
        <div className="text-3xl font-bold text-[#2C3E50] mb-2">{count}{stat.suffix}</div>
        <div className="text-[#7A7A7A] text-sm">{stat.label}</div>
      </div>
    </div>
  );
};


// Featured Projects Section Component
const FeaturedProjectsSection = ({ featuredProjects, onProjectSelect }) => (
  <section className=" mt-10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-light mb-4 text-[#2C3E50]">
          Featured Case Studies
        </h2>
        <p className="text-[#7A7A7A] max-w-2xl mx-auto">
          Handpicked projects that showcase our expertise and passion for creating
          exceptional digital experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => onProjectSelect(project)}
          />
        ))}
      </div>
    </div>
  </section>
);

// Featured Project Card Component
const FeaturedProjectCard = ({ project, index, onClick }) => (
  <div
    className="group relative bg-[#F4F4F4] rounded-2xl overflow-hidden shadow-md hover:transform hover:scale-105 transition-all duration-700 cursor-pointer featured-card"
    onClick={onClick}
    style={{
      animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
    }}
  >
    <div className="aspect-video overflow-hidden relative">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/60 via-[#2C3E50]/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <span className="bg-[#E67E22] text-white text-xs px-3 py-1 rounded-full font-semibold">
            Featured
          </span>
          <span className="bg-[#27B0C4] text-white text-xs px-3 py-1 rounded-full font-semibold">
            {project.status}
          </span>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-8">
      <span className="text-[#73CCD7] text-sm uppercase tracking-wider font-semibold">
        {project.category}
      </span>
      <h3 className="text-3xl font-light mt-2 mb-4 text-white group-hover:text-[#27B0C4] transition-colors">
        {project.title}
      </h3>
      <p className="text-[#F4F4F4] text-base mb-6 line-clamp-3">{project.shortDescription}</p>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.technologies.slice(0, 5).map((tech, techIndex) => (
            <div
              key={techIndex}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border-2 border-[#F4F4F4] hover:border-[#27B0C4] transition-colors bg-[#2C3E50] text-white`}
              title={tech.name}
            >
              {tech.icon}
            </div>
          ))}
          {project.technologies.length > 5 && (
            <div className="w-10 h-10 bg-[#7A7A7A] rounded-full flex items-center justify-center text-xs border-2 border-[#F4F4F4] font-semibold text-white">
              +{project.technologies.length - 5}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[#7A7A7A] text-sm">{project.year}</div>
          <ChevronRight className="w-6 h-6 text-[#73CCD7] group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
  </div>
);

// All Projects Section Component
const AllProjectsSection = ({ filteredProjects, categories, filter, setFilter, searchTerm, setSearchTerm, onProjectSelect }) => (
  <section className="py-16 bg-[#F4F4F4]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
        <div className="animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-[#2C3E50]">All Case Studies</h2>
          <p className="text-[#7A7A7A] mb-6 lg:mb-0">
            Explore our complete portfolio of digital solutions.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7A7A7A]" />
            <input
              type="text"
              placeholder="Search by project name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#FFFFFF] text-[#2C3E50] border border-[#D1D5DB] pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27B0C4] w-full sm:w-64 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7A7A7A]" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#FFFFFF] text-[#2C3E50] border border-[#D1D5DB] pl-10 pr-8 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27B0C4] appearance-none cursor-pointer"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Tags */}
      <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up animation-delay-300">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === category
                ? 'bg-[#27B0C4] text-white shadow-lg'
                : 'bg-[#E5E7EB] text-[#2C3E50] hover:bg-[#D1D5DB]'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
            <span className="ml-2 text-xs opacity-75">
              ({category === 'all' ? projectsData.length : projectsData.filter(p => p.category === category).length})
            </span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => onProjectSelect(project)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 animate-fade-in-up">
          <div className="text-[#7A7A7A] text-xl mb-4">No case studies found</div>
          <p className="text-[#7A7A7A] mb-6">Try adjusting your search or filter criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setFilter('all'); }}
            className="bg-[#27B0C4] hover:bg-[#2C3E50] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  </section>
);

// Project Card Component
const ProjectCard = ({ project, index, onClick }) => (
  <div
    className="group bg-[#FFFFFF] rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:transform hover:scale-105 transition-all duration-500 cursor-pointer"
    onClick={onClick}
    style={{
      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
    }}
  >
    <div className="aspect-video overflow-hidden relative">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-[#2C3E50]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-3 left-3 flex gap-2">
        {project.featured && (
          <span className="bg-[#E67E22] text-white text-xs px-2 py-1 rounded-full font-semibold">
            <Star className="w-3 h-3 inline mr-1" />
            Featured
          </span>
        )}
        <span className="bg-[#27B0C4] text-white text-xs px-2 py-1 rounded-full font-semibold">
          {project.status}
        </span>
      </div>
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-2">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2C3E50] hover:bg-[#7A7A7A] text-white p-2 rounded-full transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#73CCD7] text-xs uppercase tracking-wider font-semibold">
          {project.category}
        </span>
        <span className="text-[#7A7A7A] text-xs">{project.year}</span>
      </div>
      <h3 className="text-xl font-light mb-3 text-[#2C3E50] group-hover:text-[#27B0C4] transition-colors">
        {project.title}
      </h3>
      <p className="text-[#7A7A7A] text-sm mb-4 line-clamp-3">{project.shortDescription}</p>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <div
              key={techIndex}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs hover:scale-110 transition-transform text-white bg-[#2C3E50]`}
              title={tech.name}
            >
              {tech.icon}
            </div>
          ))}
          {project.technologies.length > 4 && (
            <div className="w-8 h-8 bg-[#7A7A7A] text-white rounded-full flex items-center justify-center text-xs font-semibold">
              +{project.technologies.length - 4}
            </div>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-[#27B0C4] group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

// Call to Action Section Component
const CallToActionSection = () => (
  <section className="py-16 bg-[#F4F4F4]">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-light mb-6 text-[#2C3E50]">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-[#7A7A7A] text-lg mb-8 max-w-2xl mx-auto">
          Let's collaborate to bring your ideas to life. We are always excited to work on
          new challenges and create innovative solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#27B0C4] hover:bg-[#2C3E50] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
            Start a Project
          </button>
          <button className="border border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  </section>
);

// Project Detail Component
const ProjectDetail = ({ project, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-[#FFFFFF] text-[#2C3E50] min-h-screen">
      {/* Project Hero Section with integrated back button */}
      <ProjectHeroSection
        project={project}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        onBack={onBack}
      />

      {/* Navigation Tabs */}
      <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content based on active tab */}
      <ProjectContent project={project} activeTab={activeTab} />

      {/* Related Projects */}
      <RelatedProjectsSection project={project} />
    </div>
  );
};

// Back Button Component
// Back Button Component
// Back Button Component
const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed top-18 left-4 md:top-16 md:left-8 flex items-center gap-2 text-[#7A7A7A] hover:text-[#2C3E50] transition-colors z-50 p-2 rounded-full bg-white/50 backdrop-blur-sm"
  >
    <ArrowLeft className="w-5 h-5" />
    <span className="hidden md:inline">Back to Work</span>
  </button>
);
// Project Hero Section Component with back button
const ProjectHeroSection = ({ project, currentImageIndex, setCurrentImageIndex, onBack }) => (
  <section className="py-16 mt-10 relative">
    <div className="max-w-7xl mx-auto px-4">
      <BackButton onClick={onBack} />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Project Images */}
        <div className="space-y-4 animate-fade-in-up">
          <div className="aspect-video rounded-2xl overflow-hidden relative group">
            <img
              src={project.images[currentImageIndex]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity "></div>
          </div>
          <div className="flex gap-2">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-1 aspect-video rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                  currentImageIndex === index ? 'border-[#27B0C4] shadow-lg' : 'border-[#F4F4F4] hover:border-[#D1D5DB]'
                }`}
              >
                <img src={image} alt={`${project.title} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-6 animate-fade-in-up animation-delay-200">
          <div>
            <span className="text-[#27B0C4] text-sm uppercase tracking-wider font-semibold">
              {project.category}
            </span>
            <h1 className="text-4xl lg:text-5xl font-light mt-2 mb-4 text-[#2C3E50]">{project.title}</h1>
            <p className="text-[#7A7A7A] text-lg leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#7A7A7A] mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Duration</span>
              </div>
              <p className="text-[#2C3E50] font-medium">{project.duration}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#7A7A7A] mb-1">
                <User className="w-4 h-4" />
                <span className="text-sm">Team Size</span>
              </div>
              <p className="text-[#2C3E50] font-medium">{project.teamSize}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#7A7A7A] mb-1">
                <Tag className="w-4 h-4" />
                <span className="text-sm">Client</span>
              </div>
              <p className="text-[#2C3E50] font-medium">{project.client}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#7A7A7A] mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Status</span>
              </div>
              <p className="text-[#27B0C4] font-medium">{project.status}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#27B0C4] hover:bg-[#2C3E50] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <ExternalLink className="w-5 h-5" />
              View Live Project
            </a>
            <a
              href='#'
              onClick={(e) => { e.preventDefault(); console.log('Contact us clicked'); }}
              className="flex-1 bg-[#F4F4F4] border border-[#D1D5DB] hover:bg-[#D1D5DB] text-[#2C3E50] px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <Globe className="w-5 h-5" />
              Contact Us to Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Project Tabs Component
const ProjectTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'solutions', label: 'Solutions', icon: Zap },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'technologies', label: 'Technologies', icon: Code }
  ];

  return (
    <div className="bg-[#F4F4F4] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#27B0C4] border-[#27B0C4]'
                  : 'text-[#7A7A7A] border-transparent hover:text-[#2C3E50]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Project Content Component
const ProjectContent = ({ project, activeTab }) => {
  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab project={project} />;
      case 'solutions':
        return <SolutionsTab project={project} />;
      case 'features':
        return <FeaturesTab project={project} />;
      case 'technologies':
        return <TechnologiesTab project={project} />;
      default:
        return <OverviewTab project={project} />;
    }
  }, [activeTab, project]);

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 ">
        {renderContent()}
      </div>
    </section>
  );
};

// Overview Tab Component
const OverviewTab = ({ project }) => (
  <div className="grid lg:grid-cols-3 gap-12 animate-fade-in-up">
    <div className="lg:col-span-2">
      <h2 className="text-3xl font-light mb-6 text-[#2C3E50]">Project Overview</h2>
      <div className="prose max-w-none text-[#2C3E50]">
        <p className="text-[#7A7A7A] text-lg leading-relaxed mb-6">
          {project.fullDescription}
        </p>
        <div className="bg-[#F4F4F4] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-medium mb-4 text-[#2C3E50]">Key Achievements</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {project.results.slice(0, 4).map((result, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#27B0C4] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#7A7A7A]">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-2xl font-light mb-6 text-[#2C3E50]">Project Details</h3>
      <div className="space-y-6">
        <div className="bg-[#F4F4F4] rounded-xl p-6">
          <h4 className="text-lg font-medium mb-4 text-[#2C3E50]">Project Info</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Duration:</span>
              <span className="text-[#2C3E50]">{project.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Team Size:</span>
              <span className="text-[#2C3E50]">{project.teamSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Year:</span>
              <span className="text-[#2C3E50]">{project.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Client:</span>
              <span className="text-[#2C3E50]">{project.client}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Status:</span>
              <span className="text-[#27B0C4]">{project.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Solutions Tab Component
const SolutionsTab = ({ project }) => (
  <div className="animate-fade-in-up">
    <h2 className="text-3xl font-light mb-12 text-center text-[#2C3E50]">Our Approach & Solutions</h2>

    <div className="grid lg:grid-cols-2 gap-12">
      {/* Challenges */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#2C3E50]/10 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-[#E67E22] rounded-full"></div>
          </div>
          <h3 className="text-2xl font-light text-[#2C3E50]">The Challenges</h3>
        </div>
        <ul className="space-y-4">
          {project.challenges.map((challenge, index) => (
            <li key={index} className="flex items-start gap-3 p-4 bg-[#F4F4F4] rounded-lg">
              <div className="w-2 h-2 bg-[#E67E22] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[#7A7A7A]">{challenge}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Solutions */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#2C3E50]/10 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-[#27B0C4] rounded-full"></div>
          </div>
          <h3 className="text-2xl font-light text-[#2C3E50]">Our Solutions</h3>
        </div>
        <ul className="space-y-4">
          {project.solutions.map((solution, index) => (
            <li key={index} className="flex items-start gap-3 p-4 bg-[#F4F4F4] rounded-lg">
              <div className="w-2 h-2 bg-[#27B0C4] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[#7A7A7A]">{solution}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// Features Tab Component
const FeaturesTab = ({ project }) => (
  <div className="animate-fade-in-up">
    <h2 className="text-3xl font-light mb-8 text-center text-[#2C3E50]">Key Features</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {project.features.map((feature, index) => (
        <div
          key={index}
          className="bg-[#F4F4F4] rounded-xl p-6 shadow-md hover:bg-[#E5E7EB] transition-all duration-300 transform hover:scale-105"
          style={{
            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#27B0C4]/10 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-[#27B0C4]" />
            </div>
            <h3 className="font-medium text-lg text-[#2C3E50]">{feature}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Technologies Tab Component
const TechnologiesTab = ({ project }) => (
  <div className="animate-fade-in-up">
    <h2 className="text-3xl font-light mb-8 text-center text-[#2C3E50]">Technologies & Tools</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {project.technologies.map((tech, index) => (
        <div
          key={index}
          className="bg-[#F4F4F4] rounded-xl p-6 text-center shadow-md hover:bg-[#E5E7EB] transition-all duration-300 transform hover:scale-105"
          style={{
            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
          }}
        >
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 bg-[#E5E7EB] text-[#2C3E50]`}>
            {tech.icon}
          </div>
          <h3 className="font-medium text-lg text-[#2C3E50]">{tech.name}</h3>
        </div>
      ))}
    </div>
  </div>
);

// Related Projects Section Component
const RelatedProjectsSection = ({ project }) => {
  const relatedProjects = projectsData.filter(
    (p) => p.category === project.category && p.id !== project.id
  );

  if (relatedProjects.length === 0) {
    return null;
  }
};

export default OurWorkPage;