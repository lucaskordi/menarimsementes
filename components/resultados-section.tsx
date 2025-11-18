"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
  "/sobrep2.webp",
  "/sobrep01.webp",
];

const createItems = () => {
  const items = [];
  words.forEach((word, index) => {
    items.push({ type: "text", content: word });
    if (imageSources[index % imageSources.length]) {
      items.push({ type: "image", content: imageSources[index % imageSources.length] });
    }
  });
  return items;
};

export const ResultadosSection = () => {
  const items = createItems();
  const duplicatedItems = [...items, ...items];

  return (
    <>
      <section id="resultados" className="relative w-screen overflow-hidden">
        <div className="relative w-full">
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
        <div className="absolute inset-0 container mx-auto px-4 md:px-8 z-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#16323d] mb-4">
              Resultados
            </h2>
            <p className="text-lg text-gray-600">
              Seção em desenvolvimento
            </p>
          </motion.div>
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

