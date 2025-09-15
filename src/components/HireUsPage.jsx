import React, { useState, useEffect, useRef } from 'react';
import DeveloperHiringGuide from './DeveloperHiringGuide';
import PortfolioSection from './PortfolioSection';
import HireHeroSection from './HireHeroSection'
import {
    Star, Users, Award, Clock, ArrowRight, CheckCircle, Mail, Phone, MapPin,
    Code, Smartphone, Palette, Database, Globe, Shield, Zap, Target,
    ChevronDown, Play, Calendar, MessageSquare, Heart, Check, Rocket, Briefcase
} from 'lucide-react';

import { fetchCompanyData, fetchServices, fetchServiceRoles } from './api';

const HireUsPage = () => {
    // State for dynamic data (Hero & Services)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [companyData, setCompanyData] = useState({});
    const [serviceCategories, setServiceCategories] = useState({});

    // State for static content interactivity
    const [isVisible, setIsVisible] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [activeTab, setActiveTab] = useState('development');
    const [faqOpen, setFaqOpen] = useState(null);
    const [activeTechCategory, setActiveTechCategory] = useState('trending');
    const [formData, setFormData] = useState({
        name: '', email: '', service: '', role: '', budget: '', message: '', timeline: ''
    });

    const contactFormRef = useRef(null);
    const contactSectionRef = useRef(null);

    const BACKEND_BASE_URL = 'http://localhost/custom-sites/gipl_backend';
    const API_BASE_URL = 'http://localhost/custom-sites/gipl_backend/api.php';

    const iconMap = {
        Code: Code, Smartphone: Smartphone, Palette: Palette, Database: Database, Globe: Globe,
        Shield: Shield, Zap: Zap, Target: Target, Briefcase: Briefcase, Rocket: Rocket,
        MessageSquare: MessageSquare, Users: Users, Award: Award, Clock: Clock
    };

    useEffect(() => {
        const getPageData = async () => {
            setLoading(true);
            try {
                const [companyInfo, services, roles] = await Promise.all([
                    fetchCompanyData(),
                    fetchServices(),
                    fetchServiceRoles()
                ]);

                if (companyInfo && services && roles) {
                    setCompanyData(companyInfo);
                    
                    const organizedServices = services.reduce((acc, service) => {
                        if (!acc[service.category]) {
                            acc[service.category] = [];
                        }
                        acc[service.category].push({
                            ...service,
                            roles: roles.filter(role => parseInt(role.service_id) === parseInt(service.id))
                        });
                        return acc;
                    }, {});
                    setServiceCategories(organizedServices);

                    const firstCategory = Object.keys(organizedServices)[0];
                    if (firstCategory) {
                        setActiveTab(firstCategory);
                    }
                } else {
                    throw new Error('Failed to fetch essential data.');
                }
            } catch (err) {
                console.error("Data fetching error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
                setIsVisible(true);
            }
        };

        getPageData();
    }, []);

    const colors = {
        deepCharcoal: '#2C3E50', deepTeal: '#27B0C4', cleanWhite: '#FFFFFF', softGrey: '#F4F4F4', 
        lightCyan: '#73CCD7', energizingOrange: '#E67E22', mutedGrey: '#7A7A7A'
    };
    const heroStats = [
        { icon: Users, number: "500+", label: "Projects Delivered" },
        { icon: Award, number: "98%", label: "Client Satisfaction" },
        { icon: Clock, number: "24/7", label: "Support Available" },
        { icon: Globe, number: "50+", label: "Countries Served" }
    ];
    const processSteps = [
        { step: "01", title: "Discovery & Planning", description: "We understand your requirements, goals, and create a detailed project roadmap.", icon: MessageSquare, duration: "1-2 days" },
        { step: "02", title: "Design & Prototype", description: "Create wireframes, mockups, and interactive prototypes for your approval.", icon: Palette, duration: "3-5 days" },
        { step: "03", title: "Development & Testing", description: "Build your solution with regular updates and thorough quality testing.", icon: Code, duration: "2-8 weeks" },
        { step: "04", title: "Launch & Support", description: "Deploy your project and provide ongoing maintenance and support.", icon: Zap, duration: "Ongoing" }
    ];
    const teamMembers = [
        { name: "Alex Rodriguez", role: "Lead Full-Stack Developer", experience: "8+ years", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", skills: ["React", "Node.js", "Python", "AWS"] },
        { name: "Sarah Chen", role: "Senior UI/UX Designer", experience: "6+ years", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit-crop&crop=face", skills: ["Figma", "Adobe XD", "User Research", "Prototyping"] },
        { name: "Mike Johnson", role: "Mobile App Developer", experience: "7+ years", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit-crop&crop=face", skills: ["React Native", "Flutter", "iOS", "Android"] },
        { name: "Emma Wilson", role: "DevOps Engineer", experience: "5+ years", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit-crop&crop=face", skills: ["AWS", "Docker", "Kubernetes", "CI/CD"] }
    ];
    const testimonials = [
        { name: "David Park", role: "CEO, TechStart Inc", content: "DevCraft delivered our e-commerce platform ahead of schedule. Their attention to detail and communication throughout the project was exceptional.", rating: 5, avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop&crop=face", project: "E-commerce Platform", result: "300% increase in sales" },
        { name: "Lisa Thompson", role: "Founder, HealthTech Solutions", content: "The mobile app they built for us is beautiful and performs flawlessly. Our users love the intuitive design and smooth functionality.", rating: 5, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit-crop&crop=face", project: "Healthcare Mobile App", result: "50K+ active users" },
        { name: "James Wilson", role: "CTO, FinanceFlow", content: "Professional team with deep technical expertise. They solved complex backend challenges and delivered a scalable solution.", rating: 5, avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit-crop&crop=face", project: "Financial Dashboard", result: "99.9% uptime achieved" }
    ];
    const faqs = [
        { question: "How do you ensure project quality?", answer: "We follow strict coding standards, conduct regular code reviews, perform comprehensive testing, and maintain clear documentation throughout the project lifecycle." },
        { question: "What is your typical project timeline?", answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during the planning phase." },
        { question: "Do you provide post-launch support?", answer: "Yes, we offer various maintenance packages including bug fixes, security updates, feature enhancements, and 24/7 monitoring services." },
        { question: "How do you handle project communication?", answer: "We use project management tools like Slack, Trello, and conduct weekly video calls. You'll have direct access to your project manager and development team." },
        { question: "What technologies do you specialize in?", answer: "We specialize in modern technologies including React, Node.js, Python, React Native, AWS, and various databases. We choose the best tech stack for your specific needs." }
    ];
    const portfolioProjects = [
        { title: "E-commerce Platform", category: "Web Development", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit-crop", description: "Modern e-commerce platform with advanced features", tech: ["React", "Node.js", "MongoDB", "Stripe"] },
        { title: "Healthcare Mobile App", category: "Mobile Development", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit-crop", description: "Patient management app for healthcare providers", tech: ["React Native", "Firebase", "Redux", "Node.js"] },
        { title: "Financial Dashboard", category: "Web Development", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit-crop", description: "Real-time financial data visualization dashboard", tech: ["Vue.js", "Python", "PostgreSQL", "Chart.js"] }
    ];
    const benefits = [
        { icon: CheckCircle, title: "Proven Expertise", description: "Our team consists of seasoned professionals with a track record of successful projects across various industries." },
        { icon: Shield, title: "Transparent Communication", description: "We keep you in the loop with regular updates, clear timelines, and direct access to your project team." },
        { icon: Heart, title: "Client-Centric Approach", description: "Your success is our priority. We listen to your needs and tailor solutions that are perfect for your business goals." },
        { icon: Zap, title: "Rapid Delivery", description: "Our agile methodology ensures efficient development cycles, getting your product to market faster without compromising quality." }
    ];
    const whyHireUsReasons = [
        "Dedicated project manager", "Quality assurance and testing", "Post-launch support and maintenance", "Scalable and secure solutions", "Cost-effective pricing models", "Data-driven strategy"
    ];
    const technologiesData = {
        trending: [ "Artificial Intelligence", "Machine Learning", "Data Science", "Data Analytics", "Computer Vision", "RPA", "AR / VR", "Chatbot", "Big Data", "Blockchain", "Internet of Things", "Serverless", "OTT" ],
        platforms: [ "AWS", "Google Cloud", "Azure", "Shopify", "WordPress", "Salesforce" ],
        programming: [ "React", "Node.js", "Python", "Java", "Swift", "Kotlin", "Go", "PHP" ]
    };
    const contactInfo = {
        email: "info@gohilinfotech.com", phone: "+91 79458 64006", address: "209, Aamrakunj Business Centre, Near Panchslok, Chandkheda Ahmedabad, Gujarat, India 382424", hours: "Mon-Fri 9AM-6PM PST"
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleServiceChange = (e) => {
        const selectedServiceTitle = e.target.value;
        setFormData(prevData => ({ ...prevData, service: selectedServiceTitle, role: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, action: 'submit_contact_form' }),
            });
            const result = await response.json();
            
            if (result.success) {
                alert('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.');
                setFormData({
                    name: '', email: '', service: '', role: '', budget: '', message: '', timeline: ''
                });
            } else {
                alert('Failed to send your message. Please try again later.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to send your message. Please check your network connection.');
        }
    };

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const handleRoleCardClick = (serviceTitle, roleName) => {
        setFormData(prevData => ({ ...prevData, service: serviceTitle, role: roleName }));
        if (contactFormRef.current) {
            contactFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleServiceCardClick = (service) => {
        setSelectedService(service.id);
    };

    const handleStartProjectClick = (e) => {
        e.preventDefault();
        contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const selectedServiceData = selectedService
        ? Object.values(serviceCategories).flat().find(s => parseInt(s.id) === parseInt(selectedService))
        : null;

    const availableRoles = formData.service
        ? Object.values(serviceCategories).flat().find(s => s.title === formData.service)?.roles || []
        : [];

    const customClasses = `
        .bg-deep-charcoal { background-color: ${colors.deepCharcoal}; }
        .text-deep-charcoal { color: ${colors.deepCharcoal}; }
        .bg-deep-teal { background-color: ${colors.deepTeal}; }
        .text-deep-teal { color: ${colors.deepTeal}; }
        .bg-soft-grey { background-color: ${colors.softGrey}; }
        .text-soft-grey { color: ${colors.softGrey}; }
        .bg-light-cyan { background-color: ${colors.lightCyan}; }
        .text-light-cyan { color: ${colors.lightCyan}; }
        .bg-energizing-orange { background-color: ${colors.energizingOrange}; }
        .text-energizing-orange { color: ${colors.energizingOrange}; }
        .bg-muted-grey { background-color: ${colors.mutedGrey}; }
        .text-muted-grey { color: ${colors.mutedGrey}; }
        .hover-bg-energizing-orange:hover { background-color: ${colors.energizingOrange}; }
        .border-deep-teal { border-color: ${colors.deepTeal}; }
        .border-energizing-orange { border-color: ${colors.energizingOrange}; }
        .from-deepTeal { --tw-gradient-from: ${colors.deepTeal} var(--tw-gradient-from-position); --tw-gradient-to: rgba(39, 176, 196, 0); }
        .to-lightCyan { --tw-gradient-to: ${colors.lightCyan} var(--tw-gradient-to-position); }
    `;

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-xl" style={{ color: colors.deepCharcoal }}>Loading...</div>;
    }
    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-xl text-red-600">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: colors.cleanWhite }}>
            <style>{customClasses}</style>
            
            {/* Hero Section (Dynamic) */}
            <div className="relative pt-16" style={{ backgroundColor: colors.softGrey }}>
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full animate-pulse" style={{ backgroundColor: `${colors.lightCyan}30` }}></div>
                    <div className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full animate-bounce" style={{ backgroundColor: `${colors.deepTeal}30` }}></div>
                    <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full animate-pulse delay-1000" style={{ backgroundColor: `${colors.lightCyan}30` }}></div>
                </div>
                <div className={`relative container mx-auto px-6 py-24 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ backgroundColor: `${colors.deepTeal}1A`, color: colors.deepTeal }}>
                            <Star className="w-4 h-4 mr-2" />
                            Trusted by 500+ companies worldwide
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{ color: colors.deepCharcoal }}>
                            {companyData.heroTitle}
                        </h1>
                        <p className="text-xl md:text-2xl mb-12 leading-relaxed" style={{ color: colors.mutedGrey }}>
                            {companyData.heroSubtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <a href="#" onClick={handleStartProjectClick} className="text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group" style={{ backgroundColor: colors.energizingOrange, hover: { backgroundColor: '#c7691c' }}}>
                                Start Your Project
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            {heroStats.map((stat, index) => {
                                const HeroIcon = stat.icon;
                                return (
                                    <div key={index} className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                                        <HeroIcon className="w-8 h-8 mx-auto mb-4" style={{ color: colors.deepTeal }}/>
                                        <div className="text-3xl font-bold mb-2" style={{ color: colors.deepCharcoal }}>{stat.number}</div>
                                        <div className="text-sm" style={{ color: colors.mutedGrey }}>{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section (Static) */}
            <div id="benefits" className="py-24" style={{ backgroundColor: colors.cleanWhite }}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.deepCharcoal }}>Benefits of Partnering with Us</h2>
                        <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.mutedGrey }}>We are more than just a service provider; we are your strategic technology partner</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: colors.softGrey }}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${colors.deepTeal}1A`, color: colors.deepTeal }}>
                                    <benefit.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ color: colors.deepCharcoal }}>{benefit.title}</h3>
                                <p style={{ color: colors.mutedGrey }}>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Section (Dynamic) */}
            <div id="services" className="py-24" style={{ backgroundColor: colors.cleanWhite }}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-4">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.deepCharcoal }}>Our Services</h2>
                        <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.mutedGrey }}>From concept to deployment, we offer comprehensive digital solutions to bring your vision to life</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {Object.keys(serviceCategories).map((category) => (
                            <button
                                key={category}
                                onClick={() => { setActiveTab(category); setSelectedService(null); }}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === category ? 'text-white' : 'text-deep-charcoal hover:bg-soft-grey'}`}
                                style={{ backgroundColor: activeTab === category ? colors.energizingOrange : colors.softGrey }}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>

                    {selectedServiceData ? (
                        <div className="space-y-8 animate-fadeIn">
                            <button onClick={() => setSelectedService(null)} className="flex items-center font-semibold mb-6" style={{ color: colors.deepTeal }}>
                                <ArrowRight className="w-5 h-5 transform rotate-180 mr-2" /> Back to Services
                            </button>
                            <div className="text-center">
                                <h3 className="text-3xl font-bold" style={{ color: colors.deepCharcoal }}>{selectedServiceData.title}</h3>
                                <p className="max-w-2xl mx-auto mt-2" style={{ color: colors.mutedGrey }}>{selectedServiceData.description}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {selectedServiceData.roles.map((role, index) => {
                                    const RoleIcon = iconMap[role.icon];
                                    return (
                                        <div key={index} className="group rounded-2xl shadow-lg p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" onClick={() => handleRoleCardClick(selectedServiceData.title, role.name)} style={{ backgroundColor: colors.softGrey }}>
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${colors.deepTeal}1A`, color: colors.deepTeal }}>
                                                {role.image_url ? (
                                                    <img src={`${BACKEND_BASE_URL}/${role.image_url}`} alt={role.name} className="w-8 h-8 object-contain" />
                                                ) : RoleIcon ? (
                                                    <RoleIcon className="w-8 h-8" />
                                                ) : null}
                                            </div>
                                            <h4 className="text-xl font-bold mb-2" style={{ color: colors.deepCharcoal }}>{role.name}</h4>
                                            <p className="mb-4" style={{ color: colors.mutedGrey }}>{role.description}</p>
                                            <div className="mt-auto">
                                               <a href="#" onClick={handleStartProjectClick}>
                                                <span className="font-semibold group-hover:underline" style={{ color: colors.deepTeal }}>Hire Me <ArrowRight className="w-4 h-4 inline-block ml-1" /></span>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Object.keys(serviceCategories).length > 0 && serviceCategories[activeTab] && serviceCategories[activeTab].map((service) => {
                                const ServiceIcon = iconMap[service.icon];
                                return (
                                    <div key={service.id} className={`group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border-2 ${selectedService == service.id ? 'border-energizing-orange' : 'border-transparent'}`} onClick={() => handleServiceCardClick(service)} style={{ backgroundColor: colors.softGrey }}>
                                        {service.popular && (<div className="absolute -top-4 left-1/2 transform -translate-x-1/2"><span className="text-white py-2 px-4 rounded-full text-sm font-semibold" style={{ backgroundColor: colors.energizingOrange }}>Most Popular</span></div>)}
                                        <div className="p-8">
                                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-deep-teal to-light-cyan mb-6`}>
                                                {service.image_url ? (
                                                    <img src={`${BACKEND_BASE_URL}/${service.image_url}`} alt={service.title} className="w-8 h-8 object-contain" style={{ filter: 'invert(100%)' }} />
                                                ) : ServiceIcon ? (
                                                    <ServiceIcon className="w-8 h-8" style={{ color: colors.lightCyan }}/>
                                                ) : null}
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4 group-hover:text-deep-teal transition-colors" style={{ color: colors.deepCharcoal }}>{service.title}</h3>
                                            <p className="mb-6" style={{ color: colors.mutedGrey }}>{service.description}</p>
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <div className="text-3xl font-bold" style={{ color: colors.deepTeal }}>{service.price}</div>
                                                    <div className="text-sm" style={{ color: colors.mutedGrey }}>{service.hourlyRate}</div>
                                                </div>
                                            </div>
                                            <button onClick={() => handleServiceCardClick(service)} className="w-full text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group hover-bg-energizing-orange" style={{ backgroundColor: colors.deepTeal }}>
                                                View Roles
                                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            
            <div id="process" className="py-24" style={{ backgroundColor: colors.softGrey }}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.deepCharcoal }}>Our Process</h2>
                        <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.mutedGrey }}>A proven methodology that ensures successful project delivery every time</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full" style={{ backgroundColor: colors.cleanWhite }}>
                                    <div className="flex items-center mb-6">
                                        <div className="text-3xl font-bold mr-4" style={{ color: colors.deepTeal }}>{step.step}</div>
                                        {step.icon && <step.icon className="w-8 h-8" style={{ color: colors.deepTeal }}/>}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4" style={{ color: colors.deepCharcoal }}>{step.title}</h3>
                                    <p className="mb-4" style={{ color: colors.mutedGrey }}>{step.description}</p>
                                    <div className="flex items-center text-sm" style={{ color: colors.deepTeal }}>
                                        <Clock className="w-4 h-4 mr-2" />
                                        {step.duration}
                                    </div>
                                </div>
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <ArrowRight className="w-8 h-8" style={{ color: '#E0E0E0' }}/>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div id="why-hire-us" className="" style={{ backgroundColor: colors.softGrey }}>
                <div className="container mx-auto px-6 p-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: `${colors.deepTeal}1A`, color: colors.deepTeal }}>
                                <Award className="w-4 h-4 mr-2" />
                                Our Commitment to You
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.deepCharcoal }}>Why Choose GohilInfotech?</h2>
                            <p className="text-xl mb-8" style={{ color: colors.mutedGrey }}>We believe in building lasting partnerships, not just projects. Our dedication to quality, transparency, and innovation sets us apart.</p>
                            <a href="#" onClick={handleStartProjectClick} className="text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center group hover-bg-energizing-orange transition-all" style={{ backgroundColor: colors.energizingOrange }}>Get Your Custom Proposal<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></a>
                        </div>
                        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {whyHireUsReasons.map((reason, index) => (
                                <div key={index} className="rounded-xl p-6 shadow-md flex items-start space-x-4 hover:shadow-lg transition-shadow" style={{ backgroundColor: colors.cleanWhite }}>
                                    <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: colors.deepTeal }}/>
                                    <p className="text-lg font-semibold" style={{ color: colors.mutedGrey }}>{reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <HireHeroSection />
            <DeveloperHiringGuide/>
            <PortfolioSection/>
            
            <div id="technologies" className="py-6" style={{ backgroundColor: colors.softGrey }}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-4 mt-3">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.deepCharcoal }}>Advanced Technologies We Hold Expertise In</h2>
                        <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.mutedGrey }}>We use the most advanced technologies to deliver world-class solutions and the varied demands of clients in the minimum possible time.</p>
                    </div>
                    <div className="rounded-2xl p-6 sm:p-12 text-white" >
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-shrink-0 w-full md:w-60 rounded-xl p-4 space-y-2" style={{ backgroundColor: '#73CCD70' }}>
                                {Object.keys(technologiesData).map((category) => (
                                    <button key={category} onClick={() => setActiveTechCategory(category)} className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-between ${activeTechCategory === category ? 'text-white' : 'hover:text-white'}`} style={{ backgroundColor: activeTechCategory === category ? colors.lightCyan : 'transparent', color: activeTechCategory === category ? colors.cleanWhite : '#A0A0A0' }}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 p-4 rounded-xl" style={{ backgroundColor: '#233240' }}>
                                {technologiesData[activeTechCategory].map((tech, index) => (
                                    <div key={index} className="rounded-lg p-4 text-center text-sm font-semibold transition-colors cursor-pointer" style={{ backgroundColor: '#E67E22', color: colors.cleanWhite, hover: { backgroundColor: colors.deepTeal } }}>{tech}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="py-24" style={{ backgroundColor: colors.cleanWhite }}>
                <div className="container mx-auto p-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.deepCharcoal }}>What Our Clients Say</h2>
                        <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.mutedGrey }}>Don't just take our word for it - hear from the businesses we've helped succeed</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="rounded-2xl p-8 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: colors.softGrey }}>
                                <div className="flex mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-current" style={{ color: colors.energizingOrange }}/>))}
                                </div>
                                <p className="mb-6 italic" style={{ color: colors.mutedGrey }}>"{testimonial.content}"</p>
                                <div className="flex items-center mb-4">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                                    <div>
                                        <h4 className="font-semibold" style={{ color: colors.deepCharcoal }}>{testimonial.name}</h4>
                                        <p className="text-sm" style={{ color: colors.mutedGrey }}>{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="border-t pt-4 mt-4" style={{ borderColor: '#e5e7eb' }}>
                                    <p className="text-sm font-medium" style={{ color: colors.mutedGrey }}>{testimonial.project}</p>
                                    <p className="text-sm" style={{ color: colors.deepCharcoal }}>{testimonial.result}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="py-16" style={{ backgroundColor: colors.softGrey }}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.deepCharcoal }}>Frequently Asked Questions</h2>
                        <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.mutedGrey }}>Find answers to the most common questions about our services and process</p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="rounded-xl shadow-md overflow-hidden" style={{ backgroundColor: colors.cleanWhite }}>
                                <button className="w-full text-left p-6 flex justify-between items-center transition-all duration-300 hover:bg-soft-grey" onClick={() => toggleFaq(index)}>
                                    <span className="text-lg font-semibold" style={{ color: colors.deepCharcoal }}>{faq.question}</span>
                                    <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${faqOpen === index ? 'rotate-180' : 'rotate-0'}`} style={{ color: colors.mutedGrey }}/>
                                </button>
                                {faqOpen === index && (<div className="px-6 pb-6 animate-fadeIn" style={{ color: colors.mutedGrey }}><p>{faq.answer}</p></div>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div id="contact" ref={contactSectionRef} className="py-4" style={{ backgroundColor: colors.cleanWhite }}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-4">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.deepCharcoal }}>Get a Free Quote</h2>
                        <p className="text-base md:text-lg max-w-3xl mx-auto" style={{ color: colors.mutedGrey }}>Tell us about your project and we'll get back to you with a detailed proposal</p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4">
                        <div className="w-full lg:w-1/2 rounded-2xl p-4 shadow-lg" style={{ backgroundColor: colors.softGrey }}>
                            <form onSubmit={handleSubmit} className="space-y-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-0.5" style={{ color: colors.deepCharcoal }}>Full Name</label>
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2 transition-shadow" style={{ backgroundColor: colors.cleanWhite, borderColor: '#ccc', focus: { ringColor: colors.deepTeal } }}/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-0.5" style={{ color: colors.deepCharcoal }}>Email Address</label>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2 transition-shadow" style={{ backgroundColor: colors.cleanWhite, borderColor: '#ccc', focus: { ringColor: colors.deepTeal } }}/>
                                </div>
                                <div>
                                    <label htmlFor="service" className="block text-sm font-medium mb-0.5" style={{ color: colors.deepCharcoal }}>Service of Interest</label>
                                    <select name="service" id="service" required value={formData.service} onChange={handleServiceChange} className="w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2 transition-shadow" style={{ backgroundColor: colors.cleanWhite, borderColor: '#ccc', focus: { ringColor: colors.deepTeal } }}>
                                        <option value="">Select a Service</option>
                                        {Object.entries(serviceCategories).map(([category, services]) => (
                                            <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                                                {services.map(service => (<option key={service.id} value={service.title}>{service.title}</option>))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                                {formData.service && (
                                    <div className="animate-fadeIn">
                                        <label htmlFor="role" className="block text-sm font-medium mb-0.5" style={{ color: colors.deepCharcoal }}>Specific Role</label>
                                        <select name="role" id="role" required value={formData.role} onChange={handleInputChange} className="w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2 transition-shadow" style={{ backgroundColor: colors.cleanWhite, borderColor: '#ccc', focus: { ringColor: colors.deepTeal } }}>
                                            <option value="">Select a Role</option>
                                            {availableRoles.map((role, idx) => (<option key={idx} value={role.name}>{role.name}</option>))}
                                        </select>
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-0.5" style={{ color: colors.deepCharcoal }}>Project Details</label>
                                    <textarea name="message" id="message" rows="2" required value={formData.message} onChange={handleInputChange} className="w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2 transition-shadow" style={{ backgroundColor: colors.cleanWhite, borderColor: '#ccc', focus: { ringColor: colors.deepTeal } }}></textarea>
                                </div>
                                <button type="submit" className="w-full text-white font-semibold py-2 rounded-xl transition-colors" style={{ backgroundColor: colors.deepTeal, hover: { backgroundColor: colors.energizingOrange } }}>Submit Request</button>
                            </form>
                        </div>
                        <div className="w-full lg:w-1/3 rounded-2xl p-8 shadow-lg space-y-8" style={{ backgroundColor: colors.softGrey }}>
                            <div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.deepCharcoal }}>Contact Information</h3>
                                <p style={{ color: colors.mutedGrey }}>You can also reach out to us directly via:</p>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex items-center">
                                    <Mail className="w-6 h-6 flex-shrink-0 mr-4" style={{ color: colors.deepTeal }}/>
                                    <div>
                                        <div className="text-sm font-medium" style={{ color: colors.mutedGrey }}>Email</div>
                                        <a href={`mailto:${contactInfo.email}`} className="hover:underline" style={{ color: colors.deepTeal }}>{contactInfo.email}</a>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <Phone className="w-6 h-6 flex-shrink-0 mr-4" style={{ color: colors.deepTeal }}/>
                                    <div>
                                        <div className="text-sm font-medium" style={{ color: colors.mutedGrey }}>Phone</div>
                                        <a href={`tel:${contactInfo.phone}`} className="hover:underline" style={{ color: colors.deepCharcoal }}>{contactInfo.phone}</a>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <MapPin className="w-6 h-6 flex-shrink-0 mr-4" style={{ color: colors.deepTeal }}/>
                                    <div>
                                        <div className="text-sm font-medium" style={{ color: colors.mutedGrey }}>Office</div>
                                        <p style={{ color: colors.deepCharcoal }}>{contactInfo.address}</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <Calendar className="w-6 h-6 flex-shrink-0 mr-4" style={{ color: colors.deepTeal }}/>
                                    <div>
                                        <div className="text-sm font-medium" style={{ color: colors.mutedGrey }}>Hours</div>
                                        <p style={{ color: colors.deepCharcoal }}>{contactInfo.hours}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HireUsPage;