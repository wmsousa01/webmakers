import Image from 'next/image';
import { useEffect, useState } from 'react';

const BeneficiosSiteIntegrado = () => {
  const post = {
    title: "Benefícios de um Site Integrado",
    image: "/assets/blog/img-1.jpg",
    content: `
      <p>Em um mundo cada vez mais digital, contar com um site que integre todas as operações da sua empresa é uma vantagem competitiva inegável.</p>
      
      <p><strong>1. Automação de Processos:</strong> Um site integrado pode automatizar diversas tarefas manuais, como o cadastro de clientes, processamento de pedidos e até mesmo o envio de atualizações.</p>
      
      <p><strong>2. Melhor Experiência do Usuário:</strong> Com todos os sistemas conectados, o cliente tem uma experiência mais fluida e intuitiva, sem precisar preencher os mesmos dados várias vezes.</p>
      
      <p><strong>3. Aumento da Produtividade:</strong> A integração entre diferentes sistemas permite que sua equipe foque em atividades mais estratégicas, uma vez que as tarefas operacionais são realizadas automaticamente.</p>
      
      <p><strong>4. Tomada de Decisão com Dados Unificados:</strong> Ter todos os dados centralizados em um único sistema facilita a análise e a tomada de decisões, além de permitir insights mais rápidos e precisos sobre o desempenho do seu negócio.</p>
      
      <p><strong>5. Economia de Tempo e Recursos:</strong> A automação e a eliminação de tarefas redundantes proporcionam uma economia significativa de tempo e custos para a sua empresa.</p>
      
      <p><strong>Conclusão:</strong> Investir em um site integrado pode parecer um grande passo, mas os benefícios são inúmeros. Além de facilitar a operação da sua empresa, a integração melhora a experiência dos seus clientes, o que reflete diretamente em vendas e fidelização.</p>
    `,
  };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [editingComment, setEditingComment] = useState(null); // Para controlar a edição

  useEffect(() => {
    window.scrollTo(0, 0); // Para garantir que a página comece no topo
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && commenterName.trim()) {
      if (editingComment !== null) {
        // Editando um comentário existente
        const updatedComments = comments.map((comment, index) =>
          index === editingComment ? { ...comment, text: newComment } : comment
        );
        setComments(updatedComments);
        setEditingComment(null);
      } else {
        // Adicionando um novo comentário
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#39B6EB] mb-5">{post.title}</h1>
        
        {/* Imagem ajustada para telas grandes */}
        <div className="w-full md:w-[60%] mx-auto">
          <Image src={post.image} width={800} height={450} alt={post.title} className="rounded-lg" />
        </div>

        {/* Conteúdo do post */}
        <div
          className="mt-8 text-lg leading-relaxed text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Área de comentários */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4 text-[#39B6EB]">Comentários</h3>

          {/* Exibindo comentários */}
          {comments.length === 0 ? (
            <p className="text-gray-500">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
          ) : (
            <ul className="list-disc ml-5">
              {comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  <p><strong>{comment.name}:</strong> {comment.text}</p>
                  <button
                    onClick={() => handleEditComment(index)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteComment(index)}
                    className="text-sm text-red-500 hover:underline ml-3"
                  >
                    Apagar
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Formulário de comentários */}
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
      </div>
    </div>
  );
};

export default BeneficiosSiteIntegrado;
