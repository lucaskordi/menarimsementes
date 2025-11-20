"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useAnimationFrame } from "framer-motion";

const historyItems = [
  {
    year: "Início",
    title: "Nossa história tem início",
    content: "A história da Menarim Sementes tem início com o nascimento do nosso fundador Sr. Marcos Frederico Fiorillo Menarim (1941 - 2020)",
  },
  {
    year: "1964",
    title: "Formação e Administração",
    content: "Sr. Marcos se forma na faculdade de Medicina Veterinária e junta-se a seus pais, Rivadávia Menarim e Anna Fiorillo Menarim, para administrar suas fazendas.",
  },
  {
    year: "1997",
    title: "Fundação da Menarim Sementes",
    content: "Sr. Marcos Frederico Fiorillo Menarim juntamente com a esposa Helma Selma Menarim e os filhos Maristella, Ricardo, Monica, Henrique e Arnaldo, fundam a Menarim Sementes.",
  },
  {
    year: "Atualmente",
    title: "Expansão e Destaque",
    content: "A Menarim Sementes atua nos estados do Paraná e Minas Gerais, com sede na Fazenda Vó Anna e Fazenda 5M. Destaca-se na produção e comercialização de sementes de trigo, soja, aveia, feijão e culturas de cobertura.",
  },
  {
    year: "Parcerias",
    title: "Produtos Diferenciados",
    content: "Em conjunto com importantes parceiros do setor, a Menarim Sementes oferece produtos diferenciados, rastreados e certificados. A concentração de esforços se dá nos melhores serviços desde a infraestrutura da produção, beneficiamento e comercialização.",
  },
  {
    year: "Futuro",
    title: "De olho no Futuro",
    content: "A Menarim Sementes desenvolve políticas de valorização do capital humano, investe em alta tecnologia e segurança no trabalho.",
  },
];

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const exitDirectionRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const time = useMotionValue(0);

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

  const springConfig = { damping: 25, stiffness: 200 };

  const x1 = useSpring(useTransform(mouseX, (value) => value * 0.02), springConfig);
  const y1 = useSpring(useTransform(mouseY, (value) => value * 0.02), springConfig);
  
  const x2 = useSpring(useTransform(mouseX, (value) => value * -0.02), springConfig);
  const y2 = useSpring(useTransform(mouseY, (value) => value * -0.02), springConfig);

  // Animação de onda cossenoidal para mobile
  const cosineX1 = useTransform(time, (t) => Math.cos(t * 0.3) * 15);
  const cosineY1 = useTransform(time, (t) => Math.sin(t * 0.3) * 10 - 120);
  const cosineX2 = useTransform(time, (t) => Math.cos(t * 0.35 + Math.PI / 2) * 15);
  const cosineY2 = useTransform(time, (t) => Math.sin(t * 0.35 + Math.PI / 2) * 10 - 120);

  useAnimationFrame((t, delta) => {
    if (!isMobile) {
      time.set(time.get() + delta * 0.001);
    }
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const goToNextHistory = () => {
    exitDirectionRef.current = 1;
    setDirection(1);
    setCurrentHistoryIndex((prev) => (prev + 1) % historyItems.length);
  };

  const goToPreviousHistory = () => {
    exitDirectionRef.current = -1;
    setDirection(-1);
    setCurrentHistoryIndex((prev) => (prev - 1 + historyItems.length) % historyItems.length);
  };

  const goToHistory = (index: number) => {
    const newDirection = index > currentHistoryIndex ? 1 : -1;
    exitDirectionRef.current = newDirection;
    setDirection(newDirection);
    setCurrentHistoryIndex(index);
  };

  return (
    <section id="sobre" className="bg-[#6B7D6B] py-20 md:py-32 pb-0 md:pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 0 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.3 : 0.6, ease: "easeOut" }}
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full text-sm font-medium text-white border border-white">
                NOSSA HISTÓRIA
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              28 Anos de Experiência em Sementes e Compromisso com o Agricultor
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 0 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: isMobile ? 0.3 : 0.6, ease: "easeOut" }}
            className="relative h-[350px] md:h-[400px] -mt-16 md:mt-0 z-30"
          >
            <div className="relative h-full flex items-center">
              <div className="hidden md:block absolute -left-8 top-0 bottom-0 w-8">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-white/30"></div>
                <motion.div
                  className="absolute left-2 w-4 h-4 rounded-full bg-[#d5b14f] -translate-x-1/2"
                  style={{ 
                    top: `${(currentHistoryIndex / (historyItems.length - 1)) * 100}%`,
                  }}
                  animate={{
                    top: `${(currentHistoryIndex / (historyItems.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              <div className="ml-0 md:ml-12">
                <div className="w-full max-w-lg">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentHistoryIndex}
                      custom={direction}
                      initial={{ opacity: 0, y: isMobile ? 0 : (direction > 0 ? -30 : 30) }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: isMobile ? 0 : (exitDirectionRef.current > 0 ? 30 : -30) }}
                      transition={{ duration: isMobile ? 0.3 : 0.4 }}
                      className="text-left"
                    >
                      <span className="text-[#d5b14f] text-lg md:text-xl font-bold">
                        {historyItems[currentHistoryIndex].year}
                      </span>
                      <h3 className="text-white text-xl md:text-2xl font-bold mt-2 mb-3">
                        {historyItems[currentHistoryIndex].title}
                      </h3>
                      <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                        {historyItems[currentHistoryIndex].content}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 z-30 pointer-events-auto">
              <motion.button
                onClick={goToPreviousHistory}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Anterior"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </motion.button>

              <div className="flex gap-2 pointer-events-auto">
                {historyItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToHistory(index)}
                    className={`w-2 h-2 rounded-full transition-all pointer-events-auto ${
                      index === currentHistoryIndex
                        ? "bg-[#d5b14f] w-8"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Ir para ${historyItems[index].year}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={goToNextHistory}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Próximo"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full md:w-screen h-[500px] md:h-[600px] mt-16 -mt-32 md:mt-16 mb-[-220px] md:mb-0 overflow-visible md:overflow-hidden left-0 md:left-1/2 md:-translate-x-1/2 z-0"
      >
        <div className="absolute inset-0 z-0 flex items-start overflow-hidden pt-0">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 600,
                ease: "linear",
              },
            }}
          >
            {Array.from({ length: 2 }).map((_, i) => {
              const words = [
                "Sementes",
                "Produtividade",
                "Qualidade",
                "Sustentabilidade",
                "Performance",
                "Campo",
                "Germinação",
                "Rastreabilidade",
                "Tecnologia",
                "Certificado",
                "Pureza",
                "Resistência",
                "Colheita",
                "Resultado",
                "Agro",
              ];
              
              return (
                <span
                  key={i}
                  className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-medium mx-12 flex items-center font-[var(--font-rethink-sans)] text-black/20 tracking-normal"
                >
                  {words.map((word) => `${word}.`).join(" ")}
                </span>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          style={{ 
            x: isMobile ? cosineX1 : x1,
            y: isMobile ? cosineY1 : y1
          }}
          className="absolute inset-0 z-10"
        >
          <div className="relative w-full h-full scale-150 md:scale-100">
            <Image
              src="/sobrep01.webp"
              alt="Sobre imagem 1"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </motion.div>
        
        <motion.div
          style={{ 
            x: isMobile ? cosineX2 : x2,
            y: isMobile ? cosineY2 : y2
          }}
          className="absolute inset-0 z-20"
        >
          <div className="relative w-full h-full scale-150 md:scale-100">
            <Image
              src="/sobrep2.webp"
              alt="Sobre imagem 2"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

