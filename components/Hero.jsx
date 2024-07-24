import React from "react";
import Image from "next/image";
import ProdutoImg1 from "../public/assets/img.png";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="hero" className="mt-[83px] ">
      <div className="relative">
        <Image
          src={ProdutoImg1}
          width={2000}
          height={0}
          alt="imagem"
          className="w-full md:h-[700px] h-[600px]"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-10">
          <div className="">
            <h1 className="text-white text-center font-bold p-5">
              Soluções web para seu negócio
            </h1>
          </div>

          <div className="hover:scale-110 ease-out duration-300">
            <button className="p-2 h-12 w-52 rounded-full">
              Iniciar Sessão
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
