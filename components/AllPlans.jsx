import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import ChatGPTChat from "./gpt/ChatGptChat"; // Importando o componente do chat

const AllPlans = () => {
  const [showChat, setShowChat] = useState(false); // Estado para controlar a abertura do chat

  // Função para abrir o modal com o chat
  const handleOpenChat = () => {
    setShowChat(true);
  };

  // Função para fechar o modal
  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <div id="precos" className="container mx-auto p-3">
      <div className="">
        <div className=" ">
          <h2 className="mt-6 md:text-center"></h2>

          <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 bg-gray-100 md:p-20">
            {/* Tamanho do H1 ajustado */}
            <h1 className="text-center text-[#39B6EB] text-3xl md:text-4xl font-bold p-5">
              Escolha o plano que se adapta ao seu negócio
            </h1>

            <p className="text-center max-w-2xl text-gray-500">
              Cada plano foi pensado para atender as necessidades específicas do seu negócio. Clique em um plano para falar com nossa assistente virtual e receber mais detalhes.
            </p>

            {/* Cards de Planos */}
            <div className="flex flex-row md:flex-nowrap flex-wrap flex-grow items-center justify-center w-full max-w-5xl mt-8 space-x-6">
              {/* Card Web Start */}
              <div
                className="flex flex-col flex-grow mt-8 bg-white rounded-lg shadow-lg hover:scale-110 ease-in duration-500 cursor-pointer h-[550px] w-[350px]" // Tamanho fixo para todos os cards
                onClick={handleOpenChat}
              >
                <div className="flex flex-col items-center p-10 bg-gray-200">
                  <span className="font-semibold text-2xl">Web Start</span>
                  <p className="text-gray-500 text-sm">Ideal para pequenas empresas</p>
                </div>

                <div className="p-10 text-sm flex-grow">
                  <ul className="">
                    <li className="flex items-center">
                      <FaCheck size={16} color="green" />
                      <p className="ml-2 p-2">
                        Site institucional responsivo (Até 5 páginas)
                      </p>
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
                className="flex flex-col flex-grow mt-8 bg-white rounded-lg shadow-lg hover:scale-110 ease-in duration-500 cursor-pointer h-[550px] w-[350px]" // Tamanho fixo para todos os cards
                onClick={handleOpenChat}
              >
                <div className="flex flex-col items-center p-10 bg-gray-200">
                  <span className="font-semibold text-2xl">Web Boost</span>
                  <p className="text-gray-500 text-sm">Para empresas em crescimento</p>
                </div>

                <div className="p-10 text-sm flex-grow">
                  <ul className="">
                    <li className="flex items-center">
                      <FaCheck size={16} color="green" />
                      <p className="ml-2 p-2">
                        Site institucional responsivo (Até 10 páginas)
                      </p>
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
                className="flex flex-col flex-grow mt-8 bg-white rounded-lg shadow-lg hover:scale-110 ease-in duration-500 cursor-pointer h-[550px] w-[350px]" // Tamanho fixo para todos os cards
                onClick={handleOpenChat}
              >
                <div className="flex flex-col items-center p-10 bg-gray-200">
                  <span className="font-semibold text-2xl">Web Mastery</span>
                  <p className="text-gray-500 text-sm">Para negócios avançados</p>
                </div>

                <div className="p-10 text-sm flex-grow">
                  <ul className="">
                    <li className="flex items-center">
                      <FaCheck size={16} color="green" />
                      <p className="ml-2 p-2">
                        Site institucional completo e personalizado
                      </p>
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
                      <p className="ml-2 p-2">
                        Suporte premium e consultoria contínua
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-500">
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
        </div>
      </div>

      {/* Modal do Chat */}
      {showChat && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 w-full max-w-3xl relative">
            <button
              onClick={handleCloseChat}
              className="absolute top-4 right-8 bg-red-500 text-white p-2 rounded-full"
            >
              X
            </button>
            {/* Certifique-se de que o componente de chat é exibido corretamente */}
            <div className="h-[500px] w-full overflow-y-auto">
              <ChatGPTChat />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPlans;
