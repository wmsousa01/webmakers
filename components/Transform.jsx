import React from "react";
import Image from "next/image";
import ProdutoImg1 from "../public/img-1.png";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

const Transform = () => {
  return (
    <section id="transform" className="container mx-auto">
      <div className="grid md:grid-cols-3 p-5 mt-20">
        <div>
          <h2>Transforme sua presença nas redes sociais</h2>
          <p className="mt-4">
            aumente seu alcance, engajamento e retorno sobre o investimento com
            nossos planos personalizados de midia social.
          </p>
          <ul>
            <li className="mt-4">
              <Link href="/contact">
                <button className="p-2">Começar</button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="grid justify-center p-5">
          <Image
            src={ProdutoImg1}
            width={450}
            height={200}
            alt="imagem"
            className="p-4"
          />
        </div>

        <div className="grid items-center ">
          <div className="">
            <h2>Ouça a voz das redes sociais</h2>
            <p className="mt-4">Não deixe seus clientes sem respostas nunca mais!</p>

            <li className="flex mt-4 hover:text-purple-600">
              <Link className="flex items-center" href="/contact">
                <p>Saiba mais </p>
                <MdArrowRightAlt />
              </Link>
            </li>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Transform;
