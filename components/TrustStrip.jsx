import React from "react";
import { logos } from "./data/siteData";

const TrustStrip = () => {
  return (
    <section className="border-t border-b border-line bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-[26px] flex items-center gap-8 flex-wrap justify-center">
        <span className="text-[13px] font-bold tracking-[.1em] uppercase text-ink-faint">
          Empresas que crescem com a gente
        </span>
        {logos.map((logo) => (
          <span
            key={logo}
            className="font-display font-extrabold text-lg text-[#B3BAC5] tracking-tight"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TrustStrip;
