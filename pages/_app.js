import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
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
      <div style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "Montserrat, sans-serif", textAlign: "center", color: "#000" }}>
        Aproveite <span style={{ color: "#38b6ff" }}>20%</span> de Desconto no Seu Novo Site Durante o Mês de Agosto!
      </div>,
      {
        position: "top-center",
        autoClose: 20000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#FFF",
        },
      }
    );
  }, []);

  return (
    <div>
      <ToastContainer 
        position="top-right"
        autoClose={20000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
