/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundOpacity: ['active'],
      colors: {
        // Paleta primária (design Web Makers.dc)
        brand: {
          50: "#E4F5FC",
          100: "#D6EFF9",
          200: "#C7D7FE",
          300: "#9BBAFB",
          400: "#6D9BFA",
          500: "#38BDF8",
          600: "#39B6EB",
          700: "#1E9AD1",
          800: "#0B3448",
          900: "#0B3448",
        },
        // Neutros para texto
        ink: {
          DEFAULT: "#172B4D", // texto forte
          subtle: "#42526E",  // texto secundário
          soft: "#5E6C84",    // texto terciário
          faint: "#7A869A",   // captions / eyebrows neutros
        },
        surface: {
          DEFAULT: "#FFFFFF",
          tint: "#EFF9FD",    // azul-claro de fundo (hero, contato)
          sunken: "#F7F9FC",  // coluna de labels da tabela
          raised: "#F4F5F7",  // hover de itens de menu
        },
        line: "#EBECF0", // bordas
      },
      boxShadow: {
        card: "0 24px 48px -28px rgba(9, 30, 66, 0.3)",
        "card-hover": "0 24px 48px -28px rgba(9, 30, 66, 0.3)",
        overlay: "0 24px 48px -24px rgba(9, 30, 66, 0.28)",
        cta: "0 10px 24px -12px rgba(57, 182, 235, 0.7)",
        panel: "0 40px 80px -40px rgba(57, 182, 235, 0.55)",
        float: "0 20px 40px -20px rgba(9, 30, 66, 0.5)",
        table: "0 24px 60px -40px rgba(9, 30, 66, 0.4)",
        form: "0 30px 60px -40px rgba(9, 30, 66, 0.35)",
      },
      keyframes: {
        wmfloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        wmdrift: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(0, -18px) rotate(6deg)" },
        },
        // Entrada das bolhas do chat
        wmpop: {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        // Painel do chat subindo
        wmslideup: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Pontinhos do "digitando"
        wmdot: {
          "0%, 60%, 100%": { opacity: "0.25", transform: "translateY(0)" },
          "30%": { opacity: "1", transform: "translateY(-3px)" },
        },
      },
      animation: {
        wmfloat: "wmfloat 6s ease-in-out infinite",
        wmdrift: "wmdrift 9s ease-in-out infinite",
        wmpop: "wmpop 260ms cubic-bezier(0.22, 1, 0.36, 1) both",
        wmslideup: "wmslideup 220ms cubic-bezier(0.22, 1, 0.36, 1) both",
        wmdot: "wmdot 1.2s ease-in-out infinite",
      },
    },
    fontFamily: {
      sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      display: ['var(--font-display)', 'system-ui', 'sans-serif'],
    },

    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}
