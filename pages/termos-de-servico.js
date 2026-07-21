import React from 'react';
import Link from 'next/link';

const TermosDeServico = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#39B6EB] mb-6">Termos de Serviço</h1>
      <p className="mb-4">
        Estes Termos de Serviço regem o uso do site e dos serviços prestados pela{' '}
        <strong>Web Makers</strong>, agência de desenvolvimento web sediada em Mogi Guaçu-SP. Ao acessar o site
        ou contratar nossos serviços, você concorda com os termos abaixo.
      </p>

      <h2 className="text-xl font-semibold mb-4">Serviços</h2>
      <p className="mb-4">
        A Web Makers oferece criação de sites, integrações e automações para micro e pequenas empresas, além da
        gestão de mídia paga (Google Ads e Meta) para contas que possuímos ou administramos em nome de nossos
        clientes, mediante autorização.
      </p>

      <h2 className="text-xl font-semibold mb-4">Responsabilidades do Cliente</h2>
      <p className="mb-4">
        O cliente é responsável por fornecer informações corretas e por manter as autorizações necessárias para
        que a Web Makers opere contas e ferramentas de terceiros (como contas de anúncios) em seu nome.
      </p>

      <h2 className="text-xl font-semibold mb-4">Uso de APIs do Google</h2>
      <p className="mb-4">
        Quando utilizamos APIs do Google, incluindo a Google Ads API, o fazemos exclusivamente para gerenciar
        campanhas em contas autorizadas pelo respectivo titular. O tratamento desses dados segue a nossa{' '}
        <Link href="/politica-de-privacidade" className="text-[#39B6EB]">
          Política de Privacidade
        </Link>{' '}
        e a Política de Dados do Usuário dos Serviços de API do Google, incluindo os requisitos de Uso Limitado.
      </p>

      <h2 className="text-xl font-semibold mb-4">Limitação de Responsabilidade</h2>
      <p className="mb-4">
        A Web Makers empenha-se em prestar seus serviços com qualidade, mas não garante resultados específicos
        de campanhas publicitárias, que dependem de fatores externos às plataformas e ao mercado.
      </p>

      <h2 className="text-xl font-semibold mb-4">Alterações</h2>
      <p className="mb-4">
        Podemos atualizar estes Termos periodicamente. O uso contínuo do site e dos serviços após alterações
        implica concordância com a versão vigente.
      </p>

      <h2 className="text-xl font-semibold mb-4">Contato</h2>
      <p>
        Dúvidas sobre estes Termos podem ser enviadas para
        <a href="mailto:webmakersbr@gmail.com" className="text-[#39B6EB]"> webmakersbr@gmail.com</a>.
      </p>
    </div>
  );
};

export default TermosDeServico;
