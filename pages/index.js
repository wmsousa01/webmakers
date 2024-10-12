import Head from "next/head";
import Hero from "../components/Hero";
import Solutions from "../components/Solutions";
import AllPlans from "../components/AllPlans";
import ChatGPTChat from "../components/gpt/ChatGptChat";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Web Makers - Soluções Web para Pequenas e Médias Empresas</title>
        <meta
        name="description"
        content="Web Makers oferece websites eficientes e econômicos para micro e pequenas empresas. Tenha um site profissional sem gastar além do necessário."
      />
        <link rel="icon" href="/logo-1.png" />
      </Head>
      <Hero />
      <ChatGPTChat />
      <Solutions />
      <AllPlans />
    </div>
  );
}
