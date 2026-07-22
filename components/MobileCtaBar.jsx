import React from "react";
import { FaWhatsapp, FaComments } from "react-icons/fa";
import WhatsAppLink from "./WhatsAppLink";
import { openChat } from "../lib/chatBus";

/**
 * Barra fixa de CTA no mobile.
 *
 * A maior parte do tráfego de PME local é celular, e lá o único caminho de
 * conversão era rolar até o formulário ou acertar o botão flutuante do chat.
 * A barra deixa as duas rotas sempre a um toque, sem depender de scroll.
 * Substitui o botão flutuante nessa faixa (ver ChatGptChat.jsx).
 */
const MobileCtaBar = () => (
  <>
    {/* Espaçador: evita que a barra cubra o fim do conteúdo da página. */}
    <div className="h-[72px] sm:hidden" aria-hidden="true" />

    <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white/95 px-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md shadow-[0_-4px_16px_rgba(11,52,72,.08)] sm:hidden">
      <button
        type="button"
        onClick={() => openChat("barra_mobile")}
        className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-600 px-3 py-3 font-display text-[15px] font-bold text-white"
      >
        <FaComments size={17} />
        Diagnóstico grátis
      </button>
      <WhatsAppLink
        context="barra_mobile"
        className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#25D366] px-3 py-3 font-display text-[15px] font-bold text-white"
      >
        <FaWhatsapp size={18} />
        WhatsApp
      </WhatsAppLink>
    </div>
  </>
);

export default MobileCtaBar;
