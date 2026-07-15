import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://web.facebook.com/profile.php?id=61563044076990",
    label: "Facebook",
    icon: FaFacebook,
  },
  {
    href: "https://www.instagram.com/webmakersbr/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.linkedin.com/company/web-makersbr",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "https://wa.me/5519989331908",
    label: "WhatsApp",
    icon: FaWhatsapp,
  },
];

const footerCols = [
  {
    h: "Soluções",
    items: [
      { label: "Sites institucionais", href: "/#solucoes" },
      { label: "Integrações", href: "/#solucoes" },
      { label: "Automação", href: "/#solucoes" },
      { label: "E-commerce", href: "/#solucoes" },
    ],
  },
  {
    h: "Empresa",
    items: [
      { label: "Planos", href: "/#precos" },
      { label: "Contato", href: "/#contato" },
      { label: "Blog", href: "/blog" },
      { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    ],
  },
  {
    h: "Contato",
    items: [
      { label: "WhatsApp", href: "https://wa.me/5519989331908", external: true },
      { label: "Instagram", href: "https://www.instagram.com/webmakersbr/", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/web-makersbr", external: true },
      { label: "Facebook", href: "https://web.facebook.com/profile.php?id=61563044076990", external: true },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-brand-900 text-[#C3CEDF]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        {/* Marca */}
        <div>
          <Link legacyBehavior href="/">
            <a className="flex items-center gap-[10px] mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/wm-circle.png"
                alt="Web Makers"
                className="w-[38px] h-[38px] rounded-full block"
              />
              <span className="font-display font-extrabold text-[19px] text-white">
                Web Makers
              </span>
            </a>
          </Link>
          <p className="text-[15px] leading-relaxed text-[#8CA0BF] mb-5 max-w-[26em]">
            Soluções web eficientes e econômicas para micro e pequenas
            empresas.
          </p>
          <div className="flex gap-[10px]">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-[38px] h-[38px] rounded-[10px] bg-white/[.08] inline-flex items-center justify-center text-[#C3CEDF] hover:bg-brand-600 hover:text-white transition-colors duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Colunas de links */}
        {footerCols.map((col) => (
          <div key={col.h}>
            <div className="font-display font-bold text-sm text-white mb-4">
              {col.h}
            </div>
            <div className="grid gap-3">
              {col.items.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[15px] text-[#8CA0BF] hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[15px] text-[#8CA0BF] hover:text-white"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-[22px] flex justify-between gap-4 flex-wrap text-sm text-[#7488A8]">
          <span>
            © {new Date().getFullYear()} Web Makers. Todos os direitos
            reservados.
          </span>
          <Link
            href="/politica-de-privacidade"
            className="text-[#7488A8] hover:text-white"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
