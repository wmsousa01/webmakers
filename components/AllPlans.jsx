import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import ChatGPTChat from "./gpt/ChatGptChat"; // Importando o componente do chat

const AllPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null); // Estado para controlar o plano selecionado
  const [showChat, setShowChat] = useState(false); // Estado para controlar a abertura do modal

  // Função para abrir o modal e definir o plano selecionado
  const handleOpenChat = (plan) => {
    setSelectedPlan(plan);
    setShowChat(true);
  };

  // Função para fechar o modal
  const handleCloseChat = () => {
    setSelectedPlan(null);
    setShowChat(false);
  };

  // Função para gerar o link do WhatsApp com o nome do plano
  const getWhatsAppLink = (planName) => {
    const message = encodeURIComponent(`Olá, vim do site e gostaria de comprar o plano ${planName}`);
    return `https://api.whatsapp.com/send?phone=5519989331908&text=${message}`;
  };

  // Argumentos de venda com senso de urgência para cada plano
  const planDetails = {
    WebStart: {
      name: "Web Start",
      description: "Perfeito para pequenas empresas que querem iniciar sua presença digital sem perder tempo. Garanta um site profissional e conquiste novos clientes agora mesmo!",
      advantages: [
        "Site institucional responsivo (Até 5 páginas)",
        "Integração básica de sistemas",
        "Automação de processos simples",
        "Suporte técnico básico"
      ]
    },
    WebBoost: {
      name: "Web Boost",
      description: "Seu negócio está crescendo? Não perca oportunidades! Fortaleça sua presença digital com mais recursos e integração. Comece hoje a acelerar seus resultados!",
      advantages: [
        "Site institucional responsivo (Até 10 páginas)",
        "Integração de múltiplos sistemas",
        "Automação de processos intermediários",
        "Suporte técnico prioritário"
      ]
    },
    WebMastery: {
      name: "Web Mastery",
      description: "Seu negócio merece o melhor. Garanta um site completo, com integrações e automações avançadas. Transforme sua presença digital e domine seu mercado agora!",
      advantages: [
        "Site institucional completo e personalizado",
        "Integração total de sistemas",
        "Automação avançada de processos",
        "Suporte premium e consultoria contínua"
      ]
    }
  };

  return (
    <div id="precos" className="container mx-auto p-3">
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 bg-gray-100 md:p-20">
        <h1 className="text-center text-[#39B6EB] text-3xl md:text-4xl font-bold p-5">
          Escolha o plano que se adapta ao seu negócio
        </h1>

        <p className="text-center max-w-2xl text-lg text-gray-500">
          Cada plano foi pensado para atender as necessidades específicas do seu negócio. Clique em um plano para saber mais e falar com nossa assistente virtual.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center w-full max-w-5xl mt-8">
          {/* Card Web Start */}
          <div
            className="flex flex-col mt-8 bg-white rounded-lg shadow-lg hover:scale-110 ease-in duration-500 cursor-pointer h-[450px] w-full md:w-[350px]" // Altura reduzida para 450px
            onClick={() => handleOpenChat("WebStart")}
          >
            <div className="flex flex-col items-center p-10 bg-gray-200">
              <span className="font-semibold text-2xl">Web Start</span>
              <p className="text-gray-500 text-sm">Ideal para pequenas empresas</p>
            </div>

            <div className="p-8 text-base flex-grow"> {/* Texto e benefícios mantidos */}
              <ul className="">
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Site institucional responsivo (Até 5 páginas)</p>
                </li>
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Integração básica de sistemas</p>
                </li>
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Automação de processos simples</p>
                </li>
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Suporte técnico básico</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Card Web Boost */}
          <div
            className="flex flex-col mt-8 bg-white rounded-lg shadow-lg hover:scale-110 ease-in duration-500 cursor-pointer h-[450px] w-full md:w-[350px]"
            onClick={() => handleOpenChat("WebBoost")}
          >
            <div className="flex flex-col items-center p-10 bg-gray-200">
              <span className="font-semibold text-2xl">Web Boost</span>
              <p className="text-gray-500 text-sm">Para empresas em crescimento</p>
            </div>

            <div className="p-8 text-base flex-grow">
              <ul className="">
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Site institucional responsivo (Até 10 páginas)</p>
                </li>
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Integração de múltiplos sistemas</p>
                </li>
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Automação de processos intermediários</p>
                </li>
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Suporte técnico prioritário</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Card Web Mastery */}
          <div
            className="flex flex-col mt-8 bg-white rounded-lg shadow-lg hover:scale-110 ease-in duration-500 cursor-pointer h-[450px] w-full md:w-[350px]"
            onClick={() => handleOpenChat("WebMastery")}
          >
            <div className="flex flex-col items-center p-10 bg-gray-200">
              <span className="font-semibold text-2xl">Web Mastery</span>
              <p className="text-gray-500 text-sm">Para negócios avançados</p>
            </div>

            <div className="p-8 text-base flex-grow">
              <ul className="">
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Site institucional completo e personalizado</p>
                </li>
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Integração total de sistemas</p>
                </li>
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Automação avançada de processos</p>
                </li>
                <li className="flex items-center">
                  <FaCheck size={16} color="green" />
                  <p className="ml-2 p-2">Suporte premium e consultoria contínua</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-lg">
            Precisa de algo mais personalizado? Entre em contato e crie uma solução sob medida para o seu negócio.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=5519989331908&text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20falar%20com%20um%20especialista."
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="mt-4 px-6 py-2 bg-[#39B6EB] text-white rounded-lg hover:bg-blue-600">
              Fale com um especialista
            </button>
          </a>
        </div>
      </div>

      {/* Modal do Chat com Argumentos de Venda */}
      {showChat && selectedPlan && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 w-full max-w-3xl relative">
            <button
              onClick={handleCloseChat}
              className="absolute top-4 right-8 bg-red-500 text-white p-2 rounded-full"
            >
              X
            </button>
            <div className="h-[500px] w-full overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{planDetails[selectedPlan].name}</h2>
              <p className="mb-4">{planDetails[selectedPlan].description}</p>
              <ul className="mb-8">
                {planDetails[selectedPlan].advantages.map((advantage, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <FaCheck size={16} color="green" />
                    <p className="ml-2">{advantage}</p>
                  </li>
                ))}
              </ul>
              <a
                href={getWhatsAppLink(planDetails[selectedPlan].name)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-6 py-2 bg-[#39B6EB] text-white rounded-lg hover:bg-blue-600">
                  Quero Comprar
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPlans;
