"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { motion } from "framer-motion";

export default function TrabalheConoscoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("O arquivo deve ter no máximo 5MB");
        return;
      }
      if (selectedFile.type !== "application/pdf") {
        alert("O arquivo deve ser em formato PDF");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nome", formData.nome);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("telefone", formData.telefone);
      formDataToSend.append("mensagem", formData.mensagem);
      if (file) {
        formDataToSend.append("curriculo", file);
      }

      const response = await fetch("/api/trabalhe-conosco", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Candidatura enviada com sucesso! Entraremos em contato em breve.");
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          mensagem: "",
        });
        setFile(null);
      } else {
        alert("Erro ao enviar candidatura. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Erro ao enviar candidatura. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="overflow-x-hidden pt-32 md:pt-40">
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#16323d] mb-6">
                  Trabalhe Conosco
                </h1>
                <div className="inline-block mb-6">
                  <span className="px-4 py-2 rounded-full text-sm font-medium text-[#16323d] border border-[#16323d]/30">
                    FAÇA PARTE DO TIME
                  </span>
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Faça parte do time Menarim!
                </p>
                <p className="text-base md:text-lg text-gray-600 mt-4">
                  Estamos sempre em busca de talentos que queiram fazer a diferença e crescer conosco.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="bg-[#f9f8f6] rounded-2xl p-8 md:p-12 border border-gray-100 shadow-lg"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-semibold text-[#16323d] mb-2"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#16323d] focus:ring-2 focus:ring-[#16323d]/20 outline-none transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-[#16323d] mb-2"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#16323d] focus:ring-2 focus:ring-[#16323d]/20 outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="telefone"
                      className="block text-sm font-semibold text-[#16323d] mb-2"
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#16323d] focus:ring-2 focus:ring-[#16323d]/20 outline-none transition-colors"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mensagem"
                      className="block text-sm font-semibold text-[#16323d] mb-2"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#16323d] focus:ring-2 focus:ring-[#16323d]/20 outline-none transition-colors resize-none"
                      placeholder="Conte-nos um pouco sobre você e suas experiências..."
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Arquivos até 5mb - Formato PDF
                    </p>
                    <label
                      htmlFor="curriculo"
                      className="flex items-center justify-center w-full px-6 py-4 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#16323d] hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[#16323d] font-medium">
                        {file ? file.name : "Escolher Arquivo"}
                      </span>
                      <input
                        type="file"
                        id="curriculo"
                        name="curriculo"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-4 bg-[#16323d] text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-[#16323d] hover:shadow-lg transition-all duration-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

