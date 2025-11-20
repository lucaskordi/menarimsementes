"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const tsiFeatures = [
  "Sem necessidade de Tratamentos On-Farm",
  "Tratamento por Batelada, sem Dano Mecânico",
  "Máquina Própria",
  "Acurácia na Deposição do Ativo",
  "18 Toneladas por Hora",
];

export const TsiSection = () => {
  const [visibleChecks, setVisibleChecks] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      tsiFeatures.forEach((_, index) => {
        setTimeout(() => {
          setVisibleChecks((prev) => [...prev, index]);
        }, index * 200);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="tsi" className="py-20 md:py-32" style={{ backgroundColor: "#F5F3F1" }}>
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-[#16323d] rounded-2xl p-6 md:p-8 lg:p-10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                      TSI
                    </h2>
                    <div className="relative w-24 md:w-32 h-12 md:h-16">
                      <Image
                        src="/Logo.png"
                        alt="Menarim Sementes"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-white leading-relaxed mb-4 opacity-90">
                    Na Menarim, nossas sementes passam por Tratamento de Sementes Industrial (TSI), garantindo proteção, uniformidade e segurança desde o plantio.
                  </p>
                  <p className="text-base md:text-lg text-white leading-relaxed opacity-90">
                    Com o Mena Black, você tem qualidade, praticidade e a confiança de começar a safra com o melhor desempenho possível.
                  </p>
                </div>

                <div className="space-y-4">
                  {tsiFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: visibleChecks.includes(index) ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{
                          scale: visibleChecks.includes(index) ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                        className="w-6 h-6 text-[#d5b14f] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                      <span className="text-base md:text-lg font-bold text-[#d5b14f]">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative w-full aspect-square rounded-xl overflow-hidden order-1 lg:order-2">
                <Image
                  src="/b18.webp"
                  alt="TSI - Tratamento de Sementes Industrial"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

