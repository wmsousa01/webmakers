import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import GraficImg from "../public/assets/grafico-2.png";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

const IntermediatePlan = () => {
  const [isPara1Visible, setPara1Visible] = useState(false);

  const togglePara1Visibility = () => {
    setPara1Visible(!isPara1Visible);
  };

  return (
    <div id="intermediate" className="container mx-auto text-black">
      <div className="grid justify-center">
        <div className="grid md:grid-cols-2 p-5 mt-6 md:p-20">
          <div>
            <h2>
              Leve sua presença nas redes sociais para o próximo nível com nosso
              Plano Intermediário
            </h2>

            <p className="mt-4">
              Perfeito para empresas que desejam aumentar sua presença nas redes
              sociais. Este plano oferece criação e otimização de perfis em até
              três plataformas, publicação de conteúdo diário, monitoramento e
              resposta a comentários e mensagens sete dias por semana, gestão de
              crises e reputação online, e um relatório semanal de desempenho.
            </p>

            <div className="border shadow-lg rounded-lg p-4 mt-4">
              <div
                onClick={togglePara1Visibility}
                className="flex items-center cursor-pointer"
              >
                <IoIosArrowDown />
                <h2 className="p-2 font-bold text-2xl">Entenda seu público</h2>
              </div>
              <ul
                id="para1"
                className={`p-4 ${isPara1Visible ? "block" : "hidden"}`}
              >
                Veja um aumento significativo no engajamento e retorno sobre o
                investimento.
              </ul>
            </div>
          </div>

          <div className="grid justify-center mt-4">
            <Image
              src={GraficImg}
              alt={"imagem do produto"}
              width={500}
              height={400}
              className="shadow border-4 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntermediatePlan;
