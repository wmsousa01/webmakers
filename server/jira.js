const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis de ambiente

const app = express();
app.use(cors());
app.use(express.json());

// Token e URL do Jira usando variáveis de ambiente
const JIRA_TOKEN = process.env.JIRA_TOKEN;
const JIRA_URL = process.env.JIRA_URL; // endpoint de criação de issue (…/rest/api/3/issue)
const JIRA_EMAIL = process.env.JIRA_EMAIL;

console.log('JIRA_URL:', JIRA_URL); // Verifica se a URL está sendo lida corretamente

// ── Triagem: mapeia as respostas do chat para prioridade + labels do Jira ─────

// urgência → prioridade da issue
const PRIORITY_BY_URGENCY = {
  'Pra ontem 🔥': 'High',
  'Ainda este mês': 'Medium',
  'Só pesquisando': 'Low',
};

// Vira label do Jira (sem espaços/acentos). Ex: "Site institucional" → "site-institucional"
const slug = (s) =>
  String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const priorityLabel = (urgency) => {
  const p = PRIORITY_BY_URGENCY[urgency];
  if (p === 'High') return 'urgencia-alta';
  if (p === 'Low') return 'urgencia-baixa';
  return 'urgencia-media';
};

// Monta os labels de triagem (ignora campos vazios)
const buildLabels = ({ service, urgency, budget, segment }) =>
  [
    'lead-site',
    service && `servico-${slug(service)}`,
    urgency && priorityLabel(urgency),
    budget && `orcamento-${slug(budget)}`,
    segment && `segmento-${slug(segment)}`,
  ].filter(Boolean);

// Bloco de parágrafo no formato ADF (Atlassian Document Format)
const p = (label, value) => ({
  type: 'paragraph',
  content: [{ type: 'text', text: `${label}: ${value || '—'}` }],
});

app.post('/send-to-jira', async (req, res) => {
  try {
    const { name, email, phone, service, urgency, budget, segment, interest, detail } =
      req.body;
    // `detail` é o campo novo; `interest` mantém compatibilidade com o payload antigo
    const description = detail || interest || '';

    console.log('Recebendo lead do frontend:', {
      name,
      email,
      phone,
      service,
      urgency,
      budget,
      segment,
    });

    const priority = PRIORITY_BY_URGENCY[urgency] || 'Medium';
    const labels = buildLabels({ service, urgency, budget, segment });
    const summary = service ? `[${service}] Lead: ${name}` : `Novo contato de ${name}`;

    const baseFields = {
      project: { key: process.env.JIRA_LEAD_PROJECT || 'VEN' },
      summary,
      description: {
        type: 'doc',
        version: 1,
        content: [
          p('Nome', name),
          p('Email', email),
          p('Telefone/WhatsApp', phone),
          p('Tipo de serviço', service),
          p('Urgência', urgency),
          p('Orçamento', budget),
          p('Segmento', segment),
          p('Detalhe', description),
        ],
      },
      issuetype: { name: process.env.JIRA_LEAD_ISSUETYPE || 'Tarefa' },
      labels,
    };

    const auth = {
      Authorization: `Basic ${Buffer.from(JIRA_EMAIL + ':' + JIRA_TOKEN).toString('base64')}`,
      'Content-Type': 'application/json',
    };

    // Tenta com prioridade; se a tela do VEN não tiver o campo priority, refaz sem ela
    // (o label de urgência preserva a triagem) — assim o lead nunca se perde.
    const attempt = (fields) => axios.post(JIRA_URL, { fields }, { headers: auth });

    let response;
    try {
      response = await attempt({ ...baseFields, priority: { name: priority } });
    } catch (err) {
      const data = err.response && err.response.data;
      const priorityError =
        data &&
        JSON.stringify(data).toLowerCase().includes('priority');
      if (priorityError) {
        console.warn('Campo priority indisponível no VEN — recriando sem prioridade.');
        response = await attempt(baseFields);
      } else {
        throw err;
      }
    }

    console.log('Lead criado no Jira:', response.data.key || response.data);
    res.status(200).json({ ok: true, key: response.data.key });
  } catch (error) {
    console.error(
      'Erro ao enviar dados para o Jira:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ ok: false, error: 'Erro ao enviar dados para o Jira.' });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
