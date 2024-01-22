import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import GraficImg from "../public/assets/grafico.png";
import { CiClock2, CiStar } from "react-icons/ci";
import { LuActivitySquare } from "react-icons/lu";
import { AiOutlineSafety } from "react-icons/ai";

const PremiumPlan = () => {
  return (
    <div id="services" className="container mx-auto text-black p-5 ">
      <div className="grid justify-items-center  ">
        <div className="grid text-start text-2xl text-black mt-6">
          <h2>Maximize seu alcance e engajamento com nosso Plano Premium</h2>
        </div>
        <div className="grid text-start mt-4">
          <p>
            Entre em contato conosco hoje mesmo e descubra como a Sousas Mídia
            pode ajudar a sua empresa a crescer através das redes sociais.
          </p>
        </div>
        <div className="grid justify-items-center p-8">
          <CiClock2 size={30} />
          <p className="p-2 font-bold">Otimização de conteúdo</p>
        </div>
        <div className="grid text-center">
          <p>
            Com a criação e otimização de perfis em múltiplas plataformas,
            publicação de conteúdo várias vezes ao dia.
          </p>
        </div>
        <div className="grid justify-items-center p-8">
          <AiOutlineSafety size={30} />
          <p className="grid text-center p-2 font-bold">Monitoramento de comportamento</p>
        </div>
        <div className="grid text-center">
          <p>
            Monitoramento e resposta a comentários e mensagens 24/7, gestão de
            crises e reputação online
          </p>
        </div>
        <div className="grid justify-items-center p-8">
          <CiStar size={30} />
          <p className="grid text-center p-2 font-bold">Campanhas para crescimento</p>
        </div>
        <div className="grid text-center">
          <p>
            Criação de campanhas de engajamento e crescimento de seguidores, um
            relatório semanal detalhado de desempenho
          </p>
        </div>
        <div className="grid justify-items-center p-8">
        <LuActivitySquare size={30} />
          <p className="p-2 font-bold">Estratégia Digital</p>
        </div>
        <div className="grid text-center">
          <p>
            Consultoria estratégica mensal. Com este plano, o retorno sobre o
            investimento será uma certeza, não apenas uma possibilidade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlan;
