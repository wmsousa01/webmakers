import React from 'react';

const PoliticaDePrivacidade = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#39B6EB] mb-6">Política de Privacidade</h1>
      <p className="mb-4">
        Na <strong>Web Makers</strong>, a privacidade dos nossos visitantes é extremamente importante para nós. Esta
        política de privacidade descreve os tipos de informações pessoais que coletamos e como utilizamos essas
        informações.
      </p>
      <h2 className="text-xl font-semibold mb-4">Informações que Coletamos</h2>
      <p className="mb-4">
        Coletamos informações pessoais como nome, e-mail e telefone quando você preenche nossos formulários de
        contato, solicitações de orçamento ou de informações sobre nossos produtos e serviços.
      </p>
      <h2 className="text-xl font-semibold mb-4">Como Utilizamos as Informações</h2>
      <p className="mb-4">
        As informações fornecidas são utilizadas para responder às suas solicitações, enviar informações relevantes e
        melhorar os serviços da Web Makers. Não compartilhamos suas informações com terceiros sem seu consentimento.
      </p>
      <h2 className="text-xl font-semibold mb-4">Uso de APIs do Google</h2>
      <p className="mb-4">
        A Web Makers utiliza APIs do Google — incluindo a Google Ads API — para gerenciar campanhas
        publicitárias em contas de anúncios que possuímos ou administramos, sempre mediante autorização do
        titular da conta via OAuth. Os dados acessados por essas APIs são usados exclusivamente para operar,
        otimizar e gerar relatórios dessas campanhas em nossas ferramentas internas.
      </p>
      <p className="mb-4">
        O uso e a transferência, pela Web Makers, de informações recebidas das APIs do Google seguem a{' '}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          className="text-[#39B6EB]"
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de Dados do Usuário dos Serviços de API do Google
        </a>
        , incluindo os requisitos de Uso Limitado (Limited Use). Não vendemos esses dados, não os
        compartilhamos com terceiros e não os utilizamos para fins diversos da prestação do serviço de gestão
        de campanhas ao titular da conta.
      </p>
      <h2 className="text-xl font-semibold mb-4">Segurança das Informações</h2>
      <p className="mb-4">
        Garantimos que as informações pessoais coletadas sejam armazenadas de forma segura. Implementamos medidas
        para proteger suas informações contra acesso não autorizado.
      </p>
      <h2 className="text-xl font-semibold mb-4">Consentimento</h2>
      <p className="mb-4">
        Ao utilizar nosso site, você concorda com os termos desta política de privacidade.
      </p>
      <h2 className="text-xl font-semibold mb-4">Contato</h2>
      <p>
        Se você tiver alguma dúvida sobre esta política de privacidade, entre em contato conosco pelo e-mail
        <a href="mailto:webmakersbr@gmail.com" className="text-[#39B6EB]"> webmakersbr@gmail.com</a>.
      </p>
    </div>
  );
};

export default PoliticaDePrivacidade;
