/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://webmakers.dev.br', // Substitua pelo seu domínio
    generateRobotsTxt: true, // Gera um arquivo robots.txt automaticamente
    changefreq: 'weekly', // Frequência de atualização
    priority: 0.7, // Prioridade para SEO
    sitemapSize: 5000, // Número máximo de URLs por arquivo de sitemap
    // Propostas comerciais são documentos de cliente: públicas (o cliente abre o
    // link sem senha) mas fora do sitemap e do índice de busca. Cada página leva
    // noindex no <head> também — isto aqui é a segunda camada.
    exclude: ['/proposta', '/proposta/*'],
    robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/', disallow: ['/proposta'] }],
    },
  };
  