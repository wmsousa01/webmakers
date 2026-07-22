import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../styles/globals.css';
import Script from 'next/script';
import { Figtree, Plus_Jakarta_Sans } from 'next/font/google';
import { useRouter } from 'next/router';
import ChatGPTChat from '../components/gpt/ChatGptChat'; // Importa o componente do chat
import MobileCtaBar from '../components/MobileCtaBar';

// Fontes do design (auto-hospedadas — sem depender de @import externo).
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // The ops panel is an internal admin surface — no public chrome, no GA, no chat.
  const isPanel = router.pathname.startsWith('/painel');

  if (isPanel) {
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

      {/* CTA sempre visível no mobile (substitui o botão flutuante nessa faixa) */}
      <MobileCtaBar />
    </div>
  );
}

export default MyApp;
