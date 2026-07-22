import React, { useState } from "react";
import { FaBolt, FaHandshake, FaHeadset } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { contactPoints } from "./data/siteData";
import WhatsAppLink from "./WhatsAppLink";
import { trackLead } from "../lib/track";

const pointIcons = [FaBolt, FaHandshake, FaHeadset];

// Backup best-effort: mantém o histórico no getform (e o e-mail de aviso) sem
// que uma falha dele derrube o lead — a fonte da verdade passou a ser o Jira.
const GETFORM_ENDPOINT = "https://getform.io/f/bvrezqnb";

const onlyDigits = (s) => String(s || "").replace(/\D/g, "");

const ContactSection = ({ topMargin = true }) => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);

    const phone = onlyDigits(fd.get("whatsapp"));
    if (phone.length < 10 || phone.length > 11) {
      setError("Confira o WhatsApp com DDD — ex: (19) 99999-9999.");
      return;
    }

    setSending(true);
    setError("");

    const lead = {
      name: (fd.get("nome") || "").trim(),
      phone: `55${phone}`,
      email: "",
      service: fd.get("servico") || "",
      detail: (fd.get("mensagem") || "").trim(),
      source: "formulario",
    };

    try {
      // Jira é o caminho crítico: é ele que alimenta o /painel.
      const response = await fetch("/api/send-to-jira", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!response.ok) throw new Error("Falha no envio");

      // Espelha no getform sem bloquear nem quebrar o fluxo se falhar.
      fetch(GETFORM_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      }).catch(() => {});

      setSubmitted(true);
      // Antes daqui o formulário não reportava conversão nenhuma ao Google Ads.
      trackLead("form", { context: "formulario_proposta", service: lead.service });
    } catch {
      setError(
        "Não foi possível enviar agora. Tente de novo ou chame no WhatsApp."
      );
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
            /* Três campos. Empresa e e-mail saíram: cada campo extra custa
               preenchimento, e para PME o WhatsApp já é o canal de retorno. */
            <form onSubmit={submitForm} className="grid gap-4">
              <label className="block">
                <span className="field-label">Nome</span>
                <input
                  required
                  name="nome"
                  autoComplete="name"
                  placeholder="Seu nome"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="field-label">WhatsApp</span>
                <input
                  required
                  name="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(19) 90000-0000"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="field-label">O que você precisa?</span>
                <select name="servico" className="field">
                  <option>Ainda não sei — me ajudem a escolher</option>
                  <option>Site institucional</option>
                  <option>Loja virtual</option>
                  <option>Automação de WhatsApp</option>
                  <option>Integração de sistemas</option>
                  <option>Solução sob medida</option>
                </select>
              </label>
              <label className="block">
                <span className="field-label">
                  Quer adiantar algum detalhe?{" "}
                  <span className="font-normal text-ink-faint">(opcional)</span>
                </span>
                <textarea
                  rows="3"
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
                {sending ? "Enviando…" : "Solicitar proposta grátis"}
              </button>
              {error && (
                <p className="text-center text-sm text-[#DE350B]">{error}</p>
              )}
              <p className="text-center text-[13px] text-ink-faint">
                Sem compromisso. Resposta em até 1 dia útil.
              </p>

              <div className="relative text-center">
                <span className="relative z-10 bg-white px-3 text-[13px] text-ink-faint">
                  ou, se preferir na hora
                </span>
                <span className="absolute left-0 right-0 top-1/2 h-px bg-line" />
              </div>
              <WhatsAppLink
                context="formulario_proposta"
                message="Olá! Vim do site da Web Makers e quero falar com um especialista."
                className="w-full inline-flex items-center justify-center gap-2 p-[13px] rounded-[10px] border border-[#25D366] text-[#128C4A] font-display font-bold text-[16px] hover:bg-[#25D366]/10 transition-colors duration-200"
              >
                <FaWhatsapp size={19} />
                Falar agora no WhatsApp
              </WhatsAppLink>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
