import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import Image from "next/image";
import NavLogo from "../public/assets/logo-principal.png";
import Link from "next/link";

function Footer() {
  return (
    <div>
      <div className="bg-gradient-to-r from-[#49f1dd] to-[#ed97ed] h-1/2 w-full  flex md:flex-row flex-col justify-around p-20">
        <div className="">
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
          </ul>
        </div>
        <div className="flex  gap-12 ">
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
      </div>

      <div className="flex flex-col justify-center items-center text-center p-5 ">
        <h3 className=" text-gray-800 font-semibold">
          © 2024 Sousas Midia | Todos os direitos reservados | Desenvolvido ❤
          pela{" "}
          <span className="hover:text-purple-600 font-semibold cursor-pointer">
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
