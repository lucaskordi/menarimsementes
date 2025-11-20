"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Script from "next/script";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const instagramPosts = [
  {
    permalink: "https://www.instagram.com/reel/DQsE4udEUpI/?utm_source=ig_embed&amp;utm_campaign=loading",
  },
  {
    permalink: "https://www.instagram.com/reel/DQfHvrvjF5a/?utm_source=ig_embed&amp;utm_campaign=loading",
  },
  {
    permalink: "https://www.instagram.com/reel/DP9IM5OEa_W/?utm_source=ig_embed&amp;utm_campaign=loading",
  },
  {
    permalink: "https://www.instagram.com/reel/DPpIIzzkWGv/?utm_source=ig_embed&amp;utm_campaign=loading",
  },
];

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

const imageSources = [
  "/hero1.webp",
  "/hero2.webp",
  "/hero3.webp",
  "/hero1.webp",
  "/hero2.webp",
  "/hero3.webp",
];

type CarouselItem = {
  type: "text" | "image";
  content: string;
};

const createItems = (): CarouselItem[] => {
  const items: CarouselItem[] = [];
  words.forEach((word, index) => {
    items.push({ type: "text", content: word });
    if (imageSources[index % imageSources.length]) {
      items.push({ type: "image", content: imageSources[index % imageSources.length] });
    }
  });
  return items;
};

