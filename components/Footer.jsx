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
    <footer>
      <div className="bg-[#39B6EB] py-10 w-full flex md:flex-row justify-around items-center flex-col p-6">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <Link legacyBehavior href="/">
            <a>
              <Image
                src={NavLogo}
                alt="Web Makers Logo"
                width="170"
                height="70"
                className="cursor-pointer"
              />
            </a>
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex gap-8">
          <a
            href="https://web.facebook.com/profile.php?id=61563044076990"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <div className="text-2xl text-white cursor-pointer hover:text-gray-300">
              <FaFacebook />
            </div>
          </a>
          <a
            href="https://www.instagram.com/webmakersbr/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <div className="text-2xl text-white cursor-pointer hover:text-gray-300">
              <FaInstagram />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/company/web-makersbr"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <div className="text-2xl text-white cursor-pointer hover:text-gray-300">
              <FaLinkedin />
            </div>
          </a>
          <a href="https://wa.me/5519989331908" target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <div className="text-2xl text-white cursor-pointer hover:text-gray-300">
              <FaWhatsapp />
            </div>
          </a>
        </div>
      </div>

      <div className="bg-gray-200 py-4 text-center">
        <p className="text-gray-700">
          © {new Date().getFullYear()} Web Makers. Todos os direitos reservados.
        </p>
        <p>
          <Link legacyBehavior href="/politica-de-privacidade">
            <a className="text-[#39B6EB] hover:underline">Política de Privacidade</a>
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
