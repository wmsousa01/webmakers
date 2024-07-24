import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { CiClock2, CiStar } from "react-icons/ci";
import { LuActivitySquare } from "react-icons/lu";
import { AiOutlineSafety } from "react-icons/ai";

const Solutions = () => {
  return (
    <div id="solutions" className="container mx-auto text-black py-20 ">
      <div className="grid ">
        <div className="text-center">
          <h1 className="text-center text-[#39B6EB] font-bold p-3">Soluções para impulsionar seu negócio</h1>

          <p className="mt-4">
            Entre em contato conosco hoje mesmo e descubra como a Sousas Mídia
            pode ajudar a sua empresa a crescer através das redes sociais.
          </p>
        </div>
        <div className="grid justify-center">
          <div className="grid md:grid-cols-4 text-center mt-10 justify-center gap-3">
            <div className="grid justify-items-center p-8 border shadow-2xl rounded-lg w-[250px] hover:scale-110 hover:bg-blue-300 ease-in-out duration-500">
              <CiClock2 size={30} color="blue" fontSize={1.5} />
              <p className="p-2 font-bold">Otimização de conteúdo</p>

              <p>
                Com a criação e otimização de perfis em múltiplas plataformas,
                publicação de conteúdo várias vezes ao dia.
              </p>
            </div>

            <div className="grid justify-items-center p-8 border shadow-2xl rounded-lg w-[250px] hover:scale-110 hover:bg-yellow-300 ease-in-out duration-500">
              <AiOutlineSafety size={30} color="orange" />
              <p className="grid text-center p-2 font-bold">
                Monitoramento de comportamento
              </p>

              <p>
                Monitoramento e resposta a comentários e mensagens 24/7, gestão
                de crises e reputação online.
              </p>
            </div>

            <div className="grid justify-items-center p-8 border shadow-2xl rounded-lg w-[250px] hover:scale-110 hover:bg-purple-300 ease-in-out duration-500">
              <CiStar size={30} color="purple" />
              <p className="grid text-center p-2 font-bold">
                Campanhas para crescimento
              </p>

              <p>
                Criação de campanhas de engajamento e crescimento de seguidores,
                um relatório semanal detalhado de desempenho.
              </p>
            </div>

            <div className="grid justify-items-center p-8 border shadow-2xl rounded-lg w-[250px] hover:scale-110 hover:bg-red-300 ease-in-out duration-500">
              <LuActivitySquare size={30} color="red" />
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

export default Solutions;
