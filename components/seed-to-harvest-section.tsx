"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const SeedToHarvestSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Detecta mobile e tablets (iPad inclusive)
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      // iPad reporta 768px ou 1024px, tablets em geral < 1024px
      // Inclui explicitamente 768px que é o iPad padrão
      setIsMobile(width < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  return (
    <section id="rastreabilidade" className="bg-white py-8 md:py-32 pb-16 md:pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative">
          <div className="mt-8 md:mt-0 mb-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
              <div className="flex flex-col flex-1 items-center md:items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-center md:text-left md:pl-8 md:pl-12"
                >
                  <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-[#16323d]">
                    Rastreie
                  </h2>
                </motion.div>
              </div>
              <div className="hidden md:block max-w-md text-right pt-2">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-[#16323d] text-sm md:text-base"
                >
                  A rastreabilidade garante a origem e o controle de cada lote de sementes, oferecendo transparência, segurança e confiança ao produtor.
                </motion.p>
              </div>
            </div>
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : 0.1 }}
                className="relative z-0 self-center md:self-end -mt-4 md:-mt-6 text-center md:text-right md:pr-8 md:pr-12"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-[#d5b14f]">
                  Suas Sementes
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-8 md:-mt-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(0)}
              onHoverEnd={() => setHoveredCard(null)}
              animate={{
                opacity: 1,
                y: 0,
                flex: hoveredCard === 0 ? 2 : hoveredCard === 1 ? 0.5 : 1,
              }}
              transition={{
                opacity: { duration: isMobile ? 0.3 : 0.6 },
                y: { duration: isMobile ? 0.3 : 0.6 },
                flex: { duration: 0.5, ease: "easeInOut" },
              }}
              className="min-h-[400px] md:h-64 md:min-h-0 md:h-80 rounded-2xl bg-[#16323d] flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredCard === 0 || isMobile ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: hoveredCard === 0 || isMobile ? 0.5 : 0 }}
                className="absolute inset-0 flex flex-col justify-center items-start px-4 md:px-8 py-6 md:py-0"
              >
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 md:mb-6">Via QR Code</h3>
                <ol className="space-y-2 md:space-y-3 text-white text-sm md:text-base">
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0 text-[#d5b14f]">01.</span>
                    <span>Encontre o QR Code localizado na etiqueta da sua sacaria;</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0 text-[#d5b14f]">02.</span>
                    <span>Abra sua câmera do celular para a leitura do QR CODE;</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0 text-[#d5b14f]">03.</span>
                    <span>Posicione a câmera no local indicado e aguarde o reconhecimento da página;</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold flex-shrink-0 text-[#d5b14f]">04.</span>
                    <span>Confirme para acessar a página do Sistema Menarim de Rastreabilidade.</span>
                  </li>
                </ol>
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredCard === 0 || isMobile ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex flex-col items-center gap-2"
              >
                <span className="text-white text-2xl md:text-3xl font-bold">Via QR Code</span>
                <span className="text-white text-xs md:text-sm opacity-80">Passe o mouse e saiba mais</span>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(1)}
              onHoverEnd={() => setHoveredCard(null)}
              animate={{
                opacity: 1,
                y: 0,
                flex: hoveredCard === 1 ? 2 : hoveredCard === 0 ? 0.5 : 1,
              }}
              transition={{
                opacity: { duration: isMobile ? 0.3 : 0.6 },
                y: { duration: isMobile ? 0.3 : 0.6 },
                flex: { duration: 0.5, ease: "easeInOut" },
              }}
              className="min-h-[400px] md:h-64 md:min-h-0 md:h-80 rounded-2xl bg-[#d5b14f] flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredCard === 1 || isMobile ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: hoveredCard === 1 || isMobile ? 0.5 : 0 }}
                className="absolute inset-0 flex flex-col justify-between md:justify-center items-start px-4 md:px-8 py-6 md:py-0"
              >
                <div className="flex-1 flex flex-col justify-center md:justify-center w-full">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 md:mb-6">Via Lote e NF</h3>
                  <ol className="space-y-2 md:space-y-3 text-white text-sm md:text-base">
                    <li className="flex gap-3 items-start flex-col md:flex-row md:items-center md:flex-wrap">
                      <div className="flex gap-3 items-center">
                        <span className="font-bold flex-shrink-0 text-[#16323d]">01.</span>
                        <span className="hidden md:inline">Clique neste link:</span>
                        <span className="md:hidden">Clique no botão abaixo</span>
                      </div>
                      <a
                        href="https://sementesmenarim.rastreabilidade.aqila.com.br/lotes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline ml-2 px-4 py-2 bg-white text-[#16323d] rounded-md font-semibold hover:bg-[#16323d] hover:text-white transition-colors duration-300 text-sm"
                      >
                        Acessar Rastreabilidade
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold flex-shrink-0 text-[#16323d]">02.</span>
                      <span>Preencha os campos: Número do lote e Nota fiscal;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold flex-shrink-0 text-[#16323d]">03.</span>
                      <span>Clique em consultar;</span>
                    </li>
                  </ol>
                </div>
                <div className="w-full mt-4 md:hidden">
                  <a
                    href="https://sementesmenarim.rastreabilidade.aqila.com.br/lotes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 bg-white text-[#16323d] rounded-md font-semibold hover:bg-[#16323d] hover:text-white transition-colors duration-300 text-sm text-center"
                  >
                    Acessar Rastreabilidade
                  </a>
                </div>
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredCard === 1 || isMobile ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex flex-col items-center gap-2"
              >
                <span className="text-white text-2xl md:text-3xl font-bold">Via Lote e NF</span>
                <span className="text-white text-xs md:text-sm opacity-80">Passe o mouse e saiba mais</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Parágrafo para mobile - embaixo dos cards */}
          <div className="md:hidden mt-6 max-w-md mx-auto">
            <motion.p
              initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : 0.3 }}
              className="text-[#16323d] text-sm text-center"
            >
              A rastreabilidade garante a origem e o controle de cada lote de sementes, oferecendo transparência, segurança e confiança ao produtor.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

