import Head from "next/head";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import Solutions from "../components/Solutions";
import FeatureBand from "../components/FeatureBand";
import AllPlans from "../components/AllPlans";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Web Makers - Soluções Web para Pequenas e Médias Empresas</title>
        <meta
          name="description"
          content="Web Makers oferece websites eficientes e econômicos para micro e pequenas empresas. Tenha um site profissional sem gastar além do necessário."
        />
        <link rel="icon" href="/assets/wm-circle.png" />
      </Head>
      <Hero />
      <TrustStrip />
      <Solutions />
      <FeatureBand />
      <AllPlans />
      <ContactSection />
    </div>
  );
}
