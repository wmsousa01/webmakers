import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import GraficImg from "../public/assets/grafico-2.png";

const IntermediatePlan = () => {
  return (
    <div id="intermediate" className="container mx-auto text-black p-5 ">
      <div className="grid justify-items-center  ">
        <div className="grid text-start text-2xl text-black mt-6">
          <h2>
            Leve sua presença nas redes sociais para o próximo nível com nosso
            Plano Intermediário
          </h2>
        </div>
        <div className="grid text-start mt-4">
          <p>
            Perfeito para empresas que desejam aumentar sua presença nas redes
            sociais. Este plano oferece criação e otimização de perfis em até
            três plataformas, publicação de conteúdo diário, monitoramento e
            resposta a comentários e mensagens sete dias por semana, gestão de
            crises e reputação online, e um relatório semanal de desempenho.
          </p>
        </div>
        <div className="flex items-center p-4 ">
          <IoIosArrowDown />
          <p className="p-2 font-bold">Total de Seguidores</p>
        </div>
        <div>
          <Image
            src={GraficImg}
            alt={"imagem do produto"}
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default IntermediatePlan;
