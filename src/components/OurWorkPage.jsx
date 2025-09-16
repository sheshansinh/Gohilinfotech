import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRight, ExternalLink, Calendar, User, Tag, ArrowLeft, Search, Filter, Briefcase, Zap, Award, TrendingUp, Eye, Star, Globe, Code } from 'lucide-react';

// API base URL - adjust this to match your backend
const API_BASE_URL = 'http://localhost/custom-sites/gipl_backend';

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

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#27B0C4]"></div>
  </div>
);

// Error Display Component
const ErrorDisplay = ({ message, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
    <div className="text-center p-8 bg-[#F4F4F4] rounded-xl">
      <div className="text-2xl text-[#E67E22] mb-4">Error</div>
      <div className="text-[#7A7A7A] mb-6">{message}</div>
      <button 
        onClick={onRetry} 
        className="bg-[#27B0C4] hover:bg-[#2C3E50] text-white px-6 py-2 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

// Main Our Work Page Component
const OurWorkPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects data from API
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/projects_api.php?action=get_projects`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Transform API data to match your frontend structure
      const transformedData = data.map(project => ({
        ...project,
        image: project.main_image_url,
        shortDescription: project.short_description,
        fullDescription: project.full_description,
        liveLink: project.live_link,
        teamSize: project.team_size,
        technologies: project.technologies ? project.technologies.map(tech => ({
          name: tech.name,
          icon: tech.icon_string || '🔧' // fallback icon
        })) : [],
        challenges: project.challenges || [],
        solutions: project.solutions || [],
        results: project.results || [],
        features: project.features || [],
        images: project.images || [project.main_image_url]
      }));
      
      setProjectsData(transformedData);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to fetch projects: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const categories = ['all', ...new Set(projectsData.map(project => project.category))];

  const filteredProjects = projectsData.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredProjects = projectsData.filter(project => project.featured);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchProjects} />;
  }

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
            <button className="bg-[#73CCD7] hover:bg-[#27B0C4] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
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

// Statistics data
const statsData = [
  { label: 'Projects Completed', value: 50, icon: Briefcase, suffix: '+' },
  { label: 'Happy Clients', value: 30, icon: User, suffix: '+' },
  { label: 'Years of Experience', value: 5, icon: Award, suffix: '+' },
  { label: 'Innovative Solutions', value: 25, icon: Zap, suffix: '+' }
];

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
              ({category === 'all' ? filteredProjects.length : filteredProjects.filter(p => p.category === category).length})
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
              src={project.images && project.images[currentImageIndex] ? project.images[currentImageIndex] : project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity "></div>
          </div>
          {project.images && project.images.length > 1 && (
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
          )}
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
        {project.results && project.results.length > 0 && (
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
        )}
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
        {project.challenges && project.challenges.length > 0 ? (
          <ul className="space-y-4">
            {project.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-[#F4F4F4] rounded-lg">
                <div className="w-2 h-2 bg-[#E67E22] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#7A7A7A]">{challenge}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#7A7A7A]">No challenges data available.</p>
        )}
      </div>

      {/* Solutions */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#2C3E50]/10 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-[#27B0C4] rounded-full"></div>
          </div>
          <h3 className="text-2xl font-light text-[#2C3E50]">Our Solutions</h3>
        </div>
        {project.solutions && project.solutions.length > 0 ? (
          <ul className="space-y-4">
            {project.solutions.map((solution, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-[#F4F4F4] rounded-lg">
                <div className="w-2 h-2 bg-[#27B0C4] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#7A7A7A]">{solution}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#7A7A7A]">No solutions data available.</p>
        )}
      </div>
    </div>
  </div>
);

// Features Tab Component
const FeaturesTab = ({ project }) => (
  <div className="animate-fade-in-up">
    <h2 className="text-3xl font-light mb-8 text-center text-[#2C3E50]">Key Features</h2>
    {project.features && project.features.length > 0 ? (
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
    ) : (
      <p className="text-center text-[#7A7A7A]">No features data available.</p>
    )}
  </div>
);

// Technologies Tab Component
const TechnologiesTab = ({ project }) => (
  <div className="animate-fade-in-up">
    <h2 className="text-3xl font-light mb-8 text-center text-[#2C3E50]">Technologies & Tools</h2>
    {project.technologies && project.technologies.length > 0 ? (
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
    ) : (
      <p className="text-center text-[#7A7A7A]">No technologies data available.</p>
    )}
  </div>
);

// Related Projects Section Component
const RelatedProjectsSection = ({ project }) => {
  // This would need access to all projects to find related ones
  // For now, we'll just return null
  return null;
};

export default OurWorkPage;