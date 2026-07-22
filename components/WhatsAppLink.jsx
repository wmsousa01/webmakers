import React from "react";
import { waHref } from "./data/siteData";
import { trackWhatsAppClick } from "../lib/track";

/**
 * CTA de WhatsApp. Centraliza três coisas que precisam andar sempre juntas:
 * a mensagem pré-preenchida, o `target="_blank"` (não perder a sessão do site)
 * e o disparo da conversão — sem isso, mover CTAs para o WhatsApp derrubaria a
 * contagem de conversões e o Google Ads leria como piora de performance.
 */
const WhatsAppLink = ({ message, context, className = "", children, ...rest }) => (
  <a
    href={waHref(message)}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackWhatsAppClick(context)}
    className={className}
    {...rest}
  >
    {children}
  </a>
);

export default WhatsAppLink;
