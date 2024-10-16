// pages/blog/index.js
import Link from "next/link";
import Image from "next/image";

const BlogIndex = () => {
  const posts = [
    {
      title: "Benefícios de um Site Integrado",
      image: "/assets/blog/img-1.jpg",
      excerpt: "Descubra como um site integrado pode aumentar sua produtividade e melhorar a experiência do usuário.",
      slug: "beneficios-site-integrado",
    },
    {
      title: "Por que o site é seu melhor vendedor",
      image: "/assets/blog/img-2.jpg",
      excerpt: "Veja como um site bem estruturado pode se tornar seu maior ativo de vendas.",
      slug: "site-melhor-vendedor",
    },
  ];

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold text-center mb-10">Nosso Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {posts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`} legacyBehavior>
            <a className="block shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-64">
                <Image src={post.image} layout="fill" objectFit="cover" alt={post.title} className="rounded-t-lg" />
              </div>
              <div className="p-5 bg-white rounded-b-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogIndex;
