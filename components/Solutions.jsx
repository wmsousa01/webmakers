import React from "react";
import Link from "next/link";
import { solutions } from "./data/siteData";

const Solutions = () => {
  return (
    <section id="solucoes" className="max-w-[1200px] mx-auto px-4 md:px-8 pt-20 md:pt-24 pb-10">
      <div className="max-w-[720px] mx-auto text-center">
        <div className="eyebrow mb-[14px]">Soluções</div>
        <h2 className="section-title mb-4" style={{ textWrap: "balance" }}>
          Soluções para impulsionar seu negócio
        </h2>
        <p className="text-lg md:text-[19px] text-ink-subtle">
          Nossa equipe cuida da parte técnica para você focar no que faz
          melhor: atender seus clientes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
        {solutions.map(({ icon: Icon, ...s }) => (
          <div
            key={s.title}
            className="border border-line rounded-[18px] p-8 bg-white transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-[18px]">
              <span
                className="flex-none w-14 h-14 rounded-[14px] inline-flex items-center justify-center"
                style={{ background: s.tint }}
              >
                <Icon size={26} style={{ color: s.color }} />
              </span>
              <h3 className="font-display font-bold text-[22px] text-brand-900 m-0">
                {s.title}
              </h3>
            </div>
            <p className="text-base text-ink-subtle mb-[18px]">{s.long}</p>
            <Link
              href="/#contato"
              className="font-bold text-[15px] text-brand-600 hover:text-brand-700"
            >
              Saiba mais →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Solutions;
