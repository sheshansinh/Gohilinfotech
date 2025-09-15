import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Heart,
  Lightbulb,
  Shield,
  Briefcase,
  Twitter,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Link } from "react-router-dom"; // Using react-router-dom for Link

// Reusable component for section headings with animation
const AnimatedHeading = ({ children }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.h2
      ref={ref}
      className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-12 text-center"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.h2>
  );
};

// Reusable component for animated containers with staggered children
const AnimatedContainer = ({ children }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

// Reusable component for animated items
const AnimatedItem = ({ children }) => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  return <motion.div variants={variants}>{children}</motion.div>;
};

// New component for the 3D model
const ThreeDModel = () => {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/chair-wood/model.gltf"
  );
  return <primitive object={scene} scale={[1.5, 1.5, 1.5]} />;
};

// New component for the values slider
const ValuesSlider = () => {
  const values = [
    {
      title: "Our customers are our core",
      description:
        "We believe in building lasting relationships. Our clients' goals and visions are our priority. We are committed to delivering excellence.",
      icon: Heart,
    },
    {
      title: "We are innovators",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus in nisi ea laboriosam. Aliquid, mollitia earum!",
      icon: Lightbulb,
    },
    {
      title: "We believe in transparency",
      description:
        "Honesty and clarity are at the heart of our operations. We ensure our clients are informed and involved at every step of the process.",
      icon: Shield,
    },
    {
      title: "We value creativity",
      description:
        "Creativity is the engine of our work. We foster an environment where new ideas flourish, and unique solutions are celebrated.",
      icon: Briefcase,
    },
  ];

  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);
  const [ref, inView] = useInView();
  const [isHovered, setIsHovered] = useState(false);

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector(".flex-shrink-0").offsetWidth;
      const currentScroll = sliderRef.current.scrollLeft;
      const maxScroll =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

      if (currentScroll >= maxScroll - 5) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({
          left: cardWidth + 32,
          behavior: "smooth",
        });
      }
    }
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
  };

  const startAutoSlide = () => {
    if (!isHovered && !autoSlideInterval.current) {
      autoSlideInterval.current = setInterval(scrollRight, 3000); // Changed from 4000 to 3000
    }
  };

  useEffect(() => {
    if (inView) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
    return () => stopAutoSlide();
  }, [inView, isHovered]);

  const handleManualScroll = (direction) => {
    stopAutoSlide();
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector(".flex-shrink-0").offsetWidth;
      const scrollAmount =
        direction === "left" ? -(cardWidth + 32) : cardWidth + 32;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
    setTimeout(startAutoSlide, 5000);
  };

  return (
    <section className="bg-[#F4F4F4] py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <AnimatedHeading>Our values are part of everything</AnimatedHeading>
      <div className="container mx-auto max-w-6xl relative">
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {values.map((value, index) => (
            <motion.div key={index} className="flex-shrink-0 w-80 snap-center">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center cursor-pointer min-h-[250px]"
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 text-[#27B0C4]">
                  {value.icon &&
                    React.createElement(value.icon, {
                      size: 48,
                      strokeWidth: 1.5,
                    })}
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#7A7A7A]">{value.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => handleManualScroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#7A7A7A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => handleManualScroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors hidden md:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#7A7A7A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

const AboutUsPage = () => {
  const teams = {
    Founders: [
      {
        name: "John Doe",
        title: "CEO",
        image: "https://placehold.co/200x200/F3F4F6/6B7280?text=JD",
        social: [
          { platform: "twitter", url: "https://twitter.com/johndoe" },
          { platform: "linkedin", url: "https://linkedin.com/in/johndoe" },
        ],
      },
      {
        name: "Jane Smith",
        title: "COO",
        image: "https://placehold.co/200x200/F3F4F6/6B7280?text=JS",
        social: [
          { platform: "twitter", url: "https://twitter.com/janesmith" },
          { platform: "linkedin", url: "https://linkedin.com/in/janesmith" },
        ],
      },
    ],
    Design: [
      {
        name: "Sam Wilson",
        title: "Lead Designer",
        image: "https://placehold.co/200x200/F3F4F6/6B7280?text=SW",
        social: [
          { platform: "instagram", url: "https://instagram.com/samwilson" },
          { platform: "github", url: "https://github.com/samwilson" },
        ],
      },
      {
        name: "Emily White",
        title: "UX/UI Designer",
        image: "https://placehold.co/200x200/F3F4F6/6B7280?text=EW",
        social: [
          { platform: "linkedin", url: "https://linkedin.com/in/emilywhite" },
        ],
      },
      {
        name: "Chris Evans",
        title: "3D Artist",
        image: "https://placehold.co/200x200/F3F4F6/6B7280?text=CE",
        social: [
          { platform: "instagram", url: "https://instagram.com/chrisevans" },
        ],
      },
    ],
    Development: [
      {
        name: "Michael Lee",
        title: "Head of Development",
        image: "https://placehold.co/200x200/F3F4F6/6B7280?text=ML",
        social: [
          { platform: "github", url: "https://github.com/michaellee" },
          { platform: "linkedin", url: "https://linkedin.com/in/michaellee" },
        ],
      },
      {
        name: "Sarah Chen",
        title: "Frontend Engineer",
        image: "https://placehold.co/200x200/F3F4F6/6B7280?text=SC",
        social: [
          { platform: "twitter", url: "https://twitter.com/sarahchen" },
          { platform: "github", url: "https://github.com/sarahchen" },
        ],
      },
      {
        name: "David Kim",
        title: "Backend Engineer",
        image: "https://placehold.co/200x200/F3F4F6/6B7280?text=DK",
        social: [
          { platform: "linkedin", url: "https://linkedin.com/in/davidkim" },
        ],
      },
      {
        name: "Olivia Rodriguez",
        title: "DevOps Engineer",
        image: "https://placehold.co/200x200/F3F4F6/6B7280?text=OR",
        social: [
          { platform: "github", url: "https://github.com/oliviarodriguez" },
        ],
      },
    ],
  };

  const [selectedTeam, setSelectedTeam] = useState("Founders");

  const teamVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const socialIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    instagram: Instagram,
  };

  const recognitionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-[#FFFFFF] text-[#2C3E50] font-sans">
      <main>
        {/* Hero Section */}
        <section className="bg-[#F4F4F4] py-20 md:py-32 px-4 sm:px-6 lg:px-8">
          <AnimatedContainer>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <AnimatedItem>
                <h1 className="text-4xl md:text-6xl font-extrabold text-[#2C3E50] mb-4 leading-tight">
                  We at <span className="text-[#27B0C4]">Gohil infotech</span>{" "}
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ratione, excepturi?.
                </h1>
                <p className="text-lg text-[#7A7A7A] mb-8">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugit, laborum.
                </p>
                <Link to="/contact">
                  <motion.button
                    className="bg-[#E67E22] hover:bg-[#2C3E50] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Let's Connect
                  </motion.button>
                </Link>
              </AnimatedItem>
              {/* 3D Model Section */}
              <div className="flex justify-center items-center h-full">
                <Canvas style={{ width: "100%", height: "400px" }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Suspense fallback={null}>
                    <ThreeDModel />
                    <OrbitControls />
                    <Environment preset="sunset" background />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </AnimatedContainer>
        </section>

        {/* Our Story Section */}
        <section className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <AnimatedContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <AnimatedItem>
                <h3 className="text-2xl md:text-3xl font-bold text-[#2C3E50] mb-4">
                  An idea hatched in a dorm room.
                </h3>
                <p className="text-[#7A7A7A] mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                  Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed
                  augue semper porta.
                </p>
                <div className="relative">
                  <motion.img
                    src="https://placehold.co/600x400/E5E7EB/4B5563"
                    alt="Dorm room"
                    className="rounded-lg shadow-xl w-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-[#27B0C4]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-2xl font-bold text-[#2C3E50] text-center md:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo perferendis, ex cupiditate est alias.
                </p>
              </AnimatedItem>
            </div>
          </AnimatedContainer>
        </section>

        {/* New Founder Quote Section */}
        <section class="bg-[#2C3E50] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div class="container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center md:text-left">
              <div class="flex flex-col items-center md:items-start md:order-2 lg:order-1">
                <img
                  src="https://placehold.co/400x300/F4F4F4/4B5563"
                  alt="Founders"
                  class="rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm mb-8"
                />

                <div class="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-12 mt-6">
                  <a
                    href="https://www.linkedin.com/in/nishant-verma"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex flex-col items-center p-4 rounded-full bg-[#73CCD7] shadow-lg hover:shadow-xl transition group min-w-[200px]"
                  >
                    <h3 class="text-lg sm:text-xl font-semibold text-[#F4F4F4] group-hover:text-[#2C3E50] flex items-center gap-2">
                      Darsan Gohil
                    </h3>
                    <p class="text-white text-sm sm:text-base">CEO | Founder</p>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/ishan-kumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex flex-col items-center p-4 rounded-full bg-[#73CCD7] shadow-lg hover:shadow-xl transition group min-w-[200px]"
                  >
                    <h3 class="text-lg sm:text-xl font-semibold text-[#F4F4F4] group-hover:text-[#2C3E50] flex items-center gap-2">
                      Chandrakant Rathod
                    </h3>
                    <p class="text-white text-sm sm:text-base">
                      VP | Co-Founder
                    </p>
                  </a>
                </div>
              </div>

              <div class="md:order-1 lg:order-2">
                <p class="text-xl sm:text-2xl md:text-3xl font-semibold italic text-white leading-relaxed">
                  "Have you ever wondered what if I were alive during the
                  Internet boom? Could I have contributed? Could I have helped
                  further mankind? Today we have a similar opportunity at Gohil
                  Infotech, will contribute directly to the future that we will
                  live in. The drawings we draw on the virtual walls might seem
                  like a small cog in the greater scheme of things, but so did
                  Thomson’s discovery of the electron."
                </p>
                <p class="mt-6 text-[#F4F4F4] font-bold text-base sm:text-lg">
                  - Ishan Kumar Giddu, CEO & Founder
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section - Updated with buttons and dynamic content and better responsiveness */}
        <section className="bg-[#F4F4F4] py-20 px-4 sm:px-6 lg:px-8">
          <AnimatedHeading>
            Meet the people behind Gohil infotech
          </AnimatedHeading>
          <div className="flex flex-wrap justify-center mb-12 gap-2 sm:gap-4">
            {Object.keys(teams).map((teamName) => (
              <motion.button
                key={teamName}
                onClick={() => setSelectedTeam(teamName)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
                  selectedTeam === teamName
                    ? "bg-[#E67E22] text-white shadow-lg"
                    : "bg-white text-[#7A7A7A] hover:bg-[#F4F4F4]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {teamName}
              </motion.button>
            ))}
          </div>

          <AnimatedContainer>
            <div className="container mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimatePresence>
                  {teams[selectedTeam].map((member, index) => (
                    <motion.div
                      key={member.name}
                      className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group relative overflow-hidden"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={teamVariants}
                    >
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-40 h-40 rounded-full mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <h3 className="text-xl font-semibold text-[#2C3E50]">
                        {member.name}
                      </h3>
                      <p className="text-[#7A7A7A]">{member.title}</p>

                      <motion.div
                        className="mt-2 flex justify-center gap-4 transition-all duration-300"
                        initial={{ opacity: 0, y: 0 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        variants={{
                          hidden: { opacity: 0, y: 0 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.4 },
                          },
                        }}
                      >
                        {member.social &&
                          member.social.map((social, socialIndex) => {
                            const IconComponent = socialIcons[social.platform];
                            return (
                              <motion.a
                                key={socialIndex}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#7A7A7A] hover:text-[#E67E22] transition"
                                whileHover={{ scale: 1.2 }}
                              >
                                {IconComponent && <IconComponent size={20} />}
                              </motion.a>
                            );
                          })}
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </AnimatedContainer>
        </section>

        {/* Recognitions Section - Updated with a continuous sliding loop */}
        <section className="container mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          <AnimatedHeading>Recent Recognitions</AnimatedHeading>
          <motion.div
            className="flex flex-row flex-nowrap w-max"
            animate={{ x: "-50%" }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            <div className="flex justify-center items-center flex-nowrap gap-10 min-w-max">
              <motion.div className="flex justify-center flex-shrink-0">
                <span className="text-[#7A7A7A] text-3xl font-semibold">
                  siliconindia
                </span>
              </motion.div>
              <motion.div className="flex justify-center flex-shrink-0">
                <span className="text-[#7A7A7A] text-3xl font-semibold">
                  INDIA TODAY
                </span>
              </motion.div>
              <motion.div className="flex justify-center flex-shrink-0">
                <span className="text-[#7A7A7A] text-3xl font-semibold">
                  TI2
                </span>
              </motion.div>
              <motion.div className="flex justify-center flex-shrink-0">
                <span className="text-[#7A7A7A] text-3xl font-semibold">
                  GLOBAL HUES
                </span>
              </motion.div>
            </div>
            {/* Second copy for a seamless loop */}
            <div className="flex justify-center items-center flex-nowrap gap-10 min-w-max">
              <motion.div className="flex justify-center flex-shrink-0">
                <span className="text-[#7A7A7A] text-3xl font-semibold">
                  siliconindia
                </span>
              </motion.div>
              <motion.div className="flex justify-center flex-shrink-0">
                <span className="text-[#7A7A7A] text-3xl font-semibold">
                  INDIA TODAY
                </span>
              </motion.div>
              <motion.div className="flex justify-center flex-shrink-0">
                <span className="text-[#7A7A7A] text-3xl font-semibold">
                  TI2
                </span>
              </motion.div>
              <motion.div className="flex justify-center flex-shrink-0">
                <span className="text-[#7A7A7A] text-3xl font-semibold">
                  GLOBAL HUES
                </span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Values Section */}
        <ValuesSlider />

        {/* Find Us Section - Updated with working links and map */}
        <section className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <AnimatedHeading>Find Us Now!</AnimatedHeading>
          <AnimatedContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <AnimatedItem>
                {/* The map container */}
                <motion.div
                  className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Replace this iframe with your own Google Maps embed code */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.3474709115903!2d72.56783177509487!3d23.120971179104963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xcc09acc1ef7104f%3A0xf69adf204766cc1!2sGohil%20Infotech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1757652057200!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Gohil Infotech Location on Google Maps"
                  ></iframe>
                </motion.div>
              </AnimatedItem>
              <AnimatedItem>
                <div className="flex flex-col justify-center space-y-6">
                  <div className="flex items-start space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#27B0C4] flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2C3E50]">
                        Our Office
                      </h3>
                      <p className="text-[#7A7A7A]">
                        209, Aamrakunj Business Centre,<br />
                         Near Panchslok,<br />  
                        Chandkheda Ahmedabad,<br />
                        Gujarat, India – 382424
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#27B0C4] flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2C3E50]">
                        Get in touch
                      </h3>
                      <p className="text-[#7A7A7A]">
                        <a
                          href="mailto:info@gohilinfotech.com"
                          className="hover:text-[#27B0C4] transition"
                        >
                          info@gohilinfotech.com
                        </a>
                      </p>
                      <p className="text-[#7A7A7A]">
                        <a
                          href="tel:+917945864006"
                          className="hover:text-[#27B0C4] transition"
                        >
                          +91 7945864006
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedItem>
            </div>
          </AnimatedContainer>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
