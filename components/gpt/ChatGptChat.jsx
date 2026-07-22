import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { FaComments, FaWhatsapp, FaArrowLeft, FaPaperPlane } from "react-icons/fa";

const JIRA_ENDPOINT = "/api/send-to-jira";
const WHATSAPP_NUMBER = "5519989331908";

// Fluxo de triagem: contato (nome/e-mail/WhatsApp) + 4 dimensões de qualificação
// em botões (tipo/urgência/orçamento/segmento) + detalhe livre. Cada passo vira
// campo estruturado enviado ao backend, que traduz em summary + labels + prioridade
// na issue do projeto LEAD no Jira.
const STEPS = [
  {
    key: "name",
    type: "text",
    inputMode: "text",
    placeholder: "Digite seu nome...",
    prompt: () => "Olá! 👋 Sou a assistente da Web Makers. Qual é o seu nome?",
  },
  {
    key: "email",
    type: "email",
    inputMode: "email",
    placeholder: "voce@empresa.com.br",
    prompt: (d) => `Prazer, ${d.name}! Qual é o seu melhor e-mail?`,
  },
  {
    key: "phone",
    type: "phone",
    inputMode: "tel",
    placeholder: "(19) 99999-9999",
    prompt: () => "E qual o seu WhatsApp? É por lá que a gente te responde.",
  },
  {
    key: "service",
    type: "choice",
    prompt: () => "O que você procura hoje?",
    options: [
      "Site institucional",
      "Loja virtual",
      "Integração",
      "Automação",
      "Ainda não sei",
    ],
  },
  {
    key: "urgency",
    type: "choice",
    prompt: () => "Pra quando você precisa?",
    options: ["Pra ontem 🔥", "Ainda este mês", "Só pesquisando"],
  },
  {
    key: "budget",
    type: "choice",
    prompt: () => "Qual investimento você tem em mente?",
    options: [
      "Até R$ 1.000",
      "R$ 1.000 a 3.000",
      "Acima de R$ 3.000",
      "Prefiro não dizer",
    ],
  },
  {
    key: "segment",
    type: "choice",
    prompt: () => "Seu negócio é mais de...",
    options: ["Comércio / Loja", "Serviços", "Indústria", "Outro"],
  },
  {
    key: "detail",
    type: "text",
    inputMode: "text",
    placeholder: "Escreva aqui...",
    prompt: (d) =>
      `Fechou, ${d.name}! Conta rapidinho o que você precisa — quanto mais detalhe, melhor o diagnóstico.`,
  },
];

const EMPTY_DATA = {
  name: "",
  email: "",
  phone: "",
  service: "",
  urgency: "",
  budget: "",
  segment: "",
  detail: "",
};

// Delay proporcional ao tamanho da frase: a assistente "lê" antes de responder.
const typingDelay = (text) => Math.min(1500, 420 + text.length * 16);

const validateEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email.trim().toLowerCase()
  );

// Normaliza para DDD + número: descarta o DDI 55 se o usuário digitar completo.
const localDigits = (raw) => {
  let d = raw.replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  return d.slice(0, 11);
};

// Máscara visual do telefone; o valor enviado ao backend continua sendo só dígitos.
const formatPhone = (raw) => {
  const d = localDigits(raw);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const TypingDots = () => (
  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 shadow-sm">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="h-2 w-2 animate-wmdot rounded-full bg-brand-600"
        style={{ animationDelay: `${i * 160}ms` }}
      />
    ))}
  </div>
);

