import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const PromoBanner = () => {
  useEffect(() => {
    toast.info(
      "🚀 Aproveite 20% de Desconto no Seu Novo Site! 🚀",
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  }, []);

  return (
    <div>
      {/* Conteúdo da página */}
    </div>
  );
};

export default PromoBanner;
