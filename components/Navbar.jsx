import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import NavLogo from "../public/assets/logo-principal.png";
import { Sling as Hamburger } from "hamburger-react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("#39B6EB");
  
  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#39B6EB");
      } else {
        setColor("#39B6EB");
      }
    };

    window.addEventListener("scroll", changeColor);
    return () => window.removeEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      id="navbar"
      style={{ backgroundColor: `${color}`, height: "70px" }} // Definir a altura aqui
      className="fixed left-0 top-0 w-full z-50 ease-in duration-300 shadow-xl"
    >
      <div className="m-auto flex justify-between items-center p-4 text-white md:mx-20">
        <Link legacyBehavior href="/">
          <a>
            <Image
              src={NavLogo}
              alt="/"
              width="220"
              height="70"
              className="cursor-pointer"
              style={{
                maxWidth: "70%",
                height: "auto",
              }}
            />
          </a>
        </Link>

        {/* Versão Desktop */}
        <div className="md:block hidden">
          <ul className="flex gap-2">
            <li className="p-2 text-2xl hover:text-gray-300">
              <Link href="/#solutions">Soluções</Link>
            </li>
            <li className="p-2 text-2xl hover:text-gray-300">
              <Link href="/#precos">Planos</Link>
            </li>
            <li className="p-2 text-2xl hover:text-gray-300">
              <Link href="/contact">Contato</Link>
            </li>
            {/* Novo link para o Blog */}
            <li className="p-2 text-2xl hover:text-gray-300">
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        {/* Botão Mobile */}
        <div onClick={handleNav} className="md:hidden block z-10">
          <Hamburger color="white" toggled={nav} toggle={setNav} />
        </div>

        {/* Menu Mobile */}
        <div
          className={
            nav
              ? "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-[#39B6EB] text-center ease-in duration-300"
              : "absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-[#39B6EB] text-center ease-in duration-300"
          }
        >
          <div className="flex flex-col sm:flex-row justify-around justify-items-center w-full p-4 sm:p-20 text-white text-center">
            <div className="prod" style={{ margin: "0 20px" }}>
              <ul>
                <h2
                  className="p-2 text-1xl"
                  style={{
                    borderBottom: "2px solid white",
                    paddingBottom: "10px",
                  }}
                >
                  Web Makers
                </h2>
                <li onClick={handleNav} className="p-2 text-2xl hover:text-[#595252]">
                  <Link href="/#solutions">Soluções</Link>
                </li>
                <li onClick={handleNav} className="p-2 text-2xl hover:text-[#595252]">
                  <Link href="/#precos">Planos</Link>
                </li>
                <li onClick={handleNav} className="p-2 text-2xl hover:text-[#595252]">
                  <Link href="/contact">Contato</Link>
                </li>
                {/* Novo link para o Blog no menu mobile */}
                <li onClick={handleNav} className="p-2 text-2xl mb-5 hover:text-[#595252]">
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
