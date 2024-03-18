import React from "react";
import Image from "next/image";
import ProdutoImg from "../public/assets/site.jpg";
import Logo from "../public/assets/logo-principal.png";

const Site = () => {
  return (
    <div className="">
      <div className="mt-24 grid justify-center ">
        <video
          autoPlay
          muted
          playsInline
          loop
          width={500}
          height={240}
          preload="auto"
        >
          <source src="/assets/videos/video-sousas.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="grid justify-items-center gap-8 mt-5">
        <h1 className="text-6xl md:text-8xl">Site</h1>
        <a
          href="https://api.whatsapp.com/send/?phone=989331908&text=Olá tudo bem!"
          target="_Blank"
          rel="noreferrer"
        >
          <button className="p-4 rounded-full w-[250px] text-xl">
            Iniciar sessão
          </button>
        </a>
        <h2 className="grid text-center md:w-[500px]">
          Seu Negócio em Destaque: Websites que Conquistam e Convertam
        </h2>
      </div>

      <div className="md:flex p-5 mt-10">
        <div
          style={{ borderRadius: "20px" }}
          className="border shadow-2xl  h-full  md:h-[700px] md:w-[600px] mx-auto mb-4 p-5 hover:bg-gray-200"
        >
          <div className="grid justify-center p-10">
            <Image src={Logo} alt="logo-branco" height={38.5} width={200} />
          </div>

          <div className="grid text-left  font-sans font-medium text-lg leading-loose md:mx-10">
            <h3 className="font-bold text-3xl ">
              Crie o Cartão de Visita Digital da Sua Marca
            </h3>
            <p className="mt-3">
              Em um mundo conectado, seu website é o primeiro aperto de mão com
              o cliente. A Sousas Mídia se especializa em transformar essa
              primeira impressão em uma conexão duradoura. Nossos sites são mais
              que uma interface bonita; são máquinas otimizadas para conversão,
              projetadas para refletir a singularidade da sua marca e
              impulsionar o engajamento. Cada pixel é pensado para contar sua
              história, e cada linha de código é escrita para abrir caminhos
              para o sucesso do seu negócio. Transforme visitantes em defensores
              da sua marca com um site que trabalha tão duro quanto você. Inicie
              seu projeto conosco hoje!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Site;