// CHECKPOINT: Configuração mobile e desktop da seção "Nos Acompanhe nas Redes"
// - Mobile: altura mínima de 1000px, background com fill, postsPerPage = 1
// - Desktop: altura automática baseada no conteúdo, background com width/height, postsPerPage = 3
// - Controles mobile embaixo com AnimatePresence e animações de indicadores
// - Controles desktop nas laterais com indicadores embaixo
export const ResultadosSection = () => {
  const items = createItems();
  const duplicatedItems = [...items, ...items, ...items, ...items];
  const [currentInstagramIndex, setCurrentInstagramIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const postsPerPage = isMobile ? 1 : 3;

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentInstagramIndex]);

  const getVisiblePosts = () => {
    const posts = [...instagramPosts, ...instagramPosts];
    const startIndex = currentInstagramIndex;
    return posts.slice(startIndex, startIndex + postsPerPage);
  };

  const goToPreviousInstagram = () => {
    setCurrentInstagramIndex((prev) => {
      const newIndex = prev - 1;
      if (newIndex < 0) {
        return 0;
      }
      return newIndex;
    });
  };

  const goToNextInstagram = () => {
    setCurrentInstagramIndex((prev) => {
      const maxIndex = instagramPosts.length - postsPerPage;
      const newIndex = prev + 1;
      if (newIndex > maxIndex) {
        return maxIndex;
      }
      return newIndex;
    });
  };

  return (
    <>
      <Script
        src="//www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        }}
      />
      <section id="resultados" className="relative w-full md:w-screen overflow-hidden py-12 md:py-0 min-h-[1100px] md:min-h-[1200px] lg:min-h-auto">
        <div className="relative w-full hidden lg:block">
          <Image
            src="/bgsec.webp"
            alt="Background"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 w-full h-full lg:hidden">
          <Image
            src="/bgsec.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 container mx-auto px-4 md:px-8 z-10 flex flex-col items-center justify-center pb-32 md:pb-48 lg:pb-0 py-12 md:py-0 min-h-[1100px] md:min-h-[1200px] lg:min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#16323d] mb-4">
              <span className="block md:inline">Nos Acompanhe</span>
              <span className="block md:inline md:ml-2">
                nas <span className="text-[#d5b14f]">Redes</span>
              </span>
            </h2>
          </motion.div>
          <div className="relative w-full max-w-7xl mx-auto min-h-[500px] md:min-h-[600px] pb-32 md:pb-48 lg:pb-0">
            {/* Setas laterais para desktop */}
            <AnimatePresence>
              {currentInstagramIndex > 0 && (
                <motion.button
                  key="prev-button-desktop"
                  onClick={goToPreviousInstagram}
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#16323d] p-3 rounded-full transition-colors shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Post anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            <div className="relative w-full overflow-hidden px-2 md:px-4">
              <motion.div
                animate={{
                  x: `calc(-${currentInstagramIndex * (100 / postsPerPage)}%)`,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex"
              >
                {instagramPosts.map((post, index) => {
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 flex justify-center px-2 md:px-4"
                      style={{ width: `calc(100% / ${postsPerPage})` }}
                    >
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={post.permalink}
                        data-instgrm-version="14"
                        data-instgrm-lang="pt_BR"
                        style={{
                          background: "#FFF",
                          border: 0,
                          borderRadius: "16px",
                          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                          margin: "1px",
                          maxWidth: "540px",
                          minWidth: isMobile ? "280px" : "326px",
                          padding: 0,
                          width: "99.375%",
                          width: "-webkit-calc(100% - 2px)",
                          width: "calc(100% - 2px)",
                          overflow: "hidden",
                        }}
                      ></blockquote>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <AnimatePresence>
              {currentInstagramIndex < instagramPosts.length - postsPerPage && (
                <motion.button
                  key="next-button-desktop"
                  onClick={goToNextInstagram}
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="hidden md:block absolute -right-16 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#16323d] p-3 rounded-full transition-colors shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Próximo post"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Controles para mobile - embaixo do conteúdo */}
            <div className="md:hidden flex items-center justify-center mt-6 relative">
              <div className="flex items-center gap-6">
                <motion.button
                  onClick={goToPreviousInstagram}
                  disabled={currentInstagramIndex === 0}
                  className={`bg-white/80 text-[#16323d] p-3 rounded-full transition-all shadow-lg relative z-10 flex-shrink-0 ${
                    currentInstagramIndex === 0
                      ? "opacity-30 cursor-not-allowed"
                      : "opacity-100 hover:bg-white cursor-pointer"
                  }`}
                  whileHover={currentInstagramIndex > 0 ? { scale: 1.1 } : {}}
                  whileTap={currentInstagramIndex > 0 ? { scale: 0.9 } : {}}
                  aria-label="Post anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <div className="flex gap-2 relative z-20 flex-shrink-0">
                  {Array.from({ length: Math.max(1, instagramPosts.length - postsPerPage + 1) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentInstagramIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentInstagramIndex
                          ? "bg-[#d5b14f] w-8"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Ir para posição ${index + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={goToNextInstagram}
                  disabled={currentInstagramIndex >= instagramPosts.length - postsPerPage}
                  className={`bg-white/80 text-[#16323d] p-3 rounded-full transition-all shadow-lg relative z-10 flex-shrink-0 ${
                    currentInstagramIndex >= instagramPosts.length - postsPerPage
                      ? "opacity-30 cursor-not-allowed"
                      : "opacity-100 hover:bg-white cursor-pointer"
                  }`}
                  whileHover={currentInstagramIndex < instagramPosts.length - postsPerPage ? { scale: 1.1 } : {}}
                  whileTap={currentInstagramIndex < instagramPosts.length - postsPerPage ? { scale: 0.9 } : {}}
                  aria-label="Próximo post"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Indicadores para desktop */}
            <div className="hidden md:flex absolute -bottom-12 left-1/2 -translate-x-1/2 z-20 gap-2">
              {Array.from({ length: Math.max(1, instagramPosts.length - postsPerPage + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentInstagramIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentInstagramIndex
                      ? "bg-[#d5b14f] w-8"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Ir para posição ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {duplicatedItems.map((item, index) => (
              <div
                key={`${item.type}-${index}`}
                className="flex-shrink-0 w-56 md:w-72 h-16 md:h-20 rounded-2xl overflow-hidden"
              >
                {item.type === "text" ? (
                  <div className="w-full h-full bg-[#d5b14f] flex items-center justify-center p-6">
                    <span className="text-white text-2xl md:text-3xl font-bold text-center">
                      {item.content}
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.content}
                      alt={item.content}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 256px, 320px"
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

