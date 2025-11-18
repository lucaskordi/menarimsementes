"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const heroContent = [
  {
    image: "/hero1.webp",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus posuere sapien eget leo porta, non lacinia ligula luctus.",
  },
  {
    image: "/hero2.webp",
    title: "Curabitur vitae nunc sed velit",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.",
  },
  {
    image: "/hero3.webp",
    title: "Suspendisse potenti vestibulum",
    description: "Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur.",
  },
];

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContent.length);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroContent.length) % heroContent.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroContent.length);
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {heroContent.map((content, index) => {
        const isActive = index === currentIndex;
        const isPrevious = index === (currentIndex - 1 + heroContent.length) % heroContent.length;
        
        return (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isActive ? 1 : isPrevious ? 0 : 0,
            zIndex: isActive ? 10 : isPrevious ? 9 : 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ y }}
            className="absolute inset-0"
          >
            <Image
              src={content.image}
              alt={`Hero ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
          <div className="absolute inset-0 bg-[#16323d]/50 z-10 pointer-events-none" />
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container mx-auto px-4 md:px-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  key={`title-${index}-${currentIndex}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    x: index === currentIndex ? 0 : -30,
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.2,
                    ease: "easeOut"
                  }}
                  className="text-left"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#d5b14f] leading-tight">
                    {content.title}
                  </h1>
                </motion.div>
                <motion.div
                  key={`desc-${index}-${currentIndex}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    x: index === currentIndex ? 0 : 30,
                  }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.3,
                    ease: "easeOut"
                  }}
                  className="text-right"
                >
                  <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed max-w-lg ml-auto">
                    {content.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        );
      })}

      <motion.button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Slide anterior"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </motion.button>

      <motion.button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Próximo slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-[#d5b14f] w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

