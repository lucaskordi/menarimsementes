"use client";

import { FormEvent, ReactNode, useState } from "react";
import { motion } from "framer-motion";

interface ContactCard {
  icon: ReactNode;
  title: string;
  contact: string;
  buttonText: string;
  buttonAction: () => void;
}

export const ContatoSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        (event.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#16323d] mb-4">
            Contato
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {contactCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#f9f8f6] rounded-2xl p-8 border border-gray-100 hover:border-[#16323d] transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-[#16323d] mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-[#16323d] mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-700 mb-6">
                  {card.contact}
                </p>
                <motion.button
                  onClick={card.buttonAction}
                  className="px-6 py-3 bg-[#d5b14f] text-white rounded-md font-medium hover:bg-[#16323d] hover:text-white transition-all duration-500"
                >
                  {card.buttonText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <motion.div
            data-mobile-motion="fade"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 h-full"
          >
            <span className="inline-flex items-center px-4 py-1 border border-[#16323d] text-[#16323d] rounded-full text-xs tracking-[0.2em] uppercase mb-6">
              Fale Conosco
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-[#16323d] leading-tight mb-4">
              Vamos iniciar uma conversa. Entre em contato
            </h3>
            <p className="text-gray-600 mb-10">
              Seu e-mail não será compartilhado. Campos marcados com * são obrigatórios.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#16323d]">Seu Nome *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border-b border-gray-300 bg-transparent py-3 text-[#16323d] placeholder-gray-400 focus:border-[#16323d] focus:outline-none"
                  placeholder="Digite seu nome"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#16323d]">Seu E-mail *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border-b border-gray-300 bg-transparent py-3 text-[#16323d] placeholder-gray-400 focus:border-[#16323d] focus:outline-none"
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#16323d]">Seu Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full border-b border-gray-300 bg-transparent py-3 text-[#16323d] placeholder-gray-400 focus:border-[#16323d] focus:outline-none"
                  placeholder="+55 (00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#16323d]">Sua Mensagem *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full border border-gray-200 bg-transparent rounded-2xl p-4 text-[#16323d] placeholder-gray-400 focus:border-[#16323d] focus:outline-none"
                  placeholder="Conte-nos como podemos ajudar"
                />
              </div>
              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  Erro ao enviar mensagem. Tente novamente.
                </div>
              )}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#d5b14f] text-white rounded-md font-semibold shadow-md hover:bg-[#16323d] hover:text-white hover:shadow-lg transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-[32px] overflow-hidden border border-gray-100 h-full min-h-[450px]"
          >
            <iframe
              title="Localização Menarim Sementes"
              src="https://www.google.com/maps?q=Menarim+Sementes&output=embed"
              className="w-full h-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const contactCards: ContactCard[] = [
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Envie um e-mail",
    contact: "contato@menarimsementes.com.br",
    buttonText: "Enviar e-mail",
    buttonAction: () => { window.location.href = "mailto:contato@menarimsementes.com.br"; },
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Ligue para nós",
    contact: "+55 43 98808-2844",
    buttonText: "Ligar Agora",
    buttonAction: () => { window.location.href = "tel:+5543988082844"; },
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Visite nossas fazendas",
    contact: "Fazenda Vó Anna e Fazenda 5M",
    buttonText: "Ver Localização",
    buttonAction: () => {},
  },
];

