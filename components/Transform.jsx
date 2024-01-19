import React from "react";
import Image from "next/image";
import ProdutoImg1 from "../public/img-1.png";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

const Transform = () => {
  return (
    <section id="transform" className="container mx-auto">
      <div className="grid justify-items-center p-5 mt-20">
        <h2>Transforme sua presença nas redes sociais</h2>

        <p>
          aumente seu alcance, engajamento e retorno sobre o investimento com
          nossos planos personalizados de midia social.
        </p>
        <ul>
          <li className="flex items-center p-4 hover:text-purple-600">
            <Link className="p-2" href="/contact">Saber mais</Link>
            <MdArrowRightAlt />
          </li>
         
        </ul>

        <Image
          src={ProdutoImg1}
          width={300}
          height={200}
          alt="imagem"
          className="p-4"
        />
      </div>
    </section>
  );
};

export default Transform;
