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
       
          <div className="grid justify-center">
            <Image
              src={ProdutoImg1}
              width={300}
              height={200}
              alt="imagem"
              className="p-4"
            />
          </div>

          <div className=" ">
            <h2>Ouça a voz das redes sociais</h2>
            <p>Não deixe seus clientes sem respostas nunca mais!</p>
          </div>
        
      </div>
    </section>
  );
};

export default Transform;
