import React from "react";
import {
  FaBalanceScale,
  FaVectorSquare,
  FaUserClock,
  FaRegLightbulb,
  FaUserTie,
} from "react-icons/fa";
import { MdOutlineBuildCircle } from "react-icons/md";

const Valores = () => {
  return (
    <div id="principios" className="container rounded-lg mx-auto  text-white p-5">
      <div className="grid justify-items-center">
        <div className="md:w-1/2">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-center">
              Nossos Princípios para Eventos Memoráveis
            </h1>
          </div>
          <div className="text-justify">
            <p>
              {" "}
              Na Flavia Machado, celebramos momentos únicos com dedicação e
              paixão. Nossos valores fundamentais refletem a essência do nosso
              compromisso em tornar cada evento extraordinário.
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center p-4"></div>

      <div className="flex flex-wrap items-center pt-0">
        <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
          <div className="justify-center">
            <div className="my-4 w-full px-4">
              <a>
                <div className="bg-gray-400 shadow-lg rounded-lg p-4">
                  <h1 className="text-white">
                    <MdOutlineBuildCircle size={25} />
                  </h1>
                  <p className="text-lg text-white mt-4 font-semibold">
                    Adaptação
                  </p>
                  <p className="text-sm text-white mt-4 font-thin">
                    Assim como cada celebração é única, abraçamos a
                    flexibilidade, adaptando-nos para criar eventos
                    personalizados e memoráveis.
                  </p>
                </div>
              </a>
            </div>
            <div className="my-4 w-full px-4">
              <a>
                <div className="bg-gray-400 shadow-lg rounded-lg p-4 mt-4">
                  <h1 className="text-white">
                    <FaBalanceScale size={20} />
                  </h1>
                  <p className="text-lg text-white mt-4 font-semibold">
                    Harmonia
                  </p>
                  <p className="text-sm text-white mt-4 font-thin">
                    Em nosso espaço exclusivo, cultivamos a harmonia e a
                    integridade, garantindo eventos que ressoam autenticidade.
                  </p>
                </div>
              </a>
            </div>
            <div className="my-4 w-full px-4">
              <a>
                <div className="bg-gray-400 shadow-lg rounded-lg p-4">
                  <h1 className="text-white">
                    <FaVectorSquare size={20} />
                  </h1>
                  <p className="text-lg text-white mt-4 font-semibold">
                    Conexão
                  </p>
                  <p className="text-sm text-white mt-4 font-thin">
                    Acreditamos na força da colaboração, unindo esforços para
                    criar experiências que conectam pessoas e propósitos.
                  </p>
                </div>
              </a>
            </div>
            <div className="my-4 w-full px-4">
              <a>
                <div className="bg-gray-400 shadow-lg rounded-lg p-4">
                  <h1 className="text-white">
                    <FaUserClock size={20} />
                  </h1>
                  <p className="text-lg text-white mt-4 font-semibold">
                    Dedicação
                  </p>
                  <p className="text-sm text-white mt-4 font-thin">
                    Com empenho inabalável, nos dedicamos a superar
                    expectativas, transformando visões em realidade.
                  </p>
                </div>
              </a>
            </div>
            <div className="my-4 w-full px-4">
              <a>
                <div className="bg-gray-400 shadow-lg rounded-lg p-4">
                  <h1 className="text-white">
                    <FaUserTie size={20} />
                  </h1>
                  <p className="text-lg text-white mt-4 font-semibold">
                    Elegância
                  </p>
                  <p className="text-sm text-white mt-4 font-thin">
                    Buscamos a perspectiva perfeita em cada detalhe, adicionando
                    um toque de equilíbrio e elegância a todas as ocasiões.
                  </p>
                </div>
              </a>
            </div>
            <div className="my-4 w-full px-4">
              <a>
                <div className="bg-gray-400 shadow-lg rounded-lg p-4">
                  <h1 className="text-white">
                    <FaRegLightbulb size={20} />
                  </h1>
                  <p className="text-lg text-white mt-4 font-semibold">
                    Inovação
                  </p>
                  <p className="text-sm text-white mt-4 font-thin">
                    Na vanguarda do setor de eventos, promovemos a melhoria
                    contínua, explorando constantemente novas ideias e soluções.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Valores;
