import React from "react";
import Image from "next/image";
import ProdutoImg1 from "../public/img-1.png";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

const Transform = () => {
  return (
    <div id="transformar" className="container mx-auto ">
      <div className="grid justify-items-center p-5 mt-20">
        <h2>transforme sua presença nas redes sociais</h2>

        <p>
          aumente seu alcance, engajamento e retorno sobre o investimento com
          nossos planos personalizados de midia social.
        </p>

        <div className="">
          <span className="p-2 text-purple-600 hover:text-blue-400 flex items-center">
            <a
              href="https://www.sousasmidia.com.br/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Saiba mais
            </a>

            <MdArrowRightAlt />
            <a />
          </span>
        </div>

        <Image
          src={ProdutoImg1}
          width={400}
          height={400}
          alt="imagem"
          className="p-4"
        />
      </div>
    </div>
  );
};

export default Transform;
