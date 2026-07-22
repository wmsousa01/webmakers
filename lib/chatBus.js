// Barramento mínimo para abrir o chat de triagem de qualquer lugar do site.
//
// O chat vive em `_app.js` (fora da árvore das páginas), então CTAs no hero, na
// navbar ou na barra fixa do mobile não têm como chamar o `setOpen` dele por
// prop. Um CustomEvent resolve isso sem introduzir Context nem state global.

export const OPEN_CHAT_EVENT = "wm:open-chat";

/** Abre o chat de triagem. `source` fica disponível para analytics. */
export const openChat = (source = "desconhecido") => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { source } }));
};
