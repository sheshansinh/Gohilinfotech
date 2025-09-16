import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Award, Clock, Globe } from 'lucide-react';

const AnimatedStats = () => {
    // Easily customizable data for the stats
    const stats = [
        {
            icon: Users,
            imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            endValue: 500,
            label: "Projects Delivered",
            suffix: "+",
            useImage: false,
            color: "text-blue-500",
            bgColor: "bg-blue-50"
        },
        {
            icon: Award,
            imageUrl: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            endValue: 98,
            label: "Client Satisfaction",
            suffix: "%",
            useImage: true,
            color: "text-amber-500",
            bgColor: "bg-amber-50"
        },
        {
            icon: Clock,
            imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            endValue: 24,
            label: "Support Available",
            suffix: "/7",
            useImage: false,
            color: "text-emerald-500",
            bgColor: "bg-emerald-50"
        },
        {
            icon: Globe,
            imageUrl: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            endValue: 50,
            label: "Countries Served",
            suffix: "+",
            useImage: true,
            color: "text-purple-500",
            bgColor: "bg-purple-50"
        },
    ];

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const AnimatedNumber = ({ endValue, suffix = '' }) => {
        const [count, setCount] = useState(0);
        const animationRef = useRef(null);

        useEffect(() => {
            if (inView) {
                const duration = 2000;
                const startTime = performance.now();

                const animate = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easedProgress = 1 - Math.pow(1 - progress, 3);
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

        return (
            <span className="font-bold tracking-tight">
                {count}{suffix}
            </span>
        );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section 
            className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100"
            ref={ref}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center p-4 md:p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                            >
                                <div className={`p-3 mb-3 md:mb-4 rounded-full ${stat.bgColor}`}>
                                    {stat.useImage ? (
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                                            <img 
                                                src={stat.imageUrl} 
                                                alt={stat.label}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <IconComponent 
                                            className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} 
                                        />
                                    )}
                                </div>
                                
                                <div className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-1">
                                    <AnimatedNumber 
                                        endValue={stat.endValue} 
                                        suffix={stat.suffix} 
                                    />
                                </div>
                                <p className="text-xs md:text-sm text-gray-600 font-medium leading-tight">
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