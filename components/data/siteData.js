import {
  AiOutlineDesktop,
  AiOutlineDeploymentUnit,
  AiOutlineShoppingCart,
  AiOutlineRobot,
} from "react-icons/ai";

export const solutions = [
  {
    icon: AiOutlineDesktop,
    title: "Presença online de impacto",
    short: "Sites institucionais modernos e responsivos.",
    long: "Crie um site institucional moderno e responsivo que reflita a identidade da sua empresa e atraia novos clientes.",
    color: "#39B6EB",
    tint: "#E4F5FC",
  },
  {
    icon: AiOutlineDeploymentUnit,
    title: "Conectividade eficiente",
    short: "Integre seus sistemas web.",
    long: "Integre seus sistemas web para aumentar a eficiência operacional, reduzir erros e melhorar a tomada de decisões.",
    color: "#00A3BF",
    tint: "#E3F6F9",
  },
  {
    icon: AiOutlineRobot,
    title: "Produtividade automatizada",
    short: "Automatize processos repetitivos.",
    long: "Implemente soluções de automação que otimizam processos repetitivos, liberando tempo para atividades estratégicas.",
    color: "#6554C0",
    tint: "#EEECFB",
  },
  {
    icon: AiOutlineShoppingCart,
    title: "Comércio eletrônico simplificado",
    short: "Lojas virtuais fáceis de gerenciar.",
    long: "Crie uma loja virtual eficiente e fácil de gerenciar, conectando seu produto a clientes em todo o país.",
    color: "#36B37E",
    tint: "#E3F7EF",
  },
];

// Preços definidos a partir do benchmark regional (jul/2026):
// sites institucionais R$ 1.500-5.000, e-commerce R$ 4.000-12.000,
// manutenção R$ 100-600/mês, automação/integração R$ 700-1.500/mês.
export const plans = [
  {
    name: "Web Start",
    tag: "Presença digital para começar",
    pricePrefix: "",
    priceMonthly: "R$ 149",
    priceSetup: "Implantação única de R$ 1.997",
    popular: false,
  },
  {
    name: "Web Boost",
    tag: "Para vender e atender mais",
    pricePrefix: "",
    priceMonthly: "R$ 349",
    priceSetup: "Implantação única de R$ 4.497",
    popular: true,
  },
  {
    name: "Web Mastery",
    tag: "Integração e automação sob medida",
    pricePrefix: "a partir de",
    priceMonthly: "R$ 997",
    priceSetup: "Projeto sob escopo",
    popular: false,
  },
];

export const planRows = [
  { label: "Site profissional", values: ["Até 5 páginas", "Até 10 páginas ou loja virtual", "Completo e personalizado"] },
  { label: "Google Perfil de Empresa", values: ["Configuração completa", "Configuração + SEO local", "SEO local contínuo"] },
  { label: "Hospedagem e manutenção", values: ["Inclusas", "Inclusas + relatório mensal", "Sustentação dedicada"] },
  { label: "Automação de WhatsApp", values: ["—", "Atendimento automático", "IA integrada aos seus sistemas"] },
  { label: "Integração de sistemas", values: ["—", "Básica", "Integração total"] },
  { label: "Automação de processos", values: ["—", "Processos simples", "Automação avançada"] },
  { label: "Suporte técnico", values: ["E-mail e WhatsApp", "Prioritário", "Premium + consultoria contínua"] },
];

export const heroStats = [
  { k: "48h", v: "para colocar seu site no ar" },
  { k: "+18h", v: "economizadas por semana" },
  { k: "100%", v: "responsivo em qualquer tela" },
];

export const logos = ["Aurora", "Meridian", "Nordeste Co.", "Vértice", "Campo Belo"];

export const bullets = [
  "Site institucional que representa sua marca com profissionalismo.",
  "Sistemas integrados, sem retrabalho nem planilhas soltas.",
  "Processos repetitivos no automático, liberando sua equipe.",
  "Loja virtual conectando seu produto a clientes de todo o país.",
];

export const bandStats = [
  { k: "5–10+", v: "páginas por projeto conforme o plano" },
  { k: "1 dia", v: "útil para retornar sua proposta" },
  { k: "4 áreas", v: "site, integração, automação e e-commerce" },
  { k: "PMEs", v: "foco total em pequenas e médias empresas" },
];

export const contactPoints = [
  { t: "Resposta rápida", d: "Proposta em até 1 dia útil." },
  { t: "Sem compromisso", d: "Converse antes de decidir." },
  { t: "Atendimento humano", d: "Fale direto com quem executa." },
];

export const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5519989331908&text=Ol%C3%A1%2C%20vim%20do%20site%20e%20gostaria%20de%20falar%20com%20um%20especialista.";
