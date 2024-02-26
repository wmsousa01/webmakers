import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import Whatsapp from "../components/Whatsapp";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Whatsapp />
      <Footer />
    </div>
  );
}

export default MyApp;
