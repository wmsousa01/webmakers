import React from "react";
import Link from "next/link";
import { plans, planRows } from "./data/siteData";

const AllPlans = () => {
  return (
    <section id="precos" className="max-w-[1200px] mx-auto px-4 md:px-8 pt-20 md:pt-24 pb-10">
      <div className="max-w-[720px] mx-auto text-center">
        <div className="eyebrow mb-[14px]">Planos</div>
        <h2 className="section-title mb-4" style={{ textWrap: "balance" }}>
          Escolha o plano que se adapta ao seu negócio
        </h2>
        <p className="text-lg md:text-[19px] text-ink-subtle">
          Compare os planos lado a lado. Sem letras miúdas — só o que faz
          sentido para o seu momento.
        </p>
      </div>

      <div className="mt-14 border border-line rounded-[20px] overflow-hidden shadow-table">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[15px] min-w-[760px]">
            <thead>
              <tr>
                <th className="text-left p-6 md:px-6 md:py-7 align-bottom w-[26%] bg-surface-sunken" />
                {plans.map((p) => (
                  <th
                    key={p.name}
                    className={`text-left p-6 md:px-6 md:py-7 align-bottom ${
                      p.popular
                        ? "bg-surface-tint border-b-[3px] border-brand-600"
                        : ""
                    }`}
                  >
                    <div className="font-display font-extrabold text-[22px] text-brand-900">
                      {p.name}
                    </div>
                    <div className="text-sm text-ink-soft font-medium mt-[6px]">
                      {p.tag}
                    </div>
                    <div className="mt-3">
                      {p.pricePrefix && (
                        <span className="block text-xs text-ink-soft font-medium">
                          {p.pricePrefix}
                        </span>
                      )}
                      <span className="font-display font-extrabold text-[28px] text-brand-900 leading-none">
                        {p.priceMonthly}
                      </span>
                      <span className="text-sm text-ink-soft font-semibold">
                        /mês
                      </span>
                      <span className="block text-[13px] text-ink-soft mt-1">
                        {p.priceSetup}
                      </span>
                    </div>
                    {p.popular && (
                      <span className="inline-block mt-3 px-3 py-1 rounded-full bg-brand-50 text-brand-700 font-bold text-xs tracking-[.04em]">
                        MAIS ESCOLHIDO
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planRows.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <td className="px-6 py-[18px] font-bold text-ink bg-surface-sunken">
                    {row.label}
                  </td>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={`px-6 py-[18px] text-ink-subtle ${
                        plans[i].popular ? "bg-surface-tint" : ""
                      }`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-line">
                <td className="p-6 bg-surface-sunken" />
                {plans.map((p) => (
                  <td
                    key={p.name}
                    className={`p-6 ${p.popular ? "bg-surface-tint" : ""}`}
                  >
                    <Link
                      href="/#contato"
                      className={`inline-block w-full text-center px-4 py-3 rounded-[9px] font-bold text-[15px] transition-colors duration-200 ${
                        p.popular
                          ? "text-white bg-brand-600 hover:bg-brand-700"
                          : "text-brand-600 bg-white border border-[#B6E3F6] hover:bg-brand-50"
                      }`}
                    >
                      Falar com especialista
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-base text-ink-soft mt-7">
        A mensalidade já inclui hospedagem, manutenção e suporte — sem
        surpresas no fim do mês. Precisa de algo mais personalizado?{" "}
        <Link
          href="/#contato"
          className="font-bold text-brand-600 hover:text-brand-700"
        >
          Crie uma solução sob medida →
        </Link>
      </p>
    </section>
  );
};

export default AllPlans;
