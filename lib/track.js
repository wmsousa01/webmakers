// Camada única de rastreamento de conversão do site (client-side).
//
// Por que existe: antes, só o chat de triagem disparava conversão no Google Ads
// (ChatGptChat.jsx). O formulário de proposta e os cliques de WhatsApp não
// disparavam nada — ou seja, o Smart Bidding aprendia com um subconjunto dos
// leads reais. Todo ponto de conversão do site passa por aqui.
//
// Valor por origem: a mesma ação de conversão é usada para todas as origens
// (criar uma nova ação exige o painel do Google Ads), mas cada origem envia um
// `value` diferente. Isso permite lance por valor — o Ads passa a preferir
// cliques que geram chat completo em vez de clique solto no WhatsApp.
// Quando ações separadas forem criadas no painel, basta preencher os env
// NEXT_PUBLIC_GADS_CONVERSION_* e o código já usa cada uma.

const FALLBACK = "AW-18280455023/OBeQCJaP9tQcEO-25oxE";

const CONVERSIONS = {
  chat: process.env.NEXT_PUBLIC_GADS_CONVERSION_CHAT || FALLBACK,
  form: process.env.NEXT_PUBLIC_GADS_CONVERSION_FORM || FALLBACK,
  whatsapp: process.env.NEXT_PUBLIC_GADS_CONVERSION_WHATSAPP || FALLBACK,
};

// Peso relativo de cada origem. Chat = lead qualificado (nome, e-mail, WhatsApp,
// serviço, urgência, orçamento e segmento). Formulário = contato com intenção
// declarada. WhatsApp = intenção alta mas dado zero até a pessoa escrever.
const VALUES = { chat: 5, form: 3, whatsapp: 2 };

// Uma origem só conta uma vez por carregamento de página: o usuário pode clicar
// duas vezes no botão de WhatsApp, e conversão duplicada polui o bidding.
const fired = new Set();

const gtag = (...args) => {
  if (typeof window === "undefined") return false;
  if (typeof window.gtag !== "function") return false;
  window.gtag(...args);
  return true;
};

/**
 * Registra uma conversão de lead.
 * @param {"chat"|"form"|"whatsapp"} source origem do lead
 * @param {object} [detail] contexto extra (plano, seção) — vai só para o GA
 * @param {boolean} [detail.allowRepeat] permite recontar a mesma origem
 */
export function trackLead(source, detail = {}) {
  const { allowRepeat = false, ...meta } = detail;
  const key = `${source}:${meta.context || ""}`;
  if (!allowRepeat && fired.has(key)) return;
  fired.add(key);

  // Conversão do Google Ads (é o que alimenta o Smart Bidding).
  gtag("event", "conversion", {
    send_to: CONVERSIONS[source] || FALLBACK,
    value: VALUES[source] ?? 1,
    currency: "BRL",
  });

  // Evento nomeado no GA4/GTM — permite segmentar por origem e seção nos
  // relatórios sem depender do painel do Ads.
  gtag("event", "generate_lead", {
    lead_source: source,
    value: VALUES[source] ?? 1,
    currency: "BRL",
    ...meta,
  });
}

/** Clique em qualquer CTA de WhatsApp. Chamado no onClick, antes da navegação. */
export function trackWhatsAppClick(context) {
  trackLead("whatsapp", { context });
}
