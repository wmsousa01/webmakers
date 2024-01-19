import React from "react";
import Image from "next/image";

const AllPlans = () => {
  return (
    <div id="precos" className=" ">
      <div className="">
        <div className=" ">
          <h2 className="p-5">
            Pronto para transformar sua presença nas redes sociais?
          </h2>

          <div className="flex flex-col items-center justify-center min-h-screen p-10 text-gray-700 bg-gray-100 md:p-20">
            <h2 className="text-2xl font-medium">Preços</h2>

            <div className="flex flex-wrap items-center justify-center w-full max-w-4xl mt-8">
              <div className="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center p-10 bg-gray-200">
                  <span className="font-semibold">Plano Básico</span>
                  <div className="flex items-center">
                    <span className="text-3xl">R$</span>
                    <span className="text-5xl font-bold">1200</span>
                    <span className="text-2xl text-gray-500">/mês</span>
                  </div>
                </div>
                <div className="p-10">
                  <ul>
                    <li className="flex items-center">
                      <p className="ml-2">
                        Criação de um site de alta qualidade, gerenciamento de
                        mídias sociais, criação de conteúdo de marketing, SEO e
                        otimização de conversões.
                      </p>
                    </li>

                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="ml-2">Contrato de 12 meses</span>
                    </li>
                  </ul>
                </div>
                <div className="flex px-10 pb-10 justfy-center">
                  <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-blue-700 rounded-lg">
                    Assinar agora!
                  </button>
                </div>
              </div>

              <div class="flex flex-col flex-grow mt-8 overflow-hidden transform bg-white rounded-lg shadow-lg md:scale-110">
                <div class="flex flex-col items-center p-10 bg-gray-200">
                  <span class="font-semibold">Plano Intermediario</span>
                  <div class="flex items-center">
                    <span class="text-3xl">R$</span>
                    <span class="text-6xl font-bold">2400</span>
                    <span class="text-2xl text-gray-500">/mês</span>
                  </div>
                </div>
                <div class="p-10">
                  <ul>
                    <li class="flex items-center">
                      <span class="ml-2 italic">
                        {" "}
                        Tudo o que o Plano Básico oferece, além de campanhas de
                        marketing por e-mail, publicidade paga, marketing de
                        influência, marketing de conteúdo e análise de dados
                      </span>
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="w-5 h-5 text-green-600 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="ml-2">Contrato de 12 meses</span>
                    </li>
                  </ul>
                </div>
                <div class="flex px-10 pb-10 justfy-center">
                  <button class="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-bg-blue-700 rounded-lg">
                    Assinar agora!
                  </button>
                </div>
              </div>
            </div>
            <div class="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
              <div class="flex flex-col items-center p-10 bg-gray-200">
                <span class="font-semibold">Plano Premium</span>
                <div class="flex items-center">
                  <span class="text-3xl">R$</span>
                  <span class="text-5xl font-bold">4800</span>
                  <span class="text-2xl text-gray-500">/mês</span>
                </div>
              </div>
              <div class="p-10">
                <ul>
                  <li class="flex items-center">
                    <span class="ml-2 italic">
                      Tudo o que o Plano Intermediário oferece, além de
                      desenvolvimento de aplicativos móveis, criação de vídeos,
                      design gráfico, serviços de atendimento ao cliente,
                      assessoria de imprensa e participação em eventos da
                      indústria
                    </span>
                  </li>
                  <li class="flex items-center">
                    <svg
                      class="w-5 h-5 text-green-600 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="ml-2">Contrato de 12 meses</span>
                  </li>
                </ul>
              </div>
              <div class="flex px-10 pb-10 justfy-center">
                <button class="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-blue-700 rounded-lg">
                  Assinar agora!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPlans;
