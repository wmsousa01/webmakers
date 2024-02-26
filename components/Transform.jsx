import React from "react";
import Image from "next/image";
import ProdutoImg1 from "../public/img-1.png";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

const Transform = () => {
  return (
    <section id="transform" className="container mx-auto">
      <div className="grid md:grid-cols-3 p-5 mt-20 md:p-20">
        <div>
          <div className="">
            <h1 className="mt-5">Transforme sua presença nas redes sociais</h1>
            <p className="mt-4">
              aumente seu alcance, engajamento e retorno sobre o investimento
              com nossos planos personalizados de midia social.
            </p>
            <ul>
              <li className="mt-4">
                <Link href="/#basic">
                  <button className="p-4">Começar</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid justify-center py-8">
          <Image
            src={ProdutoImg1}
            width={450}
            height={200}
            alt="imagem"
            className=""
          />
        </div>

        <div className="grid items-center ">
          <div className="hidden md:block">
            <h2>Ouça a voz das redes sociais</h2>
            <p className="mt-4">
              Não deixe seus clientes sem respostas nunca mais!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transform;
