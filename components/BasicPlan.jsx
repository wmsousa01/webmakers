import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import GraficImg from "../public/assets/grafico.png";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

const BasicPlan = () => {
  const [isPara1Visible, setPara1Visible] = useState(false);
  const [isPara1Visible1, setPara1Visible1] = useState(false);

  const togglePara1Visibility = () => {
    setPara1Visible(!isPara1Visible);
  };
  const togglePara1Visibility1 = () => {
    setPara1Visible1(!isPara1Visible1);
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
          <div className="grid md:grid-cols-2 mt-4">
            <div className="grid justify-center">
              <Image
                src={GraficImg}
                alt={"imagem do produto"}
                width={700}
                height={0}
                className="shadow border-4 rounded-lg"
              />
            </div>

            <div className="grid md:grid-rows-2 md:items-center">
              <div className="border shadow-lg rounded-lg p-4 mt-4">
                <div
                  onClick={togglePara1Visibility}
                  className="flex items-center cursor-pointer"
                >
                  <IoIosArrowDown />
                  <h2 className="p-2 font-bold text-2xl">Relatórios Mensais</h2>
                </div>
                <ul
                  id="para1"
                  className={`p-4 ${isPara1Visible ? "block" : "hidden"}`}
                >
                  Veja o retorno do seu investimento com nosso relatório mensal
                  de desempenho.
                  <li className="flex mt-2 hover:text-purple-600">
                    <Link className="flex items-center" href="/contact">
                      <p>Saiba mais </p>
                      <MdArrowRightAlt />
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="border shadow-lg rounded-lg p-4 mt-4">
                <div
                  onClick={togglePara1Visibility1}
                  className="flex items-center cursor-pointer"
                >
                  <IoIosArrowDown />
                  <h2 className="p-2 font-bold text-2xl">
                    Monitoramento de comentários
                  </h2>
                </div>
                <div>
                  <p
                    id="para1"
                    className={`p-4 ${isPara1Visible1 ? "block" : "hidden"}`}
                  >
                    Veja um aumento significativo no engajamento e retorno sobre
                    o investimento.
                    <li className="flex mt-2 hover:text-purple-600">
                      <Link className="flex items-center" href="/contact">
                        <p>Saiba mais </p>
                        <MdArrowRightAlt />
                      </Link>
                    </li>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicPlan;
