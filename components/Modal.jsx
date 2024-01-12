import React from 'react';
import Image from "next/image";

const Modal = ({ img, onClose, onPrev, onNext }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg relative border-2 border-black">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold">
          {/* Ícone de fechar */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Image src={img} alt="Imagem em destaque" width={450} height={600} />
        <div className="flex justify-around mt-4">
          {onPrev && (
            <button onClick={onPrev}>
              {/* Ícone de navegação esquerda */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {onNext && (
            <button onClick={onNext}>
              {/* Ícone de navegação direita */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
