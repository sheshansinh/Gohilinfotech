import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Tag,
  TrendingUp,
  Eye,
  Code,
  Zap,
  Star,
  Clock,
  Users,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Globe,
  Smartphone,
  Monitor,
  Play,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Bookmark
} from 'lucide-react';

// Sample project data - replace with your actual project
const projectData = {
  id: 1,
  title: 'SS Trading Platform',
  subtitle: 'Enterprise B2B Trading Solution',
  category: 'eCommerce',
  shortDescription: 'A comprehensive B2B trading platform revolutionizing supplier-retailer relationships.',
  fullDescription: 'SS Trading UK is a comprehensive B2B trading platform that revolutionizes how small and medium retailers connect with suppliers. The platform features advanced inventory management, real-time pricing updates, automated order processing, and integrated logistics tracking. Built with scalability in mind, it handles thousands of daily transactions while maintaining optimal performance. The system includes multi-vendor support, automated invoicing, comprehensive analytics dashboard, and advanced reporting capabilities.',

  // Project Details
  duration: '8 months',
  teamSize: '6 developers',
  client: 'SS Trading UK',
  status: 'Live',
  year: '2024',
  budget: '$150,000',
  industry: 'B2B Trading',
  platform: 'Web & Mobile',

  // Links
  liveLink: 'https://ss-trading-demo.vercel.app',
  githubLink: 'https://github.com/yourusername/ss-trading',
  caseStudyLink: '#',

  // Images
  heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
  images: [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2080&auto=format&fit=crop'
  ],

  // Technologies
  technologies: [
    { name: 'React', icon: '⚛️', color: 'bg-blue-500', description: 'Frontend framework for building user interfaces' },
    { name: 'Node.js', icon: '🟢', color: 'bg-green-500', description: 'Backend runtime environment' },
    { name: 'Python', icon: '🐍', color: 'bg-yellow-500', description: 'Data processing and AI algorithms' },
    { name: 'PostgreSQL', icon: '🗄️', color: 'bg-blue-600', description: 'Primary database for storing application data' },
    { name: 'Redis', icon: '🔴', color: 'bg-red-500', description: 'In-memory data structure store for caching' },
    { name: 'AWS', icon: '☁️', color: 'bg-orange-500', description: 'Cloud infrastructure and deployment' },
    { name: 'Docker', icon: '🐳', color: 'bg-blue-400', description: 'Containerization platform' },
    { name: 'GraphQL', icon: '💜', color: 'bg-purple-600', description: 'API query language' }
  ],

  // Project Timeline
  timeline: [
    {
      phase: 'Research & Planning',
      duration: '2 weeks',
      description: 'Market research, user interviews, and technical planning',
      completed: true
    },
    {
      phase: 'Design & Prototyping',
      duration: '3 weeks',
      description: 'UI/UX design, wireframing, and interactive prototypes',
      completed: true
    },
    {
      phase: 'Backend Development',
      duration: '8 weeks',
      description: 'API development, database design, and system architecture',
      completed: true
    },
    {
      phase: 'Frontend Development',
      duration: '10 weeks',
      description: 'User interface implementation and integration',
      completed: true
    },
    {
      phase: 'Testing & Deployment',
      duration: '3 weeks',
      description: 'Quality assurance, performance testing, and launch',
      completed: true
    },
    {
      phase: 'Maintenance & Updates',
      duration: 'Ongoing',
      description: 'Continuous improvements and feature additions',
      completed: false
    }
  ],

  // Key Features
  features: [
    {
      title: 'Multi-vendor Marketplace',
      description: 'Support for multiple suppliers with individual dashboards and analytics',
      icon: Globe
    },
    {
      title: 'Real-time Inventory',
      description: 'Live inventory tracking with automated stock level notifications',
      icon: BarChart3
    },
    {
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting with business intelligence insights',
      icon: TrendingUp
    },
    {
      title: 'Mobile Responsive',
      description: 'Optimized experience across all devices and screen sizes',
      icon: Smartphone
    },
    {
      title: 'Automated Invoicing',
      description: 'Generate and send invoices automatically with payment tracking',
      icon: CheckCircle
    },
    {
      title: 'API Integration',
      description: 'Seamless integration with existing business systems',
      icon: Code
    }
  ],

  // Challenges & Solutions
  challenges: [
    {
      title: 'Real-time Data Synchronization',
      description: 'Keeping inventory data synchronized across multiple suppliers in real-time',
      impact: 'High',
      solution: 'Implemented event-driven architecture using Redis pub/sub pattern'
    },
    {
      title: 'High-Volume Transactions',
      description: 'System needed to handle thousands of concurrent transactions',
      impact: 'Critical',
      solution: 'Used database sharding and connection pooling with horizontal scaling'
    },
    {
      title: 'Complex Pricing Algorithms',
      description: 'Dynamic pricing with multiple discount tiers and bulk pricing',
      impact: 'Medium',
      solution: 'Built flexible pricing engine with rule-based calculation system'
    },
    {
      title: 'Payment Processing',
      description: 'Secure handling of financial transactions across multiple vendors',
      impact: 'High',
      solution: 'Integrated multiple payment gateways with escrow functionality'
    }
  ],

  // Results & Metrics
  results: [
    { metric: 'Transaction Speed', value: '300%', description: 'Increase in order processing speed', trend: 'up' },
    { metric: 'System Uptime', value: '99.9%', description: 'Uptime with zero data loss incidents', trend: 'stable' },
    { metric: 'Cost Reduction', value: '40%', description: 'Reduction in inventory management overhead', trend: 'up' },
    { metric: 'User Growth', value: '250%', description: 'Increase in active users within 6 months', trend: 'up' },
    { metric: 'Revenue Impact', value: '$2.5M', description: 'Additional revenue generated for clients', trend: 'up' },
    { metric: 'Customer Satisfaction', value: '4.8/5', description: 'Average customer satisfaction score', trend: 'stable' }
  ],

  // Testimonials
  testimonials: [
    {
      name: 'James Wilson',
      role: 'Operations Director',
      company: 'SS Trading UK',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3',
      quote: 'This platform has transformed how we manage our supply chain. The real-time analytics and automated processes have saved us countless hours.'
    },
    {
      name: 'Sarah Chen',
      role: 'Supply Chain Manager',
      company: 'RetailPlus Ltd',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c2f96cb4?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3',
      quote: 'The inventory management features are outstanding. We can now track stock levels across multiple suppliers in real-time.'
    }
  ]
};

const ProjectDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === projectData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? projectData.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation Header */}
      <ProjectHeader
        title={projectData.title}
        liked={liked}
        setLiked={setLiked}
        bookmarked={bookmarked}
        setBookmarked={setBookmarked}
      />

      {/* Hero Section */}
      <ProjectHero
        project={projectData}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        nextImage={nextImage}
        prevImage={prevImage}
        setIsImageModalOpen={setIsImageModalOpen}
      />

      {/* Navigation Tabs */}
      <ProjectNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <ProjectContent project={projectData} activeTab={activeTab} />

      {/* Image Modal */}
      {isImageModalOpen && (
        <ImageModal
          images={projectData.images}
          currentIndex={currentImageIndex}
          onClose={() => setIsImageModalOpen(false)}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
};

// Project Header Component
const ProjectHeader = ({ title, liked, setLiked, bookmarked, setBookmarked }) => (
  <header className="sticky top-0 bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Portfolio</span>
          </button>
          <div className="hidden md:block">
            <h1 className="text-lg font-medium truncate max-w-md">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-lg transition-colors ${
              liked ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-pink-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2 rounded-lg transition-colors ${
              bookmarked ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-blue-400'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="hidden sm:flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors">
            <MessageCircle className="w-4 h-4" />
            Contact
          </button>
        </div>
      </div>
    </div>
  </header>
);

// Project Hero Section
const ProjectHero = ({
  project,
  currentImageIndex,
  setCurrentImageIndex,
  nextImage,
  prevImage,
  setIsImageModalOpen
}) => (
  <section className="py-8 lg:py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden group">
            <img
              src={project.images[currentImageIndex]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
              onClick={() => setIsImageModalOpen(true)}
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {project.images.length}
            </div>

            {/* Expand Icon */}
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? 'border-pink-500 scale-105'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <img
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Project Information */}
        <div className="space-y-6">
          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wider">
                {project.category}
              </span>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                {project.status}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">{project.title}</h1>
            <p className="text-xl text-gray-400 mb-4">{project.subtitle}</p>
            <p className="text-gray-300 leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Project Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Duration</span>
              </div>
              <p className="text-white font-semibold">{project.duration}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">Team</span>
              </div>
              <p className="text-white font-semibold">{project.teamSize}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Tag className="w-4 h-4" />
                <span className="text-sm">Year</span>
              </div>
              <p className="text-white font-semibold">{project.year}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-sm">Client</span>
              </div>
              <p className="text-white font-semibold">{project.client}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Monitor className="w-4 h-4" />
                <span className="text-sm">Platform</span>
              </div>
              <p className="text-white font-semibold">{project.platform}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-sm">Industry</span>
              </div>
              <p className="text-white font-semibold">{project.industry}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <ExternalLink className="w-5 h-5" />
              View Live Demo
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <Github className="w-5 h-5" />
              Source Code
            </a>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Project Navigation Tabs
const ProjectNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'technologies', label: 'Tech Stack', icon: Code },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'challenges', label: 'Challenges', icon: Zap },
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'testimonials', label: 'Reviews', icon: MessageCircle }
  ];

  return (
    <nav className="bg-gray-800/50 sticky top-16 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-pink-400 border-pink-400 bg-pink-500/10'
                  : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Main Content Area
const ProjectContent = ({ project, activeTab }) => {
  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection project={project} />;
      case 'technologies':
        return <TechnologiesSection project={project} />;
      case 'timeline':
        return <TimelineSection project={project} />;
      case 'challenges':
        return <ChallengesSection project={project} />;
      case 'results':
        return <ResultsSection project={project} />;
      case 'testimonials':
        return <TestimonialsSection project={project} />;
      default:
        return <OverviewSection project={project} />;
    }
  }, [activeTab, project]);

  return (
    <main className="py-8 lg:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-fade-in-up">
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

// Overview Section
const OverviewSection = ({ project }) => (
  <div className="space-y-12">
    {/* Key Features */}
    <div>
      <h2 className="text-3xl font-bold mb-8">Key Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Quick Stats */}
    <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Project Impact</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {project.results.slice(0, 6).map((result, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-pink-400 mb-2">
              {result.value}
            </div>
            <div className="text-sm text-gray-400 mb-1">{result.metric}</div>
            <div className="text-xs text-gray-500">{result.description}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Technologies Section
const TechnologiesSection = ({ project }) => (
  <div className="space-y-12">
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">Technologies & Tools</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {project.technologies.map((tech, index) => (
          <div
            key={index}
            className="bg-gray-800/50 rounded-xl p-6 text-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group"
          >
            <div className={`w-16 h-16 ${tech.color} rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform`}>
              {tech.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{tech.name}</h3>
            <p className="text-gray-400 text-sm">{tech.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Architecture Diagram */}
    <div className="bg-gray-800/50 rounded-2xl p-8">
      <h3 className="text-2xl font-bold mb-6">System Architecture</h3>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-10 h-10 text-blue-400" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Frontend</h4>
          <p className="text-gray-400 text-sm">React-based user interface with responsive design and modern UX patterns</p>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-10 h-10 text-green-400" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Backend</h4>
          <p className="text-gray-400 text-sm">Node.js APIs with Python microservices for data processing and analytics</p>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-10 h-10 text-purple-400" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Infrastructure</h4>
          <p className="text-gray-400 text-sm">AWS cloud infrastructure with auto-scaling and high availability</p>
        </div>
      </div>
    </div>
  </div>
);

// Timeline Section
const TimelineSection = ({ project }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold mb-8 text-center">Development Timeline</h2>

    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-purple-600 transform md:-translate-x-1/2"></div>

      {/* Timeline Items */}
      <div className="space-y-12">
        {project.timeline.map((phase, index) => (
          <div
            key={index}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 -ml-2 top-0 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 z-10"></div>
            <div
              className={`flex-1 md:w-1/2 p-4 md:p-8 rounded-xl shadow-lg bg-gray-800/50 transition-all duration-300 hover:bg-gray-800 ${
                index % 2 === 0 ? 'md:mr-10' : 'md:ml-10 text-right md:text-left'
              }`}
            >
              <h3 className="text-lg font-semibold text-pink-400">{phase.phase}</h3>
              <p className="text-sm text-gray-400 mb-2">{phase.duration}</p>
              <p className="text-gray-300">{phase.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Challenges Section
const ChallengesSection = ({ project }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold mb-8 text-center">Challenges & Solutions</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {project.challenges.map((challenge, index) => (
        <div
          key={index}
          className="bg-gray-800/50 rounded-xl p-6 transition-all duration-300 hover:bg-gray-800"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-bold text-red-400">{challenge.title}</h3>
          </div>
          <p className="text-gray-300 mb-4">{challenge.description}</p>
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">Solution:</span>
          </div>
          <p className="text-gray-300 mt-2">{challenge.solution}</p>
        </div>
      ))}
    </div>
  </div>
);

// Results Section
const ResultsSection = ({ project }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold mb-8 text-center">Impact & Results</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {project.results.map((result, index) => (
        <div
          key={index}
          className="bg-gray-800/50 rounded-xl p-6 text-center transition-all duration-300 hover:bg-gray-800"
        >
          <div className="text-4xl font-bold text-pink-400 mb-2">
            {result.value}
          </div>
          <h3 className="text-xl font-semibold mb-2">{result.metric}</h3>
          <p className="text-gray-400">{result.description}</p>
        </div>
      ))}
    </div>
  </div>
);

// Testimonials Section
const TestimonialsSection = ({ project }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold mb-8 text-center">Customer Testimonials</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {project.testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-gray-800/50 rounded-xl p-6 shadow-lg border border-gray-800 transition-all duration-300 hover:bg-gray-800"
        >
          <div className="flex items-center mb-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-pink-500"
            />
            <div>
              <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
              <p className="text-gray-400 text-sm">{testimonial.role}, {testimonial.company}</p>
            </div>
          </div>
          <blockquote className="text-gray-300 italic leading-relaxed">
            "{testimonial.quote}"
          </blockquote>
        </div>
      ))}
    </div>
  </div>
);

// Image Modal Component
const ImageModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black/50">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>

      <div className="relative w-full max-w-5xl aspect-video bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Project screenshot ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />

        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 rounded-full bg-black/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 rounded-full bg-black/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailPage;