import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const AllPlans = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div id="precos" className="container mx-auto text-black p-5 ">
      <div className="grid justify-items-center   ">
        <div className="grid text-start text-black mt- p-4  ">
          <h2>Pronto para transformar sua presença nas redes sociais?</h2>

          <Carousel responsive={responsive}>
            <div className="mt-4 border shadow rounded-lg p-6 text-start">
              <h3>Plano Básico</h3>
              <p className="grid text-start pt-4">
                Criação de um site de alta qualidade, gerenciamento de mídias
                sociais, criação de conteúdo de marketing, SEO e otimização de
                conversões.
              </p>
              <h3 className="price mt-4 italic font-bold">R$ 1200,00/mês</h3>
              <p>
                Contrato de 12 meses
                <button className="font-bold mt-4 rounded-xl w-[200px] h-[50px]">
                  Assinar agora!
                </button>
              </p>
            </div>

            <div className="mt-4 border shadow  rounded-lg p-6">
              <h3>Plano Intermediário</h3>
              <p className="grid text-start pt-4 ">
                Tudo o que o Plano Básico oferece, além de campanhas de
                marketing por e-mail, publicidade paga, marketing de influência,
                marketing de conteúdo e análise de dados
              </p>
              <h3 className="price mt-4 italic font-bold">R$ 2400,00/mês</h3>
              <p>
                Contrato de 12 meses
                <button className="font-bold  mt-4 rounded-xl w-[200px] h-[50px]">
                  Assinar agora!
                </button>
              </p>
            </div>

            <div className="mt-4 border shadow  rounded-lg p-6">
              <h3>Plano Premium</h3>
              <p className="grid text-start pt-4 ">
                Tudo o que o Plano Intermediário oferece, além de
                desenvolvimento de aplicativos móveis, criação de vídeos, design
                gráfico, serviços de atendimento ao cliente, assessoria de
                imprensa e participação em eventos da indústria
              </p>
              <h3 className="price mt-4 italic font-bold">R$ 4800,00/mês</h3>
              <p>
                Contrato de 12 meses
                <button className="font-bold  mt-4 rounded-xl w-[200px] h-[50px]">
                  Assinar agora!
                </button>
              </p>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default AllPlans;
