import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import Whatsapp from "../components/Whatsapp";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    toast(
      <div style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "Montserrat, sans-serif", textAlign: "center", color: "#000" }}>
        Aproveite <span style={{ color: "#38b6ff" }}>20%</span> de Desconto no Seu Novo Site Durante o Mês de Agosto!
      </div>,
      {
        position: "top-center",
        autoClose: 15000,
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
        autoClose={15000}
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
      <Whatsapp />
      <Footer />
    </div>
  );
}

export default MyApp;
