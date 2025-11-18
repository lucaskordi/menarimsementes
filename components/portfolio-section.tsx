"use client";

import { motion } from "framer-motion";

const portfolioItems = [
  {
    number: "01",
    title: "Soja",
  },
  {
    number: "02",
    title: "Trigo",
  },
  {
    number: "03",
    title: "Feijão",
  },
  {
    number: "04",
    title: "Forrageiras",
  },
];

export const PortfolioSection = () => {
  return (
    <section id="portfolio" className="bg-white py-20 md:py-32 relative -mt-64 md:-mt-80 z-30">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full text-sm font-medium text-[#16323d] border border-[#16323d]/30">
              PORTFÓLIO
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#16323d] leading-tight mb-12">
            A Força da Terra em Cada Semente
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="relative border border-[#16323d]/20 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl font-bold text-[#16323d]">{item.number}</span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#16323d]"
                    >
                      →
                    </motion.div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#16323d]">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-base md:text-lg text-gray-700">
              Abraçamos Tecnologias Inteligentes E Métodos Comprovados Que Trazem Eficiência.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

