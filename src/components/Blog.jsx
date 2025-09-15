import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rss, ArrowRight, ArrowLeft, Twitter, Linkedin, Github, Eye, Zap, Tag, ChevronDown, Check } from 'lucide-react';

// --- API Service for Blog Posts ---
const BLOG_API_URL = 'http://localhost/custom-sites/gipl_backend/blog_api.php';
const BACKEND_BASE_URL = 'http://localhost/custom-sites/gipl_backend';

const fetchPosts = async () => {
    try {
        const response = await fetch(`${BLOG_API_URL}?action=all_posts`);
        const data = await response.json();
        if (data.error) {
            console.error('API Error:', data.error);
            return [];
        }
        return data.map(post => ({
            ...post,
            tags: post.tags_json || [],
            author: { name: post.author_name, avatar: post.author_avatar },
            featured: post.featured == 1,
            // Make sure the main image URL is absolute
            image: post.image ? (post.image.startsWith('http') ? post.image : `${BACKEND_BASE_URL}/${post.image}`) : ''
        }));
    } catch (error) {
        console.error('Error fetching all blog posts:', error);
        return [];
    }
};

const fetchPostDetails = async (id) => {
    try {
        const response = await fetch(`${BLOG_API_URL}?action=post_details&id=${id}`);
        const data = await response.json();
        if (data.error) {
            console.error('API Error:', data.error);
            return null;
        }
        
        // This is a crucial part: ensuring the rich text content has correct image paths
        const updatedContent = data.content_html.replace(
            /(src|href)="uploads\/(.*?)"/g,
            `$1="${BACKEND_BASE_URL}/uploads/$2"`
        );
        
        return {
            ...data,
            tags: data.tags_json || [],
            faqs: data.faqs_json || [],
            author: { name: data.author_name, avatar: data.author_avatar },
            featured: data.featured == 1,
            show_demo_button: data.show_demo_button == 1,
            content_html: updatedContent,
            gallery_images: data.gallery_images_json || [],
            // Make sure the main image URL is absolute
            image: data.image ? (data.image.startsWith('http') ? data.image : `${BACKEND_BASE_URL}/${data.image}`) : ''
        };
    } catch (error) {
        console.error('Error fetching post details:', error);
        return null;
    }
};

// Color palette and general style constants
const PALETTE = {
    primary: '#27B0C4',
    secondary: '#E67E22',
    dark: '#2C3E50',
    light: '#F4F4F4',
    white: '#FFFFFF',
    text: '#7A7A7A',
};

// Reusable components (no changes)
const AnimatedHeading = ({ children }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };
    return (
        <motion.h2
            ref={ref}
            className="text-3xl md:text-4xl font-light text-center p-10"
            style={{ color: PALETTE.dark }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
        >
            {children}
        </motion.h2>
    );
};

const AnimatedContainer = ({ children }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

const AnimatedItem = ({ children }) => {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };
    return <motion.div variants={variants}>{children}</motion.div>;
};

// --- Main BlogPage Component ---
const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true);
            const data = await fetchPosts();
            setPosts(data);
            setLoading(false);
        };
        getPosts();
    }, []);

    const handlePostSelect = useCallback(async (id) => {
        setLoading(true);
        const postDetails = await fetchPostDetails(id);
        // Safely set the post details only if they are valid
        if (postDetails) {
            setSelectedPost(postDetails);
        } else {
            console.error("Failed to load post details. Post ID:", id);
            setSelectedPost(null);
        }
        setLoading(false);
    }, []);

    if (selectedPost) {
        return <BlogDetailPage post={selectedPost} onBack={() => setSelectedPost(null)} />;
    }

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading articles...</div>;
    }

    return <BlogList onPostSelect={handlePostSelect} posts={posts} />;
};

const BlogList = ({ onPostSelect, posts }) => {
    const categories = ['all', ...new Set(posts.map(post => post.category))];
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const featuredPosts = posts.filter(post => post.featured);
    const filteredPosts = posts.filter(post => {
        const matchesFilter = filter === 'all' || post.category === filter;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <HeroSection />

            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <AnimatedHeading>Featured Stories</AnimatedHeading>
                    <AnimatedContainer>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                            {featuredPosts.map((post) => (
                                <BlogCard
                                    key={post.id}
                                    post={post}
                                    onClick={() => onPostSelect(post.id)}
                                />
                            ))}
                        </div>
                    </AnimatedContainer>
                </div>
            </section>

            <section className="bg-gray-50 ">
                <div className="container mx-auto px-4">
                    <AnimatedHeading>All Articles</AnimatedHeading>
                    
                    <div className="flex flex-wrap gap-4 mb-10 justify-center">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-6 py-3 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm w-full md:w-auto"
                        />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.a)}
                            className="px-6 py-3 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm w-full md:w-auto cursor-pointer"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <AnimatedContainer>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-7">
                            {filteredPosts.map((post) => (
                                <BlogCard key={post.id} post={post} onClick={() => onPostSelect(post.id)} />
                            ))}
                            {filteredPosts.length === 0 && (
                                <div className="text-center sm:col-span-2 lg:col-span-3 text-gray-500 py-10">
                                    <p>No articles found. Try adjusting your search or filters.</p>
                                </div>
                            )}
                        </div>
                    </AnimatedContainer>
                </div>
            </section>
        </div>
    );
};

const HeroSection = () => (
    <section className="bg-gradient-to-br from-[#2C3E50] to-[#4A647B] text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
            <AnimatedItem>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex justify-center mb-4"
                    style={{ color: PALETTE.primary }}
                >
                    <Rss size={60} strokeWidth={1.5} />
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                    Our Latest Insights and Stories
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Stay updated with the newest trends, expert advice, and exciting news from our team.
                </p>
            </AnimatedItem>
        </div>
    </section>
);

const BlogCard = ({ post, onClick }) => (
    <AnimatedItem>
        <motion.div
            onClick={onClick}
            className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group bg-white`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="relative overflow-hidden">
                <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                {post.featured && (
                    <span className="absolute top-4 left-4 bg-yellow-400 text-gray-900 text-xs px-3 py-1 rounded-full font-semibold z-10">Featured</span>
                )}
            </div>
            <div className="p-6">
                <span className="inline-block text-sm font-semibold uppercase mb-2" style={{ color: PALETTE.primary }}>
                    {post.category}
                </span>
                <h3 className="text-xl font-bold mb-2 leading-tight" style={{ color: PALETTE.dark }}>
                    {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                </p>
                <div className="flex items-center text-gray-500 text-xs mt-4">
                    <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <div className="flex-1">
                        <span className="font-semibold text-gray-700">{post.author.name}</span>
                        <span className="block text-gray-500">{post.date}</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight size={24} style={{ color: PALETTE.primary }} />
                    </div>
                </div>
            </div>
        </motion.div>
    </AnimatedItem>
);

const BlogDetailPage = ({ post, onBack }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const [faqOpen, setFaqOpen] = useState(null);
    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [post]);

    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <motion.button
                onClick={onBack}
                className="fixed top-8 left-4 md:top-12 md:left-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors z-50 p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back to Blog</span>
            </motion.button>
            
            <div className="relative">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90"></div>
                <div className="container mx-auto px-4 -mt-36 relative z-10 text-white">
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-8 md:mb-12">
                            <span className="inline-block text-sm font-semibold uppercase mb-2" style={{ color: PALETTE.primary }}>
                                {post.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-white">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-4 text-gray-300 mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
                                    <span>by {post.author.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={16} />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.tags?.map((tag, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </header>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.article
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={variants}
                    className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 lg:p-16 -mt-32"
                >
                    <section className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: post.content_html }}></section>
                    
                    {post.gallery_images && post.gallery_images.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h3 className="text-2xl font-bold mb-6" style={{ color: PALETTE.dark }}>Image Gallery</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {post.gallery_images.map((image, index) => (
                                    <motion.div
                                        key={index}
                                        className="rounded-xl overflow-hidden shadow-md"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                    >
                                        <img
                                            src={image}
                                            alt={`Gallery image ${index + 1}`}
                                            className="w-full h-auto object-cover"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {post.faqs && post.faqs.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h3 className="text-2xl font-bold mb-6" style={{ color: PALETTE.dark }}>Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                {post.faqs.map((faq, index) => (
                                    <div key={index} className="rounded-xl shadow-sm overflow-hidden border border-gray-200">
                                        <button className="w-full text-left p-6 flex justify-between items-center transition-all duration-300 hover:bg-gray-50" onClick={() => toggleFaq(index)}>
                                            <span className="text-lg font-semibold" style={{ color: PALETTE.dark }}>{faq.question}</span>
                                            <ChevronDown className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${faqOpen === index ? 'rotate-180' : 'rotate-0'}`}/>
                                        </button>
                                        {faqOpen === index && (<div className="px-6 pb-6 animate-fadeIn text-gray-600" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {post.show_demo_button && (
                        <div className="mt-12 text-center pt-8 border-t border-gray-200">
                            <a href="#" className="inline-flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 group" style={{ backgroundColor: PALETTE.primary, color: PALETTE.white }}>
                                Schedule a Demo
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <h3 className="text-xl font-semibold mb-4" style={{ color: PALETTE.dark }}>Share this article</h3>
                        <div className="flex gap-4">
                            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                                <Linkedin size={24} />
                            </a>
                            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition-colors">
                                <Github size={24} />
                            </a>
                        </div>
                    </div>
                </motion.article>
            </div>
        </div>
    );
};

export default BlogPage;