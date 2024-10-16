import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ChatGPTChat from "../components/gpt/ChatGptChat"; // Importe o componente do chat
import "../styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Tawk.to Script
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/66acb00032dca6db2cb9249c/1i498v0jd';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();
  }, []);

  useEffect(() => {
    toast(
      <div style={{ fontSize: "18px", fontWeight: "bold", fontFamily: "Montserrat, sans-serif", textAlign: "center", color: "#333" }}>
        Aproveite <span style={{ color: "#39B6EB" }}>20% de Desconto</span> no Seu Novo Site!
      </div>,
      {
        position: "top-center",
        autoClose: 15000,  // Fecha automaticamente em 15 segundos
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#FFF", // Fundo branco
          borderRadius: "12px",  // Bordas arredondadas
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",  // Sombra suave
          border: "1px solid #39B6EB",  // Borda azul suave
          padding: "15px",  // Padding para uma sensação mais "arejada"
        },
        progressStyle: {
          background: "#39B6EB",  // Cor do progresso para combinar com a marca
        }
      }
    );
  }, []);

  return (
    <div>
      <ToastContainer 
        position="top-right"
        autoClose={15000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"  // Tema mais leve e claro
      />
      <Navbar />
      <Component {...pageProps} />
      <ChatGPTChat /> {/* Chat exibido em todas as telas */}
      <Footer />
    </div>
  );
}

export default MyApp;
