import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import Image from "next/image";
import NavLogo from "../public/logo-sousas.svg";
import Link from "next/link";

function Footer() {
  return (
    <div>
      <div className="  h-1/2 w-full flex md:flex-row justify-around p-10 ">
        <div className=" ">
          <ul>
            <a>
              <Image
                src={NavLogo}
                alt="/"
                width="170"
                height="70"
                className="cursor-pointer"
              />
            </a>

            <div className="flex pl-2 gap-6 -mt-12">
              <a
                href="https://www.facebook.com/flaviamachadobuffeteeventos/?locale=pt_BR"
                target="_blank"
                rel="noreferrer"
              >
                <div className="text-2xl text-purple-500 cursor-pointer hover:text-gray-300 ">
                  <FaFacebook />
                </div>
              </a>
              <a
                href="https://www.instagram.com/flaviamachadobuffeteventos/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="text-2xl text-purple-500 cursor-pointer hover:text-gray-300">
                  <FaInstagram />
                </div>
              </a>
              <a href="https://wa.link/" target="_blank" rel="noreferrer">
                <div className="text-2xl text-purple-500 cursor-pointer hover:text-gray-300">
                  <FaWhatsapp />
                </div>
              </a>
            </div>
          </ul>
        </div>

        <div className="pb-5 pl-2">
          <ul>
            <p className="text-black font-bold text-2xl pb-4 mt-10  ">
              Sobre nós
            </p>
            <li className="text-black text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              <Link href="/#principios">Principios</Link>
            </li>

            <li className="text-black text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              <Link href="/contact">Contato </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-50">
        <h3 className=" text-gray-800 font-semibold">
          © 2024 Flavia | Todos os direitos reservados | Desenvolvido ❤ pela{" "}
          <span className="hover:text-gray-400 font-semibold cursor-pointer">
            <a
              href="https://www.sousasmidia.com.br/"
              target="_blank"
              rel="noreferrer"
            >
              Sousas Midia{" "}
            </a>
          </span>
        </h3>
      </div>
    </div>
  );
}

export default Footer;
