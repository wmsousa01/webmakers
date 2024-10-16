import { useEffect } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../styles/globals.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Toast notification
    toast(
      <div style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "Montserrat, sans-serif", textAlign: "center", color: "#000" }}>
        Aproveite <span style={{ color: "#38b6ff" }}>20%</span> de Desconto no Seu Novo Site!
      </div>,
      {
        position: "top-right",
        autoClose: 15000, // Fechamento automático após 15 segundos
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#FFF", // Fundo claro
        },
      }
    );
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

      {/* ToastContainer com ajustes */}
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
      <Footer />
    </div>
  );
}

export default MyApp;
