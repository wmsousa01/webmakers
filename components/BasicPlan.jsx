import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import GraficImg from "../public/assets/grafico.png";

const BasicPlan = () => {
  return (
    <div id="basic" className="container mx-auto text-black p-5 ">
      <div className="grid justify-items-center  ">
        <div className="grid text-center text-2xl text-black mt-6 p-4 ">
          <h2>Comece sua jornada nas redes sociais com nosso Plano Básico</h2>
        </div>
        <div className="grid text-center">
          <p>
            Ideal para quem está começando a explorar o mundo das redes sociais.
            Este plano inclui a criação e otimização de perfis em duas
            plataformas, publicação de conteúdo duas vezes por semana,
            monitoramento e resposta de comentários em horário comercial, e um
            relatório mensal de desempenho.{" "}
          </p>
        </div>
        <div className="flex items-center p-4 ">
        <IoIosArrowDown  />
        <p className="p-2 font-bold">Monitoramento de comentários</p>
        
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

export default BasicPlan;
