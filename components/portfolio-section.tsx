"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const portfolioItems = [
  {
    number: "01",
    title: "Soja",
    image: "/soja.webp",
  },
  {
    number: "02",
    title: "Trigo",
    image: "/trigo.webp",
  },
  {
    number: "03",
    title: "Feijão",
    image: "/feijao.webp",
  },
  {
    number: "04",
    title: "Forrageiras",
    image: "/forrag.webp",
  },
];

export const PortfolioSection = () => {
  const [hoveredFeijao, setHoveredFeijao] = useState(false);
  const [hoveredSoja, setHoveredSoja] = useState(false);
  const [hoveredTrigo, setHoveredTrigo] = useState(false);
  const [hoveredForrageiras, setHoveredForrageiras] = useState(false);
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
    <section id="portfolio" className="bg-white py-20 md:py-32 relative -mt-64 md:-mt-80 z-30">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: isMobile ? 0.3 : 0.4, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full text-sm font-medium text-[#16323d] border border-[#16323d]/30">
              PORTFÓLIO DE SEMENTES
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#16323d] leading-tight mb-12">
            A Força da Terra em Cada Semente
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">
            {portfolioItems.map((item, index) => {
              const isFeijao = item.title === "Feijão";
              const isSoja = item.title === "Soja";
              const isTrigo = item.title === "Trigo";
              const isForrageiras = item.title === "Forrageiras";
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    opacity: { duration: isMobile ? 0.3 : 0.3, delay: isMobile ? 0 : index * 0.05 },
                    y: { duration: isMobile ? 0 : 0.3, delay: isMobile ? 0 : index * 0.05 },
                    backgroundColor: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  onHoverStart={() => {
                    if (isFeijao) setHoveredFeijao(true);
                    if (isSoja) setHoveredSoja(true);
                    if (isTrigo) setHoveredTrigo(true);
                    if (isForrageiras) setHoveredForrageiras(true);
                  }}
                  onHoverEnd={() => {
                    if (isFeijao) setHoveredFeijao(false);
                    if (isSoja) setHoveredSoja(false);
                    if (isTrigo) setHoveredTrigo(false);
                    if (isForrageiras) setHoveredForrageiras(false);
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    backgroundColor: isMobile || (isFeijao && hoveredFeijao) || (isSoja && hoveredSoja) || (isTrigo && hoveredTrigo) || (isForrageiras && hoveredForrageiras) ? "#16323d" : "transparent",
                  }}
                  className="relative border border-[#16323d]/20 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-500 ease-in-out group min-h-[380px] md:min-h-[500px]"
                >
                  {!isMobile && (
                    <div className="absolute inset-0 bg-[#16323d]/10 z-0 transition-opacity duration-500 ease-in-out"></div>
                  )}
                  <div className="absolute inset-0 z-10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={`object-cover group-hover:scale-110 transition-all duration-500 ease-in-out ${isMobile ? "opacity-100" : ((isFeijao && hoveredFeijao) || (isSoja && hoveredSoja) || (isTrigo && hoveredTrigo) || (isForrageiras && hoveredForrageiras) ? "opacity-0" : "opacity-100")}`}
                    />
                  </div>
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                    <div className="flex flex-col">
                      <h3 className={`text-4xl md:text-3xl lg:text-4xl font-bold mb-4 transition-colors duration-500 ease-in-out ${isMobile || (isFeijao && hoveredFeijao) || (isSoja && hoveredSoja) || (isTrigo && hoveredTrigo) || (isForrageiras && hoveredForrageiras) ? "text-white" : "text-[#16323d]"}`}>
                        {item.title}
                      </h3>
                      {!isMobile && (
                        <motion.div
                          initial={false}
                          animate={{
                            opacity: (isFeijao && hoveredFeijao) || (isSoja && hoveredSoja) || (isTrigo && hoveredTrigo) || (isForrageiras && hoveredForrageiras) ? 0 : 1,
                            height: (isFeijao && hoveredFeijao) || (isSoja && hoveredSoja) || (isTrigo && hoveredTrigo) || (isForrageiras && hoveredForrageiras) ? 0 : 'auto',
                            marginBottom: (isFeijao && hoveredFeijao) || (isSoja && hoveredSoja) || (isTrigo && hoveredTrigo) || (isForrageiras && hoveredForrageiras) ? 0 : 16,
                          }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                          className="bg-[#d5b14f] px-2 py-1 rounded inline-block w-fit overflow-hidden"
                        >
                          <span className="text-white text-xs font-semibold whitespace-nowrap">Passe o Mouse</span>
                        </motion.div>
                      )}
                    </div>
                    {isSoja && (isMobile || hoveredSoja) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex-1 flex flex-col justify-center items-center w-full"
                      >
                        <div className="space-y-2 mb-6 w-full max-w-md">
                          <ul className="space-y-2 text-sm md:text-base leading-relaxed drop-shadow-lg list-none">
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">FPS 2664 i2X</span>
                              <span className="ml-2 px-2 py-0.5 bg-white text-[#16323d] text-xs font-semibold rounded">LANÇAMENTO</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">FPS 2657 IPRO</span>
                              <span className="ml-2 px-2 py-0.5 bg-white text-[#16323d] text-xs font-semibold rounded">LANÇAMENTO</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">BRS 1054IPRO</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">BRS 1056IPRO</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">BRS 1064IPRO</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">BRS 284</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">BRS 2058i2X</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">BRS 2361 i2X</span>
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                    {isTrigo && (isMobile || hoveredTrigo) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex-1 flex flex-col justify-center items-center w-full"
                      >
                        <div className="space-y-2 mb-6 w-full max-w-md">
                          <ul className="space-y-2 text-sm md:text-base leading-relaxed drop-shadow-lg list-none">
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">BIOTRIGO TITAN BIO18244</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">BIOTRIGO TALISMÃ BIO182385</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">BIOTRIGO EXCALIBUR</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">TBIO CALIBRE</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">TBIO CAPAZ</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">TBIO MOTRIZ</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">ORS ABSOLUTO</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">ORS SELVAGEM</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">ORS TURBO</span>
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                    {isFeijao && (isMobile || hoveredFeijao) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex-1 flex flex-col justify-center items-center w-full"
                      >
                        <div className="space-y-4 mb-6 w-full max-w-md">
                          <div className="space-y-2">
                            <div className="bg-white rounded px-3 py-1.5 inline-block">
                              <h4 className="text-[#16323d] font-bold text-sm md:text-base">Carioca</h4>
                            </div>
                            <ul className="space-y-2 text-sm md:text-base leading-relaxed drop-shadow-lg list-none">
                              <li className="flex items-center">
                                <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                                <span className="text-[#d5b14f] font-bold">IPR Sabiá</span>
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                                <span className="text-[#d5b14f] font-bold">IAC 2051</span>
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                                <span className="text-[#d5b14f] font-bold">BRS FC415</span>
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                                <span className="text-[#d5b14f] font-bold">BRS Estilo</span>
                              </li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-white rounded px-3 py-1.5 inline-block">
                              <h4 className="text-[#16323d] font-bold text-sm md:text-base">Preto</h4>
                            </div>
                            <ul className="space-y-2 text-sm md:text-base leading-relaxed drop-shadow-lg list-none">
                              <li className="flex items-center">
                                <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                                <span className="text-[#d5b14f] font-bold">IPR Urutau</span>
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                                <span className="text-[#d5b14f] font-bold">BRS FP417</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {isForrageiras && (isMobile || hoveredForrageiras) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex-1 flex flex-col justify-center items-center w-full"
                      >
                        <div className="space-y-2 mb-6 w-full max-w-md">
                          <ul className="space-y-2 text-sm md:text-base leading-relaxed drop-shadow-lg list-none">
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">Ervilha IPR-83</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2 text-[#d5b14f] font-bold">•</span>
                              <span className="text-[#d5b14f] font-bold">Nabo IPR-210</span>
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-base md:text-lg text-gray-700 mb-8">
              Abraçamos Tecnologias Inteligentes E Métodos Comprovados Que Trazem Eficiência.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-8">
              <motion.a
                href="https://wa.me/5543988082844"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-3 md:py-4 bg-[#16323d] text-white rounded-md font-medium text-base md:text-lg hover:bg-white hover:text-[#16323d] hover:shadow-lg transition-all duration-500 shadow-lg"
              >
                Falar com um Consultor
              </motion.a>
              <motion.a
                href="https://drive.google.com/drive/u/0/folders/1n1ayvW7E5A6rj1gVd6wsEe93AD-_DlBG?fbclid=PAQ0xDSwLseLtleHRuA2FlbQIxMQABpxOUJ3IfeRfr7aszBpukxBhA6FmnKdkH8Z6ltTZf8dmI3KlsA4QeXgFGEHxj_aem_Pm_Kqu_wgXGgK-TCtWm5pw"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0 : 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-3 md:py-4 bg-[#d5b14f] text-white rounded-md font-medium text-base md:text-lg hover:bg-white hover:text-[#16323d] hover:shadow-lg transition-all duration-500 shadow-lg"
              >
                Ver Portfólio Completo
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

