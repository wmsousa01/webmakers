import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import Image from "next/image";
import NavLogo from "../public/assets/logo-branco.png";
import Link from "next/link";

function Footer() {
  return (
    <div>
      <div className="bg-[#8949f1] h-[200px] w-full flex md:flex-row justify-around items-center flex-col p-10">
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
            href="https://www.facebook.com/sousasmidia/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-2xl text-white cursor-pointer hover:text-gray-300 ">
              <FaFacebook />
            </div>
          </a>
          <a
            href="https://www.instagram.com/agenciasousasmidia/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-2xl text-white cursor-pointer hover:text-gray-300">
              <FaInstagram />
            </div>
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=%2B5519989331908&data=ARCfCoqXL6rAuAeRtb11yu7mTAXVzpS7R-2_bWpHOkmckPOwx0hkFkFkgz-usYQHRMW1Gv6hwxJJW5jf6QICCMa1Ai7DswvlKNoDCxIo7m3JyQMo6vGDsRLT7nqWawnb6lpO0OwsK_ogxLzd4PWyeVbuFg&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR2_qJkpPjDi8B5_waq26qjrRJtYiMSLxylP7l0HrF8X-6u7Lt1xfI_3T5o"
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-2xl text-white cursor-pointer hover:text-gray-300">
              <FaWhatsapp />
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center p-5 ">
        <p className=" ">
          Copyright Sousas Mídia Ltda. Todos os direitos reservados. CNPJ:
          40.128.915/0001-00{" "}
        </p>
        Politica de privacidade | Politica de vendas | Avisos legais | Mapa do
        site
      </div>
    </div>
  );
}

export default Footer;
