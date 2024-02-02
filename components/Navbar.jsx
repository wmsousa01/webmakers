import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
// import { useRouter } from 'next/router';
import NavLogo from "../public/assets/logo-principal.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("white");
  const [textColor, setTextColor] = useState("black");

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff");
        setTextColor("#000000");
      } else {
        setColor("white");
        setTextColor("#000000");
      }
    };
    window.addEventListener("", changeColor);
  }, []);

  return (
    <section
      style={{ backgroundColor: `${color}` }}
      className={"fixed h-[95px] top-0  w-full z-10 p-5 ease-in duration-300"}
    >
      <div className="flex items-center justify-between  w-full h-full">
        <div className="">
          <Link legacyBehavior href="/">
            <a>
              <Image
                src={NavLogo}
                alt="/"
                width="170"
                height="70"
                className="cursor-pointer"
                style={{
                  maxWidth: "70%",
                  height: "auto",
                }}
              />
            </a>
          </Link>
        </div>

        <div className="flex justify-center">
          <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
            <li className="p-4 hover:text-purple-600">
              <Link href="/">Home</Link>
            </li>
            <li className="p-4 hover:text-purple-600 ">
              <Link href="/#basic">Serviços</Link>
            </li>
            <li className="p-4 hover:text-purple-600">
              <Link href="/#precos">Preços</Link>
            </li>
          </ul>

          {/*Mobile button */}
          <div onClick={handleNav} className="block sm:hidden z-10">
            {nav ? (
              <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
            ) : (
              <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
            )}
          </div>
          {/*Mobile menu */}
          <div
            className={
              nav
                ? "sm:hidden absolute top-0  right-0 botton-0 flex justify-items-start w-5/6 h-screen bg-[#8949f1]  text-start ease-in duration-300"
                : "sm:hidden absolute top-0 left-[-100%] right-0 botton-0 flex justify-center items-center w-5/6 h-screen bg-[#8949f1]  text-start ease-in duration-300"
            }
          >
            <ul className="mt-5">
              <li
                onClick={handleNav}
                className="p-4 text-xl text-white hover:text-gray-700"
              >
                <Link href="/">Home</Link>
              </li>
              <li
                onClick={handleNav}
                className="p-4 text-xl text-white hover:text-gray-700"
              >
                <Link href="/#basic">Serviços</Link>
              </li>

              <li
                onClick={handleNav}
                className="p-4 text-xl text-white hover:text-gray-700"
              >
                <Link href="/#precos">Preços</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