const ChatGPTChat = () => {
  const [messages, setMessages] = useState([
    { id: 0, text: STEPS[0].prompt({}), sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | done | failed
  const [userData, setUserData] = useState(EMPTY_DATA);
  // Pilha de snapshots para o botão "voltar" — permite corrigir uma resposta
  // sem reiniciar a conversa.
  const [history, setHistory] = useState([]);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const msgId = useRef(1);
  const timers = useRef([]);

  const nextId = () => msgId.current++;

  // Limpa timers pendentes ao desmontar (evita setState em componente morto).
  useEffect(
    () => () => timers.current.forEach(clearTimeout),
    []
  );

  const current = step < STEPS.length ? STEPS[step] : null;
  const showChoices = !!current && current.type === "choice" && !isTyping;
  const showInput = !!current && current.type !== "choice";

  // Auto-scroll a cada mensagem nova / mudança de estado do rodapé.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, showChoices, status]);

  // Foca o campo assim que ele aparece (inclusive após o "digitando").
  useEffect(() => {
    if (showChat && showInput && !isTyping) inputRef.current?.focus();
  }, [showChat, showInput, isTyping, step]);

  const addMessage = useCallback((text, sender) => {
    setMessages((prev) => [...prev, { id: nextId(), text, sender }]);
  }, []);

  const addBotMessageWithDelay = useCallback(
    (message) => {
      setIsTyping(true);
      const t = setTimeout(() => {
        addMessage(message, "bot");
        setIsTyping(false);
      }, typingDelay(message));
      timers.current.push(t);
    },
    [addMessage]
  );

  // Dispara a conversão do Google Ads UMA vez, no sucesso — sem recarregar a página.
  const fireConversion = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion_event_contact", {
        event_category: "Form Submission",
        event_label: "Chat Submission",
        value: 1,
      });
    }
  };

  const whatsappFallbackHref = () => {
    const d = userData;
    const msg =
      `Olá! Vim pelo site da Web Makers. Sou ${d.name || "um visitante"}.` +
      (d.service ? ` Procuro: ${d.service}.` : "") +
      (d.detail ? ` ${d.detail}` : "");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const submitLead = async (finalData) => {
    setStatus("sending");
    setIsTyping(true);
    try {
      await axios.post(JIRA_ENDPOINT, finalData, { timeout: 12000 });
      setIsTyping(false);
      addMessage(
        `Obrigado, ${finalData.name}! 🎉 Recebemos seu pedido — nossa equipe entra em contato pelo WhatsApp em breve.`,
        "bot"
      );
      setStatus("done");
      fireConversion();
    } catch (error) {
      console.error("Erro ao enviar dados para o Jira:", error);
      setIsTyping(false);
      addMessage(
        "Ops, tive um probleminha pra registrar seu contato aqui. Me chama direto no WhatsApp que te respondo na hora 👇",
        "bot"
      );
      setStatus("failed");
    }
  };

  // Avança um passo: guarda o valor, ecoa a resposta do usuário e faz a próxima
  // pergunta (ou submete, se foi o último passo).
  const advance = (key, value, displayValue) => {
    const updated = { ...userData, [key]: value };
    setHistory((prev) => [...prev, { step, userData, messages }]);
    setUserData(updated);
    addMessage(displayValue ?? value, "user");

    const next = step + 1;
    setStep(next);
    if (next < STEPS.length) {
      addBotMessageWithDelay(STEPS[next].prompt(updated));
    } else {
      submitLead(updated);
    }
  };

  const goBack = () => {
    const prev = history[history.length - 1];
    if (!prev) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setIsTyping(false);
    setStatus("idle");
    setStep(prev.step);
    setUserData(prev.userData);
    setMessages(prev.messages);
    setHistory((h) => h.slice(0, -1));
    setInput("");
  };

  const handleTextSubmit = () => {
    const value = input.trim();
    if (!value || !current || isTyping) return;

    if (current.type === "email") {
      if (!validateEmail(value)) {
        addMessage(value, "user");
        addBotMessageWithDelay("Hmm, esse e-mail não parece válido. Pode conferir? 🙂");
        setInput("");
        return;
      }
      setInput("");
      advance(current.key, value.toLowerCase());
      return;
    }

    if (current.type === "phone") {
      const digits = localDigits(value);
      if (!/^\d{10,11}$/.test(digits)) {
        addMessage(value, "user");
        addBotMessageWithDelay(
          "Preciso do número com DDD, tipo (19) 99999-9999. Pode mandar de novo?"
        );
        setInput("");
        return;
      }
      setInput("");
      // Backend recebe no formato internacional; o usuário vê o formatado.
      advance(current.key, `55${digits}`, formatPhone(digits));
      return;
    }

    setInput("");
    advance(current.key, value);
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    setInput(current?.type === "phone" ? formatPhone(raw) : raw);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleTextSubmit();
    }
  };

  const restart = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    msgId.current = 1;
    setMessages([{ id: 0, text: STEPS[0].prompt({}), sender: "bot" }]);
    setUserData(EMPTY_DATA);
    setHistory([]);
    setStep(0);
    setInput("");
    setIsTyping(false);
    setStatus("idle");
  };

  const closeChat = useCallback(() => setShowChat(false), []);

  // Esc fecha o painel.
  useEffect(() => {
    if (!showChat) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeChat();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showChat, closeChat]);

  const progress = Math.round((Math.min(step, STEPS.length) / STEPS.length) * 100);
  const canGoBack = history.length > 0 && status !== "done" && status !== "sending";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!showChat && (
        <div className="relative">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/40" />
          <button
            onClick={() => setShowChat(true)}
            aria-label="Abrir chat com a assistente virtual"
            className="relative flex items-center gap-2 rounded-full bg-brand-600 px-5 py-4 text-white shadow-cta transition duration-300 hover:bg-brand-700 hover:shadow-overlay"
          >
            <FaComments size={22} />
            <span className="hidden text-sm font-semibold sm:inline">
              Diagnóstico grátis
            </span>
          </button>
        </div>
      )}

      {showChat && (
        <div className="fixed inset-0 flex flex-col bg-white shadow-overlay animate-wmslideup sm:inset-auto sm:bottom-4 sm:right-4 sm:h-[min(640px,85vh)] sm:w-[400px] sm:rounded-2xl sm:border sm:border-line">
          {/* Cabeçalho */}
          <header className="flex items-center gap-3 rounded-none bg-brand-800 px-4 py-3 text-white sm:rounded-t-2xl">
            {canGoBack ? (
              <button
                onClick={goBack}
                aria-label="Voltar uma pergunta"
                className="-ml-1 rounded-full p-2 transition hover:bg-white/10"
              >
                <FaArrowLeft size={14} />
              </button>
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold">
                WM
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-bold">
                Assistente Web Makers
              </p>
              <p className="flex items-center gap-1.5 text-xs text-brand-100">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Online · responde na hora
              </p>
            </div>
            <button
              onClick={closeChat}
              aria-label="Fechar chat"
              className="rounded-full p-2 text-lg leading-none transition hover:bg-white/10"
            >
              ✕
            </button>
          </header>

          {/* Progresso da triagem */}
          <div className="h-1 w-full bg-line">
            <div
              className="h-full bg-brand-600 transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Mensagens */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-surface-tint px-4 py-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex animate-wmpop ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "rounded-2xl rounded-br-md bg-brand-600 text-white"
                      : "rounded-2xl rounded-bl-md border border-line bg-white text-ink"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex animate-wmpop justify-start">
                <TypingDots />
              </div>
            )}

            {/* Fallback: falha ao registrar → CTA direto no WhatsApp */}
            {(status === "failed" || status === "done") && (
              <div className="flex flex-col items-start gap-2 pt-1">
                <a
                  href={whatsappFallbackHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex animate-wmpop items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-95"
                >
                  <FaWhatsapp size={18} />
                  {status === "failed" ? "Falar no WhatsApp" : "Adiantar no WhatsApp"}
                </a>
                {status === "done" && (
                  <button
                    onClick={restart}
                    className="text-xs font-medium text-ink-soft underline underline-offset-2 hover:text-brand-700"
                  >
                    Fazer outro pedido
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Rodapé: escolhas rápidas ou campo de texto — sempre visível */}
          {(showChoices || showInput) && (
            <div className="border-t border-line bg-white px-4 py-3">
              {showChoices && (
                <div className="flex flex-wrap gap-2">
                  {current.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => advance(current.key, option)}
                      className="rounded-full border border-brand-600 px-3.5 py-2 text-sm font-medium text-brand-700 transition duration-200 hover:bg-brand-600 hover:text-white active:scale-95"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {showInput && (
                <div className="flex items-center gap-2 rounded-full border border-line bg-surface-sunken px-2 py-1 focus-within:border-brand-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-600/20">
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode={current.inputMode}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none disabled:opacity-60"
                    placeholder={current.placeholder}
                  />
                  <button
                    onClick={handleTextSubmit}
                    disabled={!input.trim() || isTyping}
                    aria-label="Enviar"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition duration-200 hover:bg-brand-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaPaperPlane size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatGPTChat;
