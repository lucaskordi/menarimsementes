"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const parceiros = [
  { name: "Embrapa", image: "/embrapa.png" },
  { name: "Biotrigo", image: "/biotrigo.webp" },
  { name: "IDR", image: "/idr.png" },
  { name: "OR", image: "/or.png" },
  { name: "Bayer", image: "/bayer.png" },
  { name: "Basfat", image: "/basfat.webp" },
  { name: "BIOSP", image: "/biosp.png" },
  { name: "Biotrop", image: "/biotrop.png" },
  { name: "ICL", image: "/icl.png" },
];

export const ParceirosSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="parceiros" className="py-20 md:py-32" style={{ backgroundColor: "#F5F3F1" }}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: isMobile ? 0.3 : 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#16323d] mb-4">
            Nossos Parceiros
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {parceiros.map((parceiro, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : index * 0.1 }}
              className="relative w-24 md:w-32 lg:w-40 h-16 md:h-20 lg:h-24 group"
              whileHover={{ scale: 1.1, transition: { duration: 0.2, ease: "easeOut" } }}
            >
              <Image
                src={parceiro.image}
                alt={parceiro.name}
                fill
                className="object-contain saturate-100 md:saturate-0 md:group-hover:saturate-100 transition-all duration-300"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

