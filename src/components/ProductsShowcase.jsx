import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowRight, Zap, Shield, TrendingUp, Sparkles } from 'lucide-react';

// Reusable component for the animated numbers
const AnimatedCount = ({ value, label }) => {
  const ref = useRef(null);
  // `useInView` detects when the element is visible on the screen
  // `once: true` ensures the animation only runs the first time it appears
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // `useSpring` creates a motion value that animates smoothly
  const spring = useSpring(0, { stiffness: 100, damping: 20 });
  // `useTransform` rounds the spring value to a whole number for display
  const displayValue = useTransform(spring, (current) => Math.round(current));

  // Animate the value when the component is in view
  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, isInView]);

  return (
    <div ref={ref} className="inline-block">
      <motion.span>{displayValue}</motion.span>
      <span className="ml-0.5">{label}</span>
    </div>
  );
};

const CompactProductsShowcase = () => {
  const products = [
    { icon: TrendingUp, title: 'InvoicePro' },
    { icon: Shield, title: 'HRMSuite' },
    { icon: Zap, title: 'EcommerceMax' },
    { icon: Sparkles, title: 'ProjectFlow' }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#F4F4F4] text-[#2C3E50]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - More Spacing */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
            Our Products
          </h2>
          <p className="text-base md:text-lg text-[#7A7A7A] max-w-xl mx-auto">
            Discover powerful, integrated solutions designed to help your business thrive in a digital world.
          </p>
        </div>

        {/* Products Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-16">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl border border-[#F4F4F4] p-6 text-center hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1.5"
            >
              <div className="flex justify-center items-center h-12 w-12 mx-auto rounded-full bg-[#73CCD7]/10 mb-4 transition-colors group-hover:bg-[#73CCD7]">
                <product.icon className="w-6 h-6 text-[#73CCD7] transition-colors group-hover:text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#2C3E50] mb-1">
                {product.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Stats - Now with animated numbers */}
        <div className="flex flex-wrap justify-center items-center gap-y-4 gap-x-8 md:gap-x-16 mb-6 md:mb-8 text-center">
          <div className="relative">
            <div className="text-3xl md:text-4xl font-extrabold text-[#2C3E50]">
              <AnimatedCount value={50} label="+" />
            </div>
            <div className="text-sm md:text-base text-[#7A7A7A]">Products</div>
          </div>
          <div className="relative">
            <div className="text-3xl md:text-4xl font-extrabold text-[#2C3E50]">
              <AnimatedCount value={200} label="+" />
            </div>
            <div className="text-sm md:text-base text-[#7A7A7A]">Clients</div>
          </div>
          <div className="relative">
            <div className="text-3xl md:text-4xl font-extrabold text-[#2C3E50]">
              <AnimatedCount value={100} label="K+" />
            </div>
            <div className="text-sm md:text-base text-[#7A7A7A]">Users</div>
          </div>
        </div>

        {/* CTA - Themed with your highlight color */}
        <div className="text-center">
          <p className="text-base text-[#7A7A7A] mb-2">
            Ready to transform your business?
          </p>
          <a href="#contact">
            <button className="bg-[#73CCD7] hover:bg-[#27B0C4] text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
              Contact us
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompactProductsShowcase;