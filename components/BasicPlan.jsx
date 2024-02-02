import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import GraficImg from "../public/assets/grafico.png";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

const BasicPlan = () => {
  const [isReportsVisible, setReportsVisible] = useState(false);
  const [isCommentsVisible, setCommentsVisible] = useState(false);

  const toggleReportsVisibility = () => {
    setReportsVisible(!isReportsVisible);
  };

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!isCommentsVisible);
  };

  return (
    <div id="basic" className="container mx-auto text-black p-5">
      <div className="grid">
        <div className="grid md:text-center text-black mt-6">
          <h2 className="mt-8">
            Comece sua jornada nas redes sociais com nosso Plano Básico
          </h2>
          <p className="mt-4">
            Ideal para quem está começando a explorar o mundo das redes sociais.
            Este plano inclui a criação e otimização de perfis em duas
            plataformas, publicação de conteúdo duas vezes por semana,
            monitoramento e resposta de comentários em horário comercial, e um
            relatório mensal de desempenho.
          </p>
        </div>

        <div className="">
          <div className="grid md:grid-cols-2  mt-4">
            <div className="grid justify-center">
              <Image
                src={GraficImg}
                alt={"imagem do produto"}
                width={600}
                height={0}
                className="shadow border-4 rounded-lg"
              />
            </div>

            <div className="grid md:grid-rows-2 ">

              <div className="border shadow-lg rounded-lg p-4 mt-2 ">
                <div
                  onClick={toggleReportsVisibility}
                  className="flex items-center cursor-pointer"
                >
                  <IoIosArrowDown />
                  <h3 className=" p-2 font-bold text-2xl">Relatórios Mensais</h3>
                </div>
                {isReportsVisible && (
                  <p className="p-4">
                    Veja o retorno do seu investimento com nosso relatório
                    mensal de desempenho.
                  </p>
                )}
                {isReportsVisible && (
                  <li className="flex p-4 hover:text-purple-600">
                    <Link className="flex items-center" href="/contact">
                      <p>Saiba mais </p>
                      <MdArrowRightAlt />
                    </Link>
                  </li>
                )}
              </div>

              <div className="mt-4 border shadow-lg rounded-lg p-4">
                <div
                  onClick={toggleCommentsVisibility}
                  className="flex items-center cursor-pointer"
                >
                  <IoIosArrowDown />
                  <h3 className="flex p-2 font-bold text-2xl">
                    Monitoramento de Comentários
                  </h3>
                </div>
                {isCommentsVisible && (
                  <p className="p-4">
                    Aqui você pode adicionar o conteúdo do parágrafo de
                    Monitoramento de Comentários.
                  </p>
                )}
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicPlan;
