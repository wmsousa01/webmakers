import { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../styles/globals.css';
import Script from 'next/script';
import ChatGPTChat from '../components/gpt/ChatGptChat'; // Importa o componente do chat

function MyApp({ Component, pageProps }) {
  const [showOffer, setShowOffer] = useState(true); // Controla a exibição do alerta

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowOffer(false); // Esconde a label se o scroll for maior que 50px
      } else {
        setShowOffer(true); // Mostra a label novamente se o usuário voltar ao topo
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Limpa o listener ao desmontar
    };
  }, []);

  return (
    <div>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `,
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Label de oferta - com ajustes de posicionamento */}
      {showOffer && (
        <div className="bg-yellow-400 text-black text-center p-4 font-bold text-lg cursor-pointer fixed top-[70px] w-full z-50" onClick={() => window.location.href = '/#precos'}>
          🏷️ Aproveite 20% OFF em todos os planos! Clique aqui e saiba mais.
        </div>
      )}

      {/* Conteúdo da página */}
      <div className={showOffer ? "mt-[70px]" : "mt-[0px]"}>
        <Component {...pageProps} />
      </div>

      {/* Rodapé */}
      <Footer />

      {/* Chat renderizado em todas as telas */}
      <ChatGPTChat />
    </div>
  );
}

export default MyApp;
