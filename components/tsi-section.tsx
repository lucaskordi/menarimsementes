"use client";

import { motion } from "framer-motion";

export const TsiSection = () => {
  return (
    <section id="tsi" className="py-20 md:py-32" style={{ backgroundColor: "#F5F3F1" }}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#16323d] mb-4">
            TSI
          </h2>
          <p className="text-lg text-gray-600">
            Seção em desenvolvimento
          </p>
        </motion.div>
      </div>
    </section>
  );
};

