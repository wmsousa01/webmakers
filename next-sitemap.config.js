/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://webmakers.dev.br', // Substitua pelo seu domínio
    generateRobotsTxt: true, // Gera um arquivo robots.txt automaticamente
    changefreq: 'weekly', // Frequência de atualização
    priority: 0.7, // Prioridade para SEO
    sitemapSize: 5000, // Número máximo de URLs por arquivo de sitemap
    // O /painel é superfície interna (Basic Auth no middleware). Fora do sitemap
    // e bloqueado no robots.txt — não faz sentido divulgar a URL de admin.
    exclude: ['/painel', '/painel/*'],
    robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/', disallow: ['/painel'] }],
    },
  };
  