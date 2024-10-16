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
} from 'react-share';

const BeneficiosSiteIntegrado = () => {
  const postUrl = 'https://webmakers.dev.br/blog/beneficios-site-integrado';
  const postTitle = 'Benefícios de um Site Integrado';
  const postImage = '/assets/blog/img-1.jpg';
  
  const post = {
    title: 'Benefícios de um Site Integrado',
    image: postImage,
    content: `
      <p>Em um mundo cada vez mais digital, contar com um site que integre todas as operações da sua empresa é uma vantagem competitiva inegável.</p>
      <p><strong>1. Automação de Processos:</strong> Um site integrado pode automatizar diversas tarefas manuais, como o cadastro de clientes, processamento de pedidos e até mesmo o envio de atualizações.</p>
      <p><strong>2. Melhor Experiência do Usuário:</strong> Com todos os sistemas conectados, o cliente tem uma experiência mais fluida e intuitiva.</p>
      <p><strong>3. Aumento da Produtividade:</strong> A integração permite que sua equipe foque em atividades mais estratégicas.</p>
      <p><strong>4. Tomada de Decisão com Dados Unificados:</strong> Dados centralizados em um único sistema facilitam a análise.</p>
      <p><strong>5. Economia de Tempo e Recursos:</strong> A automação elimina tarefas redundantes e economiza tempo.</p>
      <p><strong>Conclusão:</strong> Investir em um site integrado melhora a experiência dos clientes e aumenta a produtividade.</p>
    `,
  };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && commenterName.trim()) {
      if (editingComment !== null) {
        const updatedComments = comments.map((comment, index) =>
          index === editingComment ? { ...comment, text: newComment } : comment
        );
        setComments(updatedComments);
        setEditingComment(null);
      } else {
        setComments([...comments, { name: commenterName, text: newComment }]);
      }
      setNewComment('');
      setCommenterName('');
    }
  };

  const handleEditComment = (index) => {
    setNewComment(comments[index].text);
    setEditingComment(index);
  };

  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-5" style={{ marginTop: '100px' }}>
      <Head>
        <title>{postTitle}</title>
        <meta name="description" content="Veja como um site integrado pode melhorar sua produtividade e experiência do usuário." />
        <meta property="og:title" content={postTitle} />
        <meta property="og:description" content="Veja como um site integrado pode melhorar sua produtividade e experiência do usuário." />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={postImage} />
        <meta property="og:type" content="article" />
        <meta property="linkedin:title" content={postTitle} />
        <meta property="linkedin:description" content="Veja como um site integrado pode melhorar sua produtividade e experiência do usuário." />
        <meta property="linkedin:image" content={postImage} />
        <meta property="linkedin:url" content={postUrl} />
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
                <li key={index} className="mb-2">
                  <p><strong>{commenterName}:</strong> {comment.text}</p>
                  <button onClick={() => handleEditComment(index)} className="text-sm text-blue-500 hover:underline">Editar</button>
                  <button onClick={() => handleDeleteComment(index)} className="text-sm text-red-500 hover:underline ml-3">Apagar</button>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleCommentSubmit} className="mt-4">
            <input
              type="text"
              className="w-full p-2 mb-2 border rounded-lg"
              value={commenterName}
              onChange={(e) => setCommenterName(e.target.value)}
              placeholder="Seu nome"
              required
            />
            <textarea
              className="w-full p-3 border rounded-lg"
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Deixe seu comentário"
              required
            />
            <button
              type="submit"
              className="mt-2 bg-[#39B6EB] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              {editingComment !== null ? 'Editar Comentário' : 'Enviar Comentário'}
            </button>
          </form>
        </div>

        {/* Link para o próximo post */}
        <div className="mt-10 text-right">
          <Link href="/blog/site-melhor-vendedor">
            <span className="text-[#39B6EB] font-bold hover:underline">
              Próximo Post: Por que o site é seu melhor vendedor →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BeneficiosSiteIntegrado;
