import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Award, Clock, Globe } from 'lucide-react';

const AnimatedStats = () => {
    // Easily customizable data for the stats
    const stats = [
        {
            icon: Users,
            imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", // Example image URL
            endValue: 500,
            label: "Projects Delivered",
            suffix: "+",
            useImage: false, // Set to true to use image instead of icon
        },
        {
            icon: Award,
            imageUrl: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            endValue: 98,
            label: "Client Satisfaction",
            suffix: "%",
            useImage: true, // This one will use the image
        },
        {
            icon: Clock,
            imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            endValue: 24,
            label: "Support Available",
            suffix: "/7",
            useImage: false,
        },
        {
            icon: Globe,
            imageUrl: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            endValue: 50,
            label: "Countries Served",
            suffix: "+",
            useImage: true, // This one will use the image
        },
    ];

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const AnimatedNumber = ({ endValue, suffix = '' }) => {
        const [count, setCount] = useState(0);
        const animationRef = useRef(null);

        useEffect(() => {
            if (inView) {
                const duration = 2000; // Animation duration in milliseconds
                const startTime = performance.now();

                const animate = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic easing
                    const currentValue = Math.floor(easedProgress * endValue);
                    
                    setCount(currentValue);

                    if (progress < 1) {
                        animationRef.current = requestAnimationFrame(animate);
                    }
                };

                animationRef.current = requestAnimationFrame(animate);
            }

            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }, [inView, endValue]);

        return <span>{count}{suffix}</span>;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <section 
            className="py-20 bg-gray-100"
            ref={ref}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center"
                                variants={itemVariants}
                            >
                                {/* Display either icon or image based on useImage flag */}
                                {stat.useImage ? (
                                    <div className="w-16 h-16 mb-4 rounded-full overflow-hidden shadow-lg">
                                        <img 
                                            src={stat.imageUrl} 
                                            alt={stat.label}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <IconComponent 
                                        className="w-12 h-12 mb-4 text-teal-500" 
                                    />
                                )}
                                
                                <div className="text-5xl font-extrabold text-gray-800">
                                    <AnimatedNumber 
                                        endValue={stat.endValue} 
                                        suffix={stat.suffix} 
                                    />
                                </div>
                                <p className="mt-2 text-lg text-gray-600 font-medium">
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default AnimatedStats;