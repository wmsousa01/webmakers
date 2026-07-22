import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { heroStats } from "./data/siteData";
import WhatsAppLink from "./WhatsAppLink";
import { openChat } from "../lib/chatBus";

const Hero = () => {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-surface-tint from-0% to-white to-[78%]"
    >
      {/* Esfera decorativa */}
      <div
        className="absolute -top-[60px] -right-10 w-80 h-80 rounded-full blur-[4px] animate-wmdrift"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(56,189,248,.35), rgba(57,182,235,.08))",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-16 md:pt-[88px] pb-14 md:pb-[72px] grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-[6px] rounded-full bg-brand-50 text-brand-700 font-bold text-[13px] mb-[22px]">
            <span className="w-[7px] h-[7px] rounded-full bg-brand-600" />
            Agência de Mogi Guaçu · para pequenas e médias empresas
          </div>

          <h1 className="mb-5" style={{ textWrap: "balance" }}>
            Coloque seu negócio para trabalhar online
          </h1>

          <p className="text-lg md:text-xl text-ink-subtle mb-8 max-w-[30em]">
            Sites, integrações e automações que reduzem trabalho manual e
            trazem clientes — sem gastar além do necessário.
          </p>

          {/* CTA primário é a oferta de topo de funil (diagnóstico), não um
              "começar agora" vago. O WhatsApp fica ao lado como rota de menor
              atrito — é o canal nº 1 de venda das PMEs da região. */}
          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => openChat("hero")}
              className="btn-primary"
            >
              Quero meu diagnóstico grátis
            </button>
            <WhatsAppLink
              context="hero"
              className="btn inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE5B]"
            >
              <FaWhatsapp size={19} />
              Chamar no WhatsApp
            </WhatsAppLink>
          </div>

          <p className="text-sm text-ink-faint mt-3">
            Resposta no mesmo dia · sem compromisso · sem custo
          </p>

          <div className="flex gap-7 mt-10 flex-wrap">
            {heroStats.map((st) => (
              <div key={st.k}>
                <div className="font-display font-extrabold text-3xl text-brand-900 leading-none">
                  {st.k}
                </div>
                <div className="text-sm text-ink-soft mt-[6px]">{st.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Painel ilustrativo */}
        <div className="relative h-[360px] md:h-[440px] hidden sm:block">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-panel" />
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 12px, transparent 12px 24px)",
            }}
          />

          {/* Card de navegador flutuante */}
          <div className="absolute top-[34px] left-[34px] right-[90px] bg-white rounded-[14px] p-[18px] shadow-float animate-wmfloat">
            <div className="flex items-center gap-2 mb-[14px]">
              <span className="w-[10px] h-[10px] rounded-full bg-[#FF5630]" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#FFAB00]" />
              <span className="w-[10px] h-[10px] rounded-full bg-[#36B37E]" />
            </div>
            <div className="h-3 w-[62%] rounded-md bg-brand-100 mb-[10px]" />
            <div className="h-3 w-[90%] rounded-md bg-[#EEF1F6] mb-[10px]" />
            <div className="h-3 w-[74%] rounded-md bg-[#EEF1F6] mb-[18px]" />
            <div className="h-[34px] w-[130px] rounded-lg bg-brand-600" />
          </div>

          {/* Card de automação flutuante */}
          <div
            className="absolute bottom-[34px] right-[30px] w-[210px] bg-white rounded-[14px] p-4 shadow-float animate-wmfloat"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="text-xs text-ink-faint font-semibold">
              Automação ativa
            </div>
            <div className="font-display font-extrabold text-[26px] text-brand-900 mt-1 mb-[10px]">
              +18h / semana
            </div>
            <div className="flex gap-1 items-end h-10">
              <span className="flex-1 h-[40%] bg-brand-200 rounded-[3px]" />
              <span className="flex-1 h-[62%] bg-brand-300 rounded-[3px]" />
              <span className="flex-1 h-[48%] bg-brand-200 rounded-[3px]" />
              <span className="flex-1 h-[85%] bg-brand-600 rounded-[3px]" />
              <span className="flex-1 h-[70%] bg-brand-400 rounded-[3px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
