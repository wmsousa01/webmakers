import React from "react";
import { bullets, bandStats } from "./data/siteData";

const FeatureBand = () => {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white mt-[72px]">
      <div
        className="absolute -right-20 -top-20 w-[360px] h-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(57,182,235,.5), transparent 70%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="section-title text-white mb-5" style={{ textWrap: "balance" }}>
            Um parceiro, do site à automação
          </h2>
          <p className="text-lg text-[#B3C1DB] mb-7">
            Você não precisa contratar cinco fornecedores diferentes. A Web
            Makers conecta site, sistemas e processos em uma solução só.
          </p>
          <div className="grid gap-4">
            {bullets.map((b) => (
              <div key={b} className="flex gap-3 items-start">
                <span className="flex-none w-6 h-6 rounded-full bg-brand-600 inline-flex items-center justify-center text-white text-[13px] font-extrabold">
                  ✓
                </span>
                <span className="text-base text-[#E4EAF5] leading-normal">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bandStats.map((st) => (
            <div
              key={st.k}
              className="bg-white/[.06] border border-white/[.12] rounded-2xl p-6"
            >
              <div className="font-display font-extrabold text-[34px] text-white leading-none">
                {st.k}
              </div>
              <div className="text-sm text-[#9FB0CE] mt-2 leading-snug">
                {st.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBand;
