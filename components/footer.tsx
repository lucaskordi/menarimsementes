"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    url: "https://www.instagram.com/menarimsementes",
  },
  {
    name: "Spotify",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.84 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
    url: "https://open.spotify.com/show/35d7nmhP6LKm5JzZMzVj0f?utm_medium=share&utm_source=linktree",
  },
  {
    name: "YouTube",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    url: "https://www.youtube.com/@MenarimSementes",
  },
];

const getSectionId = (label: string) =>
  label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

export const Footer = () => {
  const pathname = usePathname();
  const isTrabalheConoscoPage = pathname === "/trabalhe-conosco";

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isTrabalheConoscoPage) {
      window.location.href = "/";
    } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isTrabalheConoscoPage && href !== "#trabalhe-conosco") {
      window.location.href = href;
      return;
    }
  if (href === "#início" || href === "#inicio" || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="bg-[#16323d] shadow-lg py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-center text-center md:text-left justify-between gap-8">
          <div className="flex-shrink-0 flex flex-col items-center md:items-start">
            <Link href="/" onClick={handleLogoClick}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Image
                  src="/Logo.png"
                  alt="Logo"
                  width={160}
                  height={80}
                  className="h-auto"
                />
              </motion.div>
            </Link>
          </div>

          <nav className="flex flex-col gap-2 items-center text-center">
            {menuItems.map((item) => {
              const sectionId = getSectionId(item);
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
                    className="text-white text-sm cursor-pointer block text-center"
                  onClick={(e) => {
                    if (item === "Trabalhe Conosco") {
                      return;
                    }
                    if (isTrabalheConoscoPage && item !== "Trabalhe Conosco") {
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

          <div className="flex flex-col items-center gap-4">
            <motion.button
              className="px-6 py-2 bg-[#d5b14f] text-white rounded-md font-medium text-sm whitespace-nowrap hover:bg-white hover:text-[#16323d] hover:shadow-lg transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isTrabalheConoscoPage) {
                  window.location.href = "/";
                }
              }}
            >
              Compre Agora
            </motion.button>

            <div className="flex gap-4 items-center justify-center">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#d5b14f] transition-colors"
                  aria-label={social.name}
                >
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    {social.icon}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

