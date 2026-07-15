import React, { useState } from "react";
import { FaBolt, FaHandshake, FaHeadset } from "react-icons/fa6";
import { contactPoints } from "./data/siteData";

const pointIcons = [FaBolt, FaHandshake, FaHeadset];

const ContactSection = ({ topMargin = true }) => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const response = await fetch("https://getform.io/f/bvrezqnb", {
        method: "POST",
        body: new FormData(e.target),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Falha no envio");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contato"
      className={`bg-surface-tint ${topMargin ? "mt-[72px]" : ""}`}
    >
      <div className="max-w-[1080px] mx-auto px-4 md:px-8 py-16 md:py-[88px] grid grid-cols-1 lg:grid-cols-[.9fr_1.1fr] gap-14 items-start">
        <div>
          <h2 className="section-title mb-4" style={{ textWrap: "balance" }}>
            Vamos tirar sua ideia do papel
          </h2>
          <p className="text-lg text-ink-subtle mb-7">
            Conte o que seu negócio precisa e nossa equipe retorna com uma
            proposta em até 1 dia útil.
          </p>
          <div className="grid gap-[18px]">
            {contactPoints.map((c, i) => {
              const Icon = pointIcons[i] || FaBolt;
              return (
                <div key={c.t} className="flex gap-[14px] items-center">
                  <span className="flex-none w-11 h-11 rounded-xl bg-brand-50 inline-flex items-center justify-center">
                    <Icon size={18} className="text-brand-600" />
                  </span>
                  <div>
                    <div className="font-bold text-ink text-[15px]">{c.t}</div>
                    <div className="text-sm text-ink-soft">{c.d}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-line rounded-[20px] p-8 shadow-form">
          {submitted ? (
            <div className="text-center py-10 px-3">
              <div className="w-16 h-16 rounded-full bg-[#36B37E] mx-auto mb-5 flex items-center justify-center text-white text-3xl font-extrabold">
                ✓
              </div>
              <div className="font-display font-extrabold text-2xl text-brand-900 mb-2">
                Recebemos seu pedido!
              </div>
              <p className="text-base text-ink-soft">
                Nossa equipe entra em contato em até 1 dia útil.
              </p>
            </div>
          ) : (
            <form onSubmit={submitForm} className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="field-label">Nome</span>
                  <input
                    required
                    name="nome"
                    placeholder="Seu nome"
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="field-label">Empresa</span>
                  <input
                    name="empresa"
                    placeholder="Nome da empresa"
                    className="field"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="field-label">E-mail</span>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="voce@empresa.com"
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="field-label">WhatsApp</span>
                  <input
                    name="whatsapp"
                    placeholder="(19) 90000-0000"
                    className="field"
                  />
                </label>
              </div>
              <label className="block">
                <span className="field-label">Plano de interesse</span>
                <select name="plano" className="field">
                  <option>Ainda não sei — me ajudem a escolher</option>
                  <option>Web Start</option>
                  <option>Web Boost</option>
                  <option>Web Mastery</option>
                  <option>Solução sob medida</option>
                </select>
              </label>
              <label className="block">
                <span className="field-label">Como podemos ajudar?</span>
                <textarea
                  rows="4"
                  name="mensagem"
                  placeholder="Conte um pouco sobre seu projeto…"
                  className="field resize-y"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="w-full p-[15px] border-none rounded-[10px] bg-brand-600 text-white font-display font-bold text-[17px] cursor-pointer hover:bg-brand-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-wait"
              >
                {sending ? "Enviando…" : "Solicitar proposta"}
              </button>
              {error && (
                <p className="text-center text-sm text-[#DE350B]">
                  Não foi possível enviar agora. Tente novamente ou chame no
                  WhatsApp.
                </p>
              )}
              <p className="text-center text-[13px] text-ink-faint">
                Sem compromisso. Resposta em até 1 dia útil.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
