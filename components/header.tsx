"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  "Início",
  "Sobre",
  "Portfólio",
  "Rastreabilidade",
  "Parceiros",
  "Contato",
  "Trabalhe Conosco",
];

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/trabalhe-conosco" || pathname !== "/") {
      window.location.href = "/";
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
    } else if (href === "#trabalhe-conosco") {
      window.location.href = "/trabalhe-conosco";
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // Detecta mobile e tablets (iPad inclusive)
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      // iPad reporta 768px ou 1024px, tablets em geral < 1024px
      // Inclui explicitamente 768px que é o iPad padrão
      const mobile = width < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const handleMenuSelection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleMenuClick(e, href);
    setIsMenuOpen(false);
  };

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
              top: "calc(1.5rem + 0.75rem)",
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
    <header
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[70] backdrop-blur-md rounded-2xl shadow-lg w-[90%] max-w-7xl py-3 bg-[#16323d]/60 border border-[#16323d]/40"
      style={{
        color: 'white'
      }}
    >
          <div className="px-4 flex items-center justify-between gap-4">
            <div className="flex items-center">
              <Link href="/" onClick={handleLogoClick}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Image
                    src="/Logo.png"
                    alt="Logo"
                    width={180}
                    height={90}
                    className="h-auto w-[140px] md:w-[180px]"
                    priority
                  />
                </motion.div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => {
                const sectionId = getSectionId(item);
                const isTrabalheConoscoPage = pathname === "/trabalhe-conosco";
                let href = item === "Trabalhe Conosco" ? "/trabalhe-conosco" : `#${sectionId}`;
                if (isTrabalheConoscoPage && item !== "Trabalhe Conosco") {
                  href = `/#${sectionId}`;
                }
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
                    href={href}
                    className="text-white text-base font-medium cursor-pointer block"
                    onClick={(e) => {
                      if (item === "Trabalhe Conosco") {
                        return;
                      }
                      if (isTrabalheConoscoPage) {
                        e.preventDefault();
                        window.location.href = `/#${sectionId}`;
                        return;
                      }
                      handleMenuClick(e, `#${sectionId}`);
                    }}
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
                onClick={() => {
                  if (pathname === "/trabalhe-conosco") {
                    window.location.href = "/";
                  }
                }}
              >
                Compre Agora
              </motion.button>
              <div className="md:hidden relative w-10 h-10">
                {!isMenuOpen && menuButton}
              </div>
            </div>
          </div>
        </header>
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
                    const isTrabalheConoscoPage = pathname === "/trabalhe-conosco";
                    let href = item === "Trabalhe Conosco" ? "/trabalhe-conosco" : `#${sectionId}`;
                    if (isTrabalheConoscoPage && item !== "Trabalhe Conosco") {
                      href = `/#${sectionId}`;
                    }
                    return (
                    <li key={`mobile-${item}`}>
                      <Link
                        href={href}
                        onClick={(e) => {
                          if (item === "Trabalhe Conosco") {
                            setIsMenuOpen(false);
                            return;
                          }
                          if (isTrabalheConoscoPage) {
                            e.preventDefault();
                            setIsMenuOpen(false);
                            window.location.href = `/#${sectionId}`;
                            return;
                          }
                          handleMenuSelection(e, `#${sectionId}`);
                        }}
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
                    <Image src="/Logo.png" alt="Logo" width={150} height={75} />
                  </motion.div>
                </Link>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
};

