const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis de ambiente

const app = express();
app.use(cors());
app.use(express.json());

// Token e URL do Jira usando variáveis de ambiente
const JIRA_TOKEN = process.env.JIRA_TOKEN;
const JIRA_URL = process.env.JIRA_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;

console.log('JIRA_URL:', JIRA_URL); // Verifica se a URL está sendo lida corretamente

app.post('/send-to-jira', async (req, res) => {
  try {
    const { name, email, phone, interest } = req.body;
    
    console.log('Recebendo dados do frontend:', { name, email, phone, interest });

    const issueData = {
        fields: {
          project: {
            key: 'VEN', // Substitua pela chave correta do projeto no Jira
          },
          summary: `Novo contato de ${name}`,
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: `Nome: ${name}`
                  },
                ]
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: `Email: ${email}`
                  },
                ]
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: `Telefone: ${phone}`
                  },
                ]
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: `Interesse: ${interest}`
                  },
                ]
              }
            ]
          },
          issuetype: {
            name: 'Lead', // Verifique se o tipo de issue 'Lead' existe no Jira. Se não, substitua por 'Task' ou outro tipo.
          },
        },
      };
      
    console.log('Enviando dados para o Jira:', issueData);

    const response = await axios.post(JIRA_URL, issueData, {
        headers: {
            Authorization: `Basic ${Buffer.from(JIRA_EMAIL + ':' + JIRA_TOKEN).toString('base64')}`,
            'Content-Type': 'application/json',
          }          
    });

    console.log('Resposta do Jira:', response.data);
    res.status(200).send('Dados enviados para o Jira com sucesso..');
  } catch (error) {
    console.error('Erro ao enviar dados para o Jira:', error.response ? error.response.data : error.message);
    res.status(500).send('Erro ao enviar dados para o Jira.');
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
