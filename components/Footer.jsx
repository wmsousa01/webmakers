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
      <div className="bg-[#39B6EB] h-[200px] w-full flex md:flex-row justify-around items-center flex-col p-10">
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
        <div className="flex  gap-12">
          <a
            href="https://web.facebook.com/profile.php?id=61563044076990"
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-2xl text-white cursor-pointer hover:text-gray-300 ">
              <FaFacebook />
            </div>
          </a>
          <a
            href="https://www.instagram.com/webmakersbr/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-2xl text-white cursor-pointer hover:text-gray-300">
              <FaInstagram />
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center p-5 ">
        Copyright Web Makers. Todos os direitos reservados.
      </div>
    </div>
  );
}

export default Footer;
