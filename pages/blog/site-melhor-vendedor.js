import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';  // Importando o Link

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

const SiteMelhorVendedor = () => {
  const postUrl = 'https://webmakers.dev.br/blog/site-melhor-vendedor';
  const postTitle = 'Por que o site é seu melhor vendedor';
  const postImage = '/assets/blog/img-2.jpg';

  const post = {
    title: 'Por que o site é seu melhor vendedor',
    image: postImage,
    content: `
      <p>Seu site pode ser o melhor vendedor da sua empresa, disponível 24 horas por dia, 7 dias por semana, sem precisar de descanso.</p>
      <p><strong>1. Disponibilidade Ininterrupta:</strong> Ao contrário de um vendedor humano, o seu site nunca para de trabalhar. Ele pode atrair e converter clientes a qualquer momento, sem pausa.</p>
      <p><strong>2. Alcance Global:</strong> Um vendedor tradicional pode atender um cliente por vez, e somente dentro de um determinado horário. Já o seu site pode atender milhões de pessoas ao mesmo tempo, em qualquer lugar do mundo.</p>
      <p><strong>3. Venda Sob Medida:</strong> Um site bem projetado permite personalizar a experiência de compra para cada cliente, mostrando produtos e serviços com base em suas preferências e histórico de navegação.</p>
      <p><strong>4. Informações Rápidas e Claras:</strong> Seu site pode fornecer todas as informações que o cliente precisa para tomar uma decisão de compra.</p>
      <p><strong>5. Facilidade de Contato:</strong> Com formulários, chatbots e integrações com WhatsApp, seu site garante que o cliente sempre tenha um canal de comunicação direto para tirar dúvidas e fechar negócios.</p>
      <p><strong>Conclusão:</strong> Aproveite o potencial do seu site e transforme-o no vendedor mais eficiente da sua empresa.</p>
    `,
  };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="container mx-auto p-5" style={{ marginTop: '100px' }}>
      <Head>
        <title>{postTitle}</title>
        <meta name="description" content="Seu site pode ser o melhor vendedor da sua empresa, disponível 24/7." />
        <meta property="og:title" content={postTitle} />
        <meta property="og:description" content="Seu site pode ser o melhor vendedor da sua empresa, disponível 24/7." />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={postImage} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#39B6EB] mb-5">{post.title}</h1>

        <div className="w-full md:w-[60%] mx-auto">
          <Image src={post.image} width={800} height={450} alt={post.title} className="rounded-lg" />
        </div>

        <div className="mt-8 text-lg leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="text-center mb-10 p-6">
          <h2 className="text-xl font-bold mb-4">Compartilhe este post</h2>
          <div className="flex justify-center space-x-3">
            <FacebookShareButton url={postUrl} quote={postTitle}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={postUrl} title={postTitle}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <LinkedinShareButton url={postUrl} title={postTitle}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={postUrl} title={postTitle}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4 text-[#39B6EB]">Comentários</h3>
          {comments.length === 0 ? (
            <p className="text-gray-500">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
          ) : (
            <ul className="list-disc ml-5">
              {comments.map((comment, index) => (
                <li key={index} className="mb-2">{comment}</li>
              ))}
            </ul>
          )}

          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              className="w-full p-3 border rounded-lg"
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Deixe seu comentário"
            />
            <button
              type="submit"
              className="mt-2 bg-[#39B6EB] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Link para o próximo post */}
        <div className="mt-10 text-right">
          <Link href="/blog/beneficios-site-integrado">
            <span className="text-[#39B6EB] font-bold hover:underline">
              Próximo Post: Benefícios de um Site Integrado →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SiteMelhorVendedor;
