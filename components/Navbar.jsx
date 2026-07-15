import Link from "next/link";
import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { solutions } from "./data/siteData";

const navLinks = [
  { label: "Planos", href: "/#precos" },
  { label: "Contato", href: "/#contato" },
  { label: "Blog", href: "/blog" },
];

const Logo = ({ dark = false }) => (
  <span className="flex items-center gap-[10px]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/assets/wm-circle.png"
      alt="Web Makers"
      className="w-[38px] h-[38px] rounded-full block"
    />
    <span
      className={`font-display font-extrabold text-[19px] tracking-tight ${
        dark ? "text-white" : "text-brand-900"
      }`}
    >
      Web Makers
    </span>
  </span>
);

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => setNav(!nav);
  const openSolutions = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  const toggleSolutions = () => setMenuOpen((open) => !open);

  return (
    <header
      id="navbar"
      className="sticky top-0 z-50 bg-white/[.86] backdrop-blur-[12px] backdrop-saturate-[1.8] border-b border-line"
      onMouseLeave={closeMenu}
    >
      <nav className="max-w-[1200px] mx-auto px-4 md:px-8 h-[72px] flex items-center gap-2">
        <Link legacyBehavior href="/">
          <a className="mr-6">
            <Logo />
          </a>
        </Link>

        {/* Versão Desktop */}
        <div className="md:flex hidden items-center gap-2 w-full">
          <button
            onClick={toggleSolutions}
            onMouseEnter={openSolutions}
            className={`inline-flex items-center gap-[6px] px-3 py-2 rounded-lg font-semibold text-[15px] text-ink cursor-pointer transition-colors duration-200 ${
              menuOpen ? "bg-surface-raised" : "bg-transparent"
            }`}
          >
            Soluções
            <span
              className={`inline-block transition-transform duration-200 ${
                menuOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg font-semibold text-[15px] text-ink-subtle hover:bg-surface-raised hover:text-ink"
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-auto flex items-center gap-[10px]">
            <Link
              href="/#contato"
              className="px-[14px] py-2 rounded-lg font-semibold text-[15px] text-ink-subtle hover:bg-surface-raised hover:text-ink whitespace-nowrap"
            >
              Entrar em contato
            </Link>
            <Link
              href="/#precos"
              className="px-[18px] py-[10px] rounded-lg font-bold text-[15px] text-white bg-brand-600 hover:bg-brand-700 whitespace-nowrap transition-colors duration-200"
            >
              Ver planos
            </Link>
          </div>
        </div>

        {/* Botão Mobile */}
        <div className="md:hidden block z-10 ml-auto">
          <Hamburger
            color={nav ? "#FFFFFF" : "#0B3448"}
            toggled={nav}
            toggle={setNav}
          />
        </div>

        {/* Menu Mobile */}
        <div
          className={
            nav
              ? "fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-brand-900 text-center ease-in duration-300"
              : "fixed top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-brand-900 text-center ease-in duration-300"
          }
        >
          <div className="w-full px-8">
            <ul className="flex flex-col gap-2">
              <li onClick={handleNav}>
                <Link
                  href="/#solucoes"
                  className="block py-3 text-2xl font-display font-bold text-white hover:text-brand-300"
                >
                  Soluções
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href} onClick={handleNav}>
                  <Link
                    href={link.href}
                    className="block py-3 text-2xl font-display font-bold text-white hover:text-brand-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div onClick={handleNav} className="mt-8">
              <Link
                href="/#precos"
                className="btn bg-white text-brand-700 hover:bg-brand-50 w-full"
              >
                Ver planos
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega menu de Soluções (desktop) */}
      {menuOpen && (
        <div
          onMouseEnter={openSolutions}
          className="hidden md:block absolute left-0 right-0 top-[72px] bg-white border-b border-line shadow-overlay"
        >
          <div className="max-w-[1200px] mx-auto p-8 grid grid-cols-[1.2fr_2.4fr] gap-10">
            <div>
              <div className="text-xs font-bold tracking-[.12em] uppercase text-ink-faint mb-3">
                Soluções Web Makers
              </div>
              <div className="font-display font-bold text-[22px] leading-tight text-brand-900 mb-[10px]">
                Tudo o que sua empresa precisa para crescer online.
              </div>
              <p className="text-sm text-ink-soft leading-relaxed mb-4">
                Do primeiro site à automação completa dos seus processos — em
                um só parceiro.
              </p>
              <Link
                href="/#solucoes"
                onClick={closeMenu}
                className="font-bold text-sm text-brand-600 hover:text-brand-700"
              >
                Ver todas as soluções →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-[6px]">
              {solutions.map(({ icon: Icon, ...s }) => (
                <Link
                  key={s.title}
                  href="/#solucoes"
                  onClick={closeMenu}
                  className="flex gap-[14px] p-[14px] rounded-xl hover:bg-surface-tint"
                >
                  <span
                    className="flex-none w-10 h-10 rounded-[10px] inline-flex items-center justify-center"
                    style={{ background: s.tint }}
                  >
                    <Icon size={20} style={{ color: s.color }} />
                  </span>
                  <span>
                    <span className="block font-display font-bold text-[15px] text-ink">
                      {s.title}
                    </span>
                    <span className="block text-[13px] text-ink-soft leading-normal mt-[2px]">
                      {s.short}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
