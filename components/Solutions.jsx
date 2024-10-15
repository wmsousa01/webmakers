import React from "react";
import { AiOutlineDesktop, AiOutlineDeploymentUnit, AiOutlineShoppingCart, AiOutlineRobot } from "react-icons/ai";

const Solutions = () => {
  return (
    <div id="solutions" className="container mx-auto text-black py-20">
      <div className="grid">
        <div className="text-center">
          <h1 className="text-center text-[#39B6EB] text-4xl md:text-4xl font-bold p-3">
            Soluções para impulsionar seu negócio
          </h1>

          <p className="mt-4">
            Entre em contato conosco hoje mesmo e descubra como a nossa equipe
            pode ajudar a sua empresa.
          </p>
        </div>
        <div className="grid justify-center">
          <div className="grid md:grid-cols-4 text-center mt-10 justify-center gap-3">
            {/* Card 1 */}
            <div className="grid justify-items-center p-8 border shadow-2xl rounded-lg w-[250px] hover:scale-110 hover:bg-gray-200 ease-in-out duration-500">
              <AiOutlineDesktop size={30} color="#39B6EB" />
              <p className="p-2 font-bold text-lg">Presença online de impacto</p>
              <p>
                Crie um site institucional moderno e responsivo que reflita a
                identidade da sua empresa e atraia novos clientes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="grid justify-items-center p-8 border shadow-2xl rounded-lg w-[250px] hover:scale-110 hover:bg-gray-200 ease-in-out duration-500">
              <AiOutlineDeploymentUnit size={30} color="#39B6EB" />
              <p className="text-center p-2 font-bold text-lg">Conectividade Eficiente</p>
              <p>
                Integre seus sistemas web para aumentar a eficiência
                operacional, reduzir erros e melhorar a tomada de decisões.
              </p>
            </div>

            {/* Card 3 */}
            <div className="grid justify-items-center p-8 border shadow-2xl rounded-lg w-[250px] hover:scale-110 hover:bg-gray-200 ease-in-out duration-500">
              <AiOutlineRobot size={30} color="#39B6EB" />
              <p className="text-center p-2 font-bold text-lg">Produtividade Automatizada</p>
              <p>
                Implemente soluções de automação que otimizam processos
                repetitivos, liberando tempo para atividades estratégicas.
              </p>
            </div>

            {/* Card 4 (ajustado) */}
            <div className="grid justify-items-center p-8 border shadow-2xl rounded-lg w-[250px] hover:scale-110 hover:bg-gray-200 ease-in-out duration-500">
              <AiOutlineShoppingCart size={30} color="#39B6EB" />
              <p className="text-center p-2 font-bold text-lg">
                Comércio Eletrônico Simplificado
              </p>
              <p>
                Crie uma loja virtual eficiente e fácil de gerenciar, conectando seu produto a clientes em todo o país.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
