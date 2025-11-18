"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const menuItems = [
  "Início",
  "Sobre",
  "Portfólio",
  "Rastreabilidade",
  "Parceiros",
  "Contato",
  "Trabalhe Conosco",
];

const lightSectionIds = [
  "portfolio",
  "tsi",
  "resultados",
  "rastreabilidade",
  "parceiros",
  "contato",
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isOverWhite, setIsOverWhite] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      const headerHeight = currentScrollY > 100 ? 90 : 110;
      if (window.innerWidth >= 768) {
        let overLightSection = false;
        for (const id of lightSectionIds) {
          const section = document.getElementById(id);
          if (!section) continue;
          const rect = section.getBoundingClientRect();
          if (rect.top <= headerHeight && rect.bottom > 0) {
            overLightSection = true;
            break;
          }
        }
        setIsOverWhite(overLightSection);
      } else {
        setIsOverWhite(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

const getSectionId = (label: string) =>
  label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
  if (href === "#início" || href === "#inicio" || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuSelection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleMenuClick(e, href);
    setIsMenuOpen(false);
  };

  const headerVerticalPadding = isScrolled ? "0.5rem" : "0.75rem";

  const menuButton = (
    <motion.button
      aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
      className={`p-2 rounded-full border border-white/30 text-white w-10 h-10 flex items-center justify-center ${
        isMenuOpen ? "fixed top-6 z-[130]" : "md:hidden relative"
      }`}
      style={
        isMenuOpen
          ? {
              right: "calc((100vw - min(90vw, 80rem)) / 2 + 1rem)",
              top: `calc(1.5rem + ${headerVerticalPadding})`,
            }
          : undefined
      }
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <motion.span
        className="absolute w-6 h-0.5 bg-white"
        animate={{
          rotate: isMenuOpen ? 45 : 0,
          y: isMenuOpen ? 0 : -8,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute w-6 h-0.5 bg-white"
        animate={{
          opacity: isMenuOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute w-6 h-0.5 bg-white"
        animate={{
          rotate: isMenuOpen ? -45 : 0,
          y: isMenuOpen ? 0 : 8,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );

  return (
    <>
    <motion.header
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "tween"
      }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[70] backdrop-blur-md rounded-2xl shadow-lg transition-all duration-300 ease-in-out w-[90%] max-w-7xl ${
        isScrolled ? "py-2" : "py-3"
      } ${
        isOverWhite || isMobile
          ? "bg-[#16323d]/30 border border-[#16323d]/40" 
          : "bg-white/10 border border-white/20"
      }`}
    >
          <div className="px-4 flex items-center justify-between gap-4">
            <div className="flex items-center">
              <Link href="/" onClick={handleLogoClick}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Image
                    src="/Logo.png"
                    alt="Logo"
                    width={120}
                    height={60}
                    className="h-auto"
                    priority
                  />
                </motion.div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => {
                const sectionId = getSectionId(item);
                return (
                <motion.div
                  key={item}
                  className="relative"
                  initial="rest"
                  whileHover="hover"
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.1 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`#${sectionId}`}
                    className="text-white text-base font-medium cursor-pointer block"
                    onClick={(e) => handleMenuClick(e, `#${sectionId}`)}
                  >
                    {item}
                  </Link>
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 bg-[#d5b14f]"
                    variants={{
                      rest: { width: 0, x: "-50%" },
                      hover: { width: "100%", x: "-50%" },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <motion.button
                className="hidden md:block px-5 py-2 bg-[#d5b14f] text-white rounded-md font-medium text-base whitespace-nowrap hover:bg-[#16323d] hover:text-white hover:shadow-lg transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Compre Agora
              </motion.button>
              <div className="md:hidden relative w-10 h-10">
                {!isMenuOpen && menuButton}
              </div>
            </div>
          </div>
        </motion.header>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[110] bg-[#16323d]/90 backdrop-blur-xl flex flex-col items-center justify-center text-white px-6"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsMenuOpen(false);
                }
              }}
            >
              {menuButton}
              <motion.ul
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="flex flex-col items-center gap-6 text-2xl font-semibold mb-10 px-6"
              >
                  {menuItems.map((item) => {
                    const sectionId = getSectionId(item);
                    return (
                    <li key={`mobile-${item}`}>
                      <Link
                        href={`#${sectionId}`}
                        onClick={(e) => handleMenuSelection(e, `#${sectionId}`)}
                        className="hover:text-[#d5b14f] transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                    );
                  })}
                </motion.ul>

                <motion.button
                  className="px-6 py-3 bg-[#d5b14f] text-white rounded-md font-medium hover:bg-white hover:text-[#16323d] transition-all duration-500 mb-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Compre Agora
                </motion.button>

                <Link href="/" onClick={(e) => { handleLogoClick(e); setIsMenuOpen(false); }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Image src="/Logo.png" alt="Logo" width={100} height={50} />
                  </motion.div>
                </Link>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
};

