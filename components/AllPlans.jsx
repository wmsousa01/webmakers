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
    <div id="services" className="container mx-auto text-black p-5 ">
      <div className="grid justify-items-center  ">
        <div className="grid  text-2xl text-black mt- p-4 ">
          <h2>Pronto para transformar sua presença nas redes sociais?</h2>
          <Carousel responsive={responsive}>
            <div className="card mt-4">
              <h3>Plano Básico</h3>
              <p className="grid text-start pt-4">
                Criação de um site de alta qualidade, gerenciamento de mídias
                sociais, criação de conteúdo de marketing, SEO e otimização de
                conversões.
              </p>
              <p className="price mt-4 font-bold">R$ 1200,00/mês</p>
              <p>
                <button className="font-bold p-4 mt-4 rounded-full">Assinar agora!</button>
              </p>
            </div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default AllPlans;
