"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const SeedToHarvestSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="rastreabilidade" className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative">
          <div className="mt-20 md:mt-0 mb-8 max-w-5xl mx-auto">
            <div className="flex items-start justify-between gap-8">
              <div className="flex flex-col flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="pl-8 md:pl-12"
                >
                  <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-[#16323d]">
                    Rastreie
                  </h2>
                </motion.div>
              </div>
              <div className="max-w-md text-right pt-2">
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-[#16323d] text-sm md:text-base"
                >
                  A rastreabilidade garante a origem e o controle de cada lote de sementes, oferecendo transparência, segurança e confiança ao produtor.
                </motion.p>
              </div>
            </div>
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative z-0 self-end -mt-4 md:-mt-6 pr-8 md:pr-12"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-[#d5b14f]">
                  Suas Sementes
                </h2>
              </motion.div>
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 -mt-10 md:-mt-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(0)}
              onHoverEnd={() => setHoveredCard(null)}
              animate={{
                flex: hoveredCard === 0 ? 2 : hoveredCard === 1 ? 0.5 : 1,
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.1 },
                y: { duration: 0.6, delay: 0.1 },
                flex: { duration: 0.5, ease: "easeInOut" },
              }}
              className="h-64 md:h-80 rounded-2xl bg-[#16323d] flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredCard === 0 ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: hoveredCard === 0 ? 0.5 : 0 }}
                className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-8"
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
                  opacity: hoveredCard === 0 ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-white text-2xl md:text-3xl font-bold">Via QR Code</span>
                <span className="text-white text-xs md:text-sm opacity-80">Passe o mouse e saiba mais</span>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(1)}
              onHoverEnd={() => setHoveredCard(null)}
              animate={{
                flex: hoveredCard === 1 ? 2 : hoveredCard === 0 ? 0.5 : 1,
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.2 },
                y: { duration: 0.6, delay: 0.2 },
                flex: { duration: 0.5, ease: "easeInOut" },
              }}
              className="h-64 md:h-80 rounded-2xl bg-[#d5b14f] flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredCard === 1 ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: hoveredCard === 1 ? 0.5 : 0 }}
                className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-8"
              >
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 md:mb-6">Via Lote e NF</h3>
                <ol className="space-y-2 md:space-y-3 text-white text-sm md:text-base">
                  <li className="flex gap-3 items-center flex-wrap">
                    <span className="font-bold flex-shrink-0 text-[#16323d]">01.</span>
                    <span>Clique neste link:</span>
                    <a
                      href="https://sementesmenarim.rastreabilidade.aqila.com.br/lotes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 px-4 py-2 bg-white text-[#16323d] rounded-md font-semibold hover:bg-[#16323d] hover:text-white transition-colors duration-300 text-xs md:text-sm"
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
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredCard === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-white text-2xl md:text-3xl font-bold">Via Lote e NF</span>
                <span className="text-white text-xs md:text-sm opacity-80">Passe o mouse e saiba mais</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

