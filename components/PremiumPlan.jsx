import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { CiClock2, CiStar } from "react-icons/ci";
import { LuActivitySquare } from "react-icons/lu";
import { AiOutlineSafety } from "react-icons/ai";

const PremiumPlan = () => {
  return (
    <div id="services" className="container mx-auto text-black p-5 ">
      <div className="grid ">
        <div className="md:text-center">
          <h2>Maximize seu alcance e engajamento com nosso Plano Premium</h2>

          <p className="mt-4">
            Entre em contato conosco hoje mesmo e descubra como a Sousas Mídia
            pode ajudar a sua empresa a crescer através das redes sociais.
          </p>
        </div>
        <div className="grid justify-center">
          <div className="grid md:grid-cols-4 text-center mt-10 justify-center gap-3">
            <div className="grid justify-items-center p-8 border shadow-lg rounded-lg w-[250px]">
              <CiClock2 size={30} color="blue" fontSize={1.5} />
              <p className="p-2 font-bold">Otimização de conteúdo</p>

              <p>
                Com a criação e otimização de perfis em múltiplas plataformas,
                publicação de conteúdo várias vezes ao dia.
              </p>
            </div>

            <div className="grid justify-items-center p-8 border shadow-lg rounded-lg w-[250px]">
              <AiOutlineSafety size={30} color="orange"/>
              <p className="grid text-center p-2 font-bold">
                Monitoramento de comportamento
              </p>

              <p>
                Monitoramento e resposta a comentários e mensagens 24/7, gestão
                de crises e reputação online.
              </p>
            </div>

            <div className="grid justify-items-center p-8 border shadow-lg rounded-lg w-[250px]">
              <CiStar size={30} color="purple" />
              <p className="grid text-center p-2 font-bold">
                Campanhas para crescimento
              </p>

              <p>
                Criação de campanhas de engajamento e crescimento de seguidores,
                um relatório semanal detalhado de desempenho.
              </p>
            </div>

            <div className="grid justify-items-center p-8 border shadow-lg rounded-lg w-[250px]">
              <LuActivitySquare size={30} color="red"/>
              <p className="p-2 font-bold">Estratégia Digital</p>

              <p>
                Consultoria estratégica mensal. Com este plano, o retorno sobre
                o investimento será uma certeza, não apenas uma possibilidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlan;
