// Criação de lead no Jira (projeto VEN, issuetype Lead) a partir do chat de triagem.
// Roda server-side na Vercel usando as credenciais do .env (mesma instância do /painel).
// Substitui o backend Express do Railway — o chat agora posta para /api/send-to-jira.

// Base do Atlassian (só a origem, https://xxx.atlassian.net). Normaliza para o host
// mesmo se JIRA_BASE_URL/JIRA_URL vier com o caminho completo (…/rest/api/3/issue),
// senão a concatenação duplicaria o path e daria 404.
function jiraBase() {
  const raw = process.env.JIRA_BASE_URL || process.env.JIRA_URL || "";
  const m = raw.match(/^(https?:\/\/[^/]+)/);
  return m ? m[1] : "";
}

// urgência → prioridade da issue
const PRIORITY_BY_URGENCY = {
  "Pra ontem 🔥": "High",
  "Ainda este mês": "Medium",
  "Só pesquisando": "Low",
};

// Vira label do Jira (sem espaços/acentos). Ex: "Site institucional" → "site-institucional"
const slug = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const priorityLabel = (urgency) => {
  const p = PRIORITY_BY_URGENCY[urgency];
  if (p === "High") return "urgencia-alta";
  if (p === "Low") return "urgencia-baixa";
  return "urgencia-media";
};

const buildLabels = ({ service, urgency, budget, segment }) =>
  [
    "lead-site",
    service && `servico-${slug(service)}`,
    urgency && priorityLabel(urgency),
    budget && `orcamento-${slug(budget)}`,
    segment && `segmento-${slug(segment)}`,
  ].filter(Boolean);

// Parágrafo ADF. Mantém rótulos que o parser do /painel entende (Nome/Email/Telefone).
const para = (label, value) => ({
  type: "paragraph",
  content: [{ type: "text", text: `${label}: ${value || "—"}` }],
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método não permitido." });
  }

  const base = jiraBase();
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_TOKEN;
  if (!base || !email || !token) {
    console.error("Jira env ausente (JIRA_BASE_URL/JIRA_EMAIL/JIRA_TOKEN).");
    return res.status(500).json({ ok: false, error: "Configuração indisponível." });
  }

  const { name, email: leadEmail, phone, service, urgency, budget, segment, detail, interest } =
    req.body || {};

  // Validação mínima: sem contato não há lead (barra ruído/bot).
  if (!name || (!phone && !leadEmail)) {
    return res.status(400).json({ ok: false, error: "Contato incompleto." });
  }

  const description = detail || interest || "";
  const priority = PRIORITY_BY_URGENCY[urgency] || "Medium";
  const labels = buildLabels({ service, urgency, budget, segment });
  const summary = service ? `[${service}] Lead: ${name}` : `Novo contato de ${name}`;

  const baseFields = {
    project: { key: process.env.JIRA_LEAD_PROJECT || "LEAD" },
    summary,
    description: {
      type: "doc",
      version: 1,
      content: [
        para("Nome", name),
        para("Email", leadEmail),
        para("Telefone", phone),
        para("Tipo de serviço", service),
        para("Urgência", urgency),
        para("Orçamento", budget),
        para("Segmento", segment),
        para("Detalhe", description),
      ],
    },
    issuetype: { name: process.env.JIRA_LEAD_ISSUETYPE || "Tarefa" },
    labels,
  };

  const auth = Buffer.from(`${email}:${token}`).toString("base64");
  const post = (fields) =>
    fetch(`${base}/rest/api/3/issue`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ fields }),
    });

  // Resume a mensagem de erro do Jira (errorMessages/errors) sem vazar nada sensível.
  const jiraDetail = (txt) => {
    try {
      const j = JSON.parse(txt);
      const msgs = [...(j.errorMessages || []), ...Object.values(j.errors || {})];
      return msgs.join(" | ").slice(0, 300);
    } catch {
      return String(txt).slice(0, 300);
    }
  };

  try {
    // Tenta com prioridade; se o campo não estiver na tela do projeto, refaz sem ela
    // (o label de urgência preserva a triagem) — o lead nunca se perde por isso.
    let response = await post({ ...baseFields, priority: { name: priority } });
    if (!response.ok) {
      const errText = await response.text();
      if (errText.toLowerCase().includes("priority")) {
        console.warn("Campo priority indisponível — recriando sem prioridade.");
        response = await post(baseFields);
      } else {
        const detail = jiraDetail(errText);
        console.error("Jira respondeu erro:", response.status, errText);
        return res.status(502).json({ ok: false, error: "Falha ao criar o lead.", jiraStatus: response.status, detail });
      }
    }

    if (!response.ok) {
      const errText = await response.text();
      const detail = jiraDetail(errText);
      console.error("Jira respondeu erro (retry):", response.status, errText);
      return res.status(502).json({ ok: false, error: "Falha ao criar o lead.", jiraStatus: response.status, detail });
    }

    const data = await response.json();
    console.log("Lead criado no Jira:", data.key);
    return res.status(200).json({ ok: true, key: data.key });
  } catch (error) {
    console.error("Erro ao enviar lead ao Jira:", error?.message || error);
    return res.status(500).json({ ok: false, error: "Erro ao enviar dados." });
  }
}
