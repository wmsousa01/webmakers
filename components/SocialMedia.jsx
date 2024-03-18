import React from "react";
import Image from "next/image";
import Logo from "../public/assets/logo-principal.png";
import Link from "next/link";

const SocialMedia = () => {
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
        <h1 className="text-6xl md:text-8xl text-center">Social Media</h1>
        <a
          href="https://api.whatsapp.com/send/?phone=989331908&text=Olá tudo bem!"
          target="_Blank"
          rel="noreferrer"
        >
          <button className="p-4 rounded-full w-[250px] text-xl bg-[#8949f1]">
            Iniciar sessão
          </button>
        </a>
        <h2 className="grid text-center md:w-[500px]">
          Alcance Global, Engajamento Local: Domine as Redes Sociais com a
          Sousas Mídia
        </h2>
      </div>

      <div className="md:flex p-5 mt-10">
        <div
          style={{ borderRadius: "20px" }}
          className="border shadow-2xl  h-full  md:h-[600px] md:w-[600px] mx-auto mb-4 p-5 hover:bg-gray-200"
        >
          <div className="grid justify-center p-10">
            <Image src={Logo} alt="logo-branco" height={38.5} width={200} />
          </div>

          <div className="grid text-left  font-sans font-medium text-lg leading-loose md:mx-10">
            <h3 className="font-bold text-3xl ">Conecte, Engaje e Cresça</h3>
            <p className="mt-3">
              Eleve sua marca ao patamar que ela merece com o poder das redes
              sociais. Na Sousas Mídia, nós não apenas destacamos sua voz em
              meio ao ruído digital; nós criamos uma sinfonia de conteúdo
              relevante e campanhas impactantes que ressoam diretamente com o
              seu público. Comece a jornada que transformará seu engajamento em
              resultados reais. Inicie agora e veja sua marca florescer nas
              mídias sociais.
            </p>
          </div>
        </div>

        <div
          style={{ borderRadius: "20px" }}
          className="border shadow-2xl  h-full  md:h-[600px] md:w-[600px] mx-auto  p-5 hover:bg-gray-200"
        >
          <div className="grid justify-center p-10">
            <Image src={Logo} alt="logo-branco" height={38.5} width={200} />
          </div>

          <div className="grid text-left  font-sans font-medium text-lg leading-loose md:mx-10">
            <h3 className="font-bold text-3xl ">
              Presença Digital Duplamente Poderosa
            </h3>
            <p className="mt-3">
              Imagine a sinergia perfeita entre seu site e mídias sociais — essa
              é a nossa promessa na Sousas Mídia. Combinamos estratégias de
              social media dinâmicas com websites responsivos e otimizados para
              captar a essência da sua marca e catalisar conversões. Aproveite o
              pacote completo que garante uma presença online que não apenas é
              vista, mas sentida. Conecte-se com a gente hoje e multiplique seu
              alcance digital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
