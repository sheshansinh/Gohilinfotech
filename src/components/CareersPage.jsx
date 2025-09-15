import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Building2, Globe, HeartHandshake, User, Award, ArrowRight, ChevronDown, ChevronUp, X } from 'lucide-react';

const JOBS_API_URL = 'http://localhost/custom-sites/gipl_backend/jobs_api.php';
const APPLY_API_URL = 'http://localhost/custom-sites/gipl_backend/apply.php';

const CareersPage = () => {
    const [expandedJobId, setExpandedJobId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', resume: null });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [jobListings, setJobListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${JOBS_API_URL}?action=get_jobs`);
            const data = await response.json();
            
            if (data.error) {
                console.error("API Error:", data.error);
                setJobListings([]);
            } else {
                setJobListings(data.map(job => ({
                    ...job,
                    requirements: job.requirements_json || []
                })));
            }
        } catch (error) {
            console.error("Network Error fetching jobs:", error);
            setJobListings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const Section = ({ id, title, children, className = '' }) => {
        const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
        const variants = {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        };
        return (
            <motion.section id={id} ref={ref} className={`py-16 px-4 md:py-24 ${className}`} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants}>
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {title && (<h2 className="text-3xl sm:text-4xl font-bold text-center text-[#2C3E50] mb-12">{title}</h2>)}
                    {children}
                </div>
            </motion.section>
        );
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const toggleJobDetails = (id) => {
        setExpandedJobId(expandedJobId === id ? null : id);
    };

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume' && files[0] && files[0].size > 5000000) { // 5MB limit
            alert("Resume file size must be under 5MB.");
            e.target.value = null; // Clear the input
            return;
        }
        setFormData(prevState => ({ 
            ...prevState, 
            [name]: files ? files[0] : value 
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!selectedJob) return;

        const formDataObj = new FormData();
        formDataObj.append("job_id", selectedJob.id);
        formDataObj.append("name", formData.name);
        formDataObj.append("email", formData.email);
        if (formData.resume) {
            formDataObj.append("resume", formData.resume);
        }

        try {
            const res = await fetch(APPLY_API_URL, {
                method: "POST",
                body: formDataObj,
            });
            const data = await res.json();
            if (data.success) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setIsModalOpen(false);
                    setFormData({ name: '', email: '', resume: null });
                }, 2000);
            } else {
                console.error("Application submission failed:", data.message);
                alert("Failed to submit application: " + data.message);
            }
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const openModal = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="bg-[#FFFFFF] text-[#2C3E50] font-sans min-h-screen">
            <Section id="hero" className="bg-[#F4F4F4]">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <motion.div className="lg:w-1/2 text-center lg:text-left" initial="hidden" animate="visible" variants={containerVariants}>
                        <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C3E50] leading-tight mb-4" variants={itemVariants}>Plunge into your <br className="hidden lg:inline"/>Vocational Career</motion.h1>
                        <motion.p className="text-lg text-[#7A7A7A] mb-8 max-w-xl mx-auto lg:mx-0" variants={itemVariants}>Transform your skills, innovate the future, and become a part of a lifelong learning journey with us.</motion.p>
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-8">
                            <motion.button onClick={() => scrollToSection('job-listings')} className="bg-[#73CCD7] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#2C3E50] transition duration-300 flex items-center justify-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                Explore Open Positions
                                <ArrowRight size={18} className="ml-2" />
                            </motion.button>
                        </motion.div>
                        <motion.div variants={containerVariants} className="flex flex-wrap justify-center lg:justify-start items-center gap-6 md:gap-8">
                            <motion.img variants={itemVariants} src="https://placehold.co/100x40/E5E7EB/4B5563?text=Google" alt="Google Logo" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300"/>
                            <motion.img variants={itemVariants} src="https://placehold.co/100x40/E5E7EB/4B5563?text=Facebook" alt="Facebook Logo" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300"/>
                            <motion.img variants={itemVariants} src="https://placehold.co/100x40/E5E7EB/4B5563?text=Clutch" alt="Clutch Logo" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300"/>
                            <motion.img variants={itemVariants} src="https://placehold.co/100x40/E5E7EB/4B5563?text=Forbes" alt="Forbes Logo" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300"/>
                        </motion.div>
                    </motion.div>
                    <motion.div className="lg:w-1/2 flex items-center justify-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
                        <div className="w-full max-w-md aspect-video rounded-2xl shadow-xl overflow-hidden relative">
                            <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </motion.div>
                </div>
            </Section>
            
            <Section id="life-at-company" title="Life @ GIPL" className="bg-[#FFFFFF]">
                <motion.div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
                    <motion.div variants={itemVariants} className="order-2 md:order-1 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">About Our Culture</h3>
                        <p className="text-[#7A7A7A] leading-relaxed mb-4">Our vibrant workspace fosters creativity and teamwork. We encourage a healthy work-life balance and offer flexible schedules to accommodate your personal needs.</p>
                        <p className="text-[#7A7A7A] leading-relaxed">Join a team that celebrates diversity and values every individual's unique contribution. We provide a platform for you to grow both personally and professionally.</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="order-1 md:order-2">
                        <img src="https://placehold.co/600x400/BFDBFE/1E40AF?text=Office+Culture" alt="Office Culture" className="w-full h-auto rounded-3xl shadow-lg"/>
                    </motion.div>
                </motion.div>
            </Section>

            <Section id="working-at-company" title="Working @ GIPL" className="bg-[#F4F4F4]">
                <motion.div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
                    {[
                        { icon: <Briefcase size={36} className="text-[#27B0C4]" />, title: "Professional Development", description: "We invest in your growth with continuous learning opportunities, workshops, and mentorship programs." },
                        { icon: <Building2 size={36} className="text-[#27B0C4]" />, title: "Growth-Oriented Environment", description: "Our flat hierarchy and open-door policy encourage innovation and direct communication." },
                        { icon: <Globe size={36} className="text-[#27B0C4]" />, title: "Global Exposure", description: "Work on international projects and collaborate with diverse teams from around the world." },
                        { icon: <HeartHandshake size={36} className="text-[#27B0C4]" />, title: "Collaborative Team", description: "Join a supportive team where everyone's voice is heard and contributions are valued." },
                        { icon: <User size={36} className="text-[#27B0C4]" />, title: "Empowerment & Autonomy", description: "We trust our employees to take ownership of their work and make impactful decisions." },
                        { icon: <Award size={36} className="text-[#27B0C4]" />, title: "Recognition & Rewards", description: "Hard work doesn't go unnoticed. We have a robust system to recognize and reward exceptional performance." },
                    ].map((item, index) => (
                        <motion.div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center text-center" variants={itemVariants}>
                            <div className="p-4 rounded-full mb-6">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">{item.title}</h3>
                            <p className="text-[#7A7A7A] leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            <Section id="job-listings" title="Open Positions">
                <motion.p className="text-center text-[#7A7A7A] max-w-2xl mx-auto mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>Find the perfect role for you and take the next step in your career.</motion.p>
                <div className="space-y-6 max-w-4xl mx-auto">
                    {loading ? (
                        <div className="text-center py-12 text-lg">Loading jobs...</div>
                    ) : jobListings.length === 0 ? (
                        <div className="text-center py-12"><div className="bg-[#F4F4F4] rounded-2xl p-8"><Briefcase size={48} className="mx-auto text-[#7A7A7A] mb-4" /><p className="text-[#7A7A7A] text-lg">No job openings at the moment.</p><p className="text-[#7A7A7A]">Please check back later for new opportunities.</p></div></div>
                    ) : (
                        jobListings.map((job) => (
                            <motion.div key={job.id} className="bg-[#F4F4F4] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }}>
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleJobDetails(job.id)}>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-[#2C3E50] mb-1">{job.title}</h3>
                                        <p className="text-[#7A7A7A]">{job.location}</p>
                                    </div>
                                    <motion.div className="ml-4" animate={{ rotate: expandedJobId === job.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                        <ChevronDown size={24} className="text-[#27B0C4]" />
                                    </motion.div>
                                </div>
                                <AnimatePresence>
                                    {expandedJobId === job.id && (
                                        <motion.div className="mt-4 pt-4 border-t border-[#7A7A7A]" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                                            <p className="text-[#7A7A7A] mb-4 leading-relaxed">{job.description}</p>
                                            {job.requirements && job.requirements.length > 0 && (<><h4 className="font-semibold text-[#2C3E50] mb-3">Requirements:</h4><ul className="list-disc list-inside space-y-2 text-[#7A7A7A] mb-6">{job.requirements.map((req, i) => (<li key={i} className="leading-relaxed">{req}</li>))}</ul></>)}
                                            <button onClick={() => openModal(job)} className="bg-[#E67E22] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#2C3E50] transition duration-300">Apply Now</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </div>
            </Section>
            
            <AnimatePresence>
                {isModalOpen && selectedJob && (
                    <motion.div className="fixed inset-0 z-50 bg-[#2C3E50] bg-opacity-75 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 mx-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-[#7A7A7A] hover:text-[#2C3E50] transition-colors duration-200" aria-label="Close modal">
                                <X size={24} />
                            </button>
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">Apply for {selectedJob.title}</h3>
                                <p className="text-sm text-[#7A7A7A]">{selectedJob.location}</p>
                            </div>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-[#2C3E50] mb-2">Full Name *</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 border border-[#7A7A7A] rounded-lg focus:ring-2 focus:ring-[#27B0C4] focus:border-[#27B0C4] transition duration-200" placeholder="Enter your full name"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50] mb-2">Email Address *</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 border border-[#7A7A7A] rounded-lg focus:ring-2 focus:ring-[#27B0C4] focus:border-[#27B0C4] transition duration-200" placeholder="Enter your email address"/>
                                </div>
                                <div>
                                    <label htmlFor="resume" className="block text-sm font-medium text-[#2C3E50] mb-2">Upload Resume *</label>
                                    <div className="border-2 border-dashed border-[#7A7A7A] rounded-lg p-6 text-center hover:border-[#27B0C4] transition duration-200">
                                        <input type="file" id="resume" name="resume" onChange={handleFormChange} required className="hidden" accept=".pdf,.doc,.docx"/>
                                        <label htmlFor="resume" className="cursor-pointer block">
                                            <div className="text-[#27B0C4] mb-2"><Briefcase size={24} className="mx-auto" /></div>
                                            <p className="text-sm text-[#7A7A7A] mb-1">{formData.resume ? formData.resume.name : 'Click to upload resume'}</p>
                                            <p className="text-xs text-[#7A7A7A]">PDF, DOC, DOCX (Max 5MB)</p>
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-[#E67E22] text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:bg-[#2C3E50] transition duration-300 flex items-center justify-center" disabled={isSubmitted}>
                                    {isSubmitted ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </form>
                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <div className="text-center space-y-4">
                                            <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center mx-auto">
                                                <svg className="w-8 h-8 text-[#27B0C4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <h4 className="text-xl font-bold text-[#2C3E50]">Application Submitted!</h4>
                                            <p className="text-[#7A7A7A]">Thank you for your interest in {selectedJob.title}. We will review your application and be in touch shortly.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CareersPage;