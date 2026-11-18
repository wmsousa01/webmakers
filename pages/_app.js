import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../styles/globals.css';
import Script from 'next/script';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import ChatGPTChat from '../components/gpt/ChatGptChat'; // Importa o componente do chat

// Fontes do design, versionadas em assets/fonts. O next/font/google baixava os arquivos
// durante o build e quebrava na Vercel quando o Google devolvia URL sem extensão.
const figtree = localFont({
  src: '../assets/fonts/figtree-latin-variable.woff2',
  weight: '300 900',
  variable: '--font-sans',
  display: 'swap',
});
const jakarta = localFont({
  src: '../assets/fonts/plus-jakarta-sans-latin-variable.woff2',
  weight: '200 800',
  variable: '--font-display',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // The ops panel is an internal admin surface — no public chrome, no GA, no chat.
  // Client proposals (/proposta/*) are standalone documents with their own header
  // and CTA — the lead-capture chat would fight with them.
  const isBare =
    router.pathname.startsWith('/painel') || router.pathname.startsWith('/proposta');

  if (isBare) {
    return (
      <div className={`${figtree.variable} ${jakarta.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    );
  }

  return (
    <div className={`${figtree.variable} ${jakarta.variable} font-sans`}>
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

      {/* Navbar (sticky) */}
      <Navbar />

      {/* Conteúdo da página */}
      <Component {...pageProps} />

      {/* Rodapé */}
      <Footer />

      {/* Chat renderizado em todas as telas */}
      <ChatGPTChat />
    </div>
  );
}

export default MyApp;
