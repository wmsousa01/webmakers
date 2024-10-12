import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProdutoImg1 from "../public/assets/img.png";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [showParagraph, setShowParagraph] = useState(false); // Controle para exibir o parágrafo
  const fullText = "Websites eficientes que cabem no seu bolso";

  // Função para simular o efeito de digitação
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setShowParagraph(true); // Mostra o parágrafo após a animação de typing
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="hero" className="mt-[83px]">
      <div className="relative">
        <Image
          src={ProdutoImg1}
          width={2000}
          height={0}
          alt="imagem"
          className="w-full md:h-[700px] h-[600px]"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-10">
          <div className="text-center p-5">
            {/* Texto com animação de typing */}
            <h1 className="text-white text-4xl font-bold">
              {displayedText}
            </h1>

            {/* Parágrafo exibido com atraso */}
            {showParagraph && (
              <p className="text-white text-lg mt-4 animate-fadeIn">
                Sua empresa precisa de um site profissional para crescer, mas sem gastar além do necessário.
                Economize com nossas soluções sob medida para micro e médias empresas.
              </p>
            )}
          </div>

          <div className="hover:scale-110 ease-out duration-300">
            {/* Botão agora redireciona para o chat */}
            <Link href="/#chat">
              <button className="bg-[#39B6EB] text-white p-2 h-12 w-64 text-lg rounded-full flex items-center justify-center gap-2 hover:bg-[#2A94B5] transition-colors duration-300">
                Clique para economizar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
