import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { FaComments, FaWhatsapp } from "react-icons/fa";

const JIRA_ENDPOINT = "/api/send-to-jira";
const WHATSAPP_NUMBER = "5519989331908";

// Fluxo de triagem: contato (nome/e-mail/WhatsApp) + 4 dimensões de qualificação
// em botões (tipo/urgência/orçamento/segmento) + detalhe livre. Cada passo vira
// campo estruturado enviado ao backend, que traduz em summary + labels + prioridade
// na issue do projeto VEN no Jira.
const STEPS = [
  {
    key: "name",
    type: "text",
    placeholder: "Digite seu nome...",
    prompt: () => "Olá! 👋 Sou a assistente da Web Makers. Qual é o seu nome?",
  },
  {
    key: "email",
    type: "email",
    placeholder: "Digite seu e-mail...",
    prompt: (d) => `Prazer, ${d.name}! Qual é o seu melhor e-mail?`,
  },
  {
    key: "phone",
    type: "phone",
    placeholder: "Ex: 5519999999999",
    prompt: () => "E qual o seu WhatsApp? (só números, com DDD)",
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
    placeholder: "Escreva aqui...",
    prompt: (d) => `Fechou, ${d.name}! Conta rapidinho o que você precisa:`,
  },
];

const DONE = STEPS.length;

const ChatGPTChat = () => {
  const [messages, setMessages] = useState([
    { text: STEPS[0].prompt({}), sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [failed, setFailed] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    urgency: "",
    budget: "",
    segment: "",
    detail: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim().toLowerCase());
  };

  const addBotMessage = (message) =>
    setMessages((prev) => [...prev, { text: message, sender: "bot" }]);

  const addUserMessage = (message) =>
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);

  const addBotMessageWithDelay = (message, delay = 1200) => {
    setIsTyping(true);
    setTimeout(() => {
      addBotMessage(message);
      setIsTyping(false);
    }, delay);
  };

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
      `Olá! Vim pelo site da Web Makers. Sou ${d.name}.` +
      (d.service ? ` Procuro: ${d.service}.` : "") +
      (d.detail ? ` ${d.detail}` : "");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const submitLead = async (finalData) => {
    setIsTyping(true);
    try {
      await axios.post(JIRA_ENDPOINT, finalData, { timeout: 12000 });
      setIsTyping(false);
      addBotMessage(
        `Obrigado, ${finalData.name}! 🎉 Recebemos seu pedido e nossa equipe entra em contato em breve.`
      );
      fireConversion();
    } catch (error) {
      console.error("Erro ao enviar dados para o Jira:", error);
      setIsTyping(false);
      addBotMessage(
        "Ops, tive um probleminha pra registrar seu contato aqui. Me chama direto no WhatsApp que te respondo na hora 👇"
      );
      setFailed(true);
    }
  };

  // Avança um passo: guarda o valor, ecoa a resposta do usuário e faz a próxima pergunta
  // (ou submete, se foi o último passo).
  const advance = (key, value, displayValue) => {
    const updated = { ...userData, [key]: value };
    setUserData(updated);
    addUserMessage(displayValue ?? value);

    const next = step + 1;
    setStep(next);
    if (next < STEPS.length) {
      addBotMessageWithDelay(STEPS[next].prompt(updated));
    } else {
      submitLead(updated);
    }
  };

  const handleTextSubmit = () => {
    const value = input.trim();
    if (!value || step >= STEPS.length) return;
    const current = STEPS[step];

    if (current.type === "email") {
      if (!validateEmail(value)) {
        addBotMessageWithDelay("Hmm, esse e-mail não parece válido. Pode conferir? 🙂");
        return;
      }
      setInput("");
      advance(current.key, value.trim().toLowerCase());
      return;
    }

    if (current.type === "phone") {
      const digits = value.replace(/\D/g, "");
      if (!/^\d{10,13}$/.test(digits)) {
        addBotMessageWithDelay(
          "Manda seu WhatsApp com DDD, só números. Ex: 5519999999999"
        );
        return;
      }
      setInput("");
      advance(current.key, digits);
      return;
    }

    setInput("");
    advance(current.key, value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleTextSubmit();
  };

  const toggleChat = () => setShowChat(!showChat);

  const current = step < STEPS.length ? STEPS[step] : null;
  const showChoices = !!current && current.type === "choice" && !isTyping;
  const showInput = !!current && current.type !== "choice";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!showChat && (
        <div className="relative">
          <button
            onClick={toggleChat}
            className="bg-brand-600 text-white p-4 rounded-full shadow-overlay hover:bg-brand-700 transition duration-300 animate-pulse"
          >
            <FaComments size={24} />
          </button>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce text-center">
            20% OFF
          </div>
        </div>
      )}

      {showChat && (
        <div className="fixed bottom-0 right-0 w-full max-w-md h-[80vh] bg-white shadow-lg rounded-t-lg">
          <div className="flex justify-between items-center p-4 bg-brand-700 text-white rounded-t-lg">
            <h2 className="text-lg font-bold">Fale com nossa assistente virtual</h2>
            <button onClick={toggleChat} className="text-white">
              X
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-full">
            <div className="w-full bg-white shadow-lg rounded-lg p-4 h-[60vh] overflow-y-auto mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`my-2 p-2 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-[#DCF8C6] text-black self-end"
                      : "bg-white text-black self-start border border-gray-200"
                  } shadow-md`}
                >
                  <p className="text-sm">
                    {msg.sender === "user" ? "Você" : "Assistente Virtual"}
                  </p>
                  <p>{msg.text}</p>
                </div>
              ))}
              {isTyping && (
                <div className="my-2 p-2 bg-white text-gray-700 rounded-lg self-start border border-gray-200">
                  <strong>Assistente Virtual está digitando...</strong>
                </div>
              )}

              {/* Botões de resposta rápida (passos de triagem) */}
              {showChoices && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {current.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => advance(current.key, option)}
                      className="border border-brand-600 text-brand-700 hover:bg-brand-600 hover:text-white text-sm font-medium px-3 py-2 rounded-full transition duration-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Fallback: falha ao registrar → CTA direto no WhatsApp */}
              {failed && (
                <a
                  href={whatsappFallbackHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-2 rounded-full shadow-md hover:brightness-95 transition"
                >
                  <FaWhatsapp size={18} /> Falar no WhatsApp
                </a>
              )}
            </div>

            {/* Campo de texto (passos de contato + detalhe) */}
            {showInput && (
              <div className="w-full flex items-center bg-white border border-gray-300 rounded-full px-2 py-1 shadow-md">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow p-2 text-sm rounded-full focus:outline-none"
                  placeholder={current.placeholder}
                />
                <button
                  onClick={handleTextSubmit}
                  className="ml-2 bg-brand-600 text-white p-2 rounded-full hover:bg-brand-700 transition duration-300"
                >
                  Enviar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPTChat;
